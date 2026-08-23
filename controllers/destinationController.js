const Destination = require('../models/Destination');
const { getFileUrl, getFileName } = require('../config/cloudinary');
const Review = require('../models/Review');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { geocodeDestination } = require('../utils/geocoder');

// 1. Landing Page (Root `/`)
module.exports.landingPage = catchAsync(async (req, res) => {
  // Compute live statistics for counters
  const totalDestinations = await Destination.countDocuments();
  const totalReviews = await Review.countDocuments();
  const totalUsers = await User.countDocuments();

  // Aggregate total review images shared
  const reviewImagesAgg = await Review.aggregate([
    { $project: { imageCount: { $size: { $ifNull: ['$images', []] } } } },
    { $group: { _id: null, total: { $sum: '$imageCount' } } }
  ]);

  const totalPhotos = (reviewImagesAgg[0]?.total || 0) + totalDestinations;

  res.render('destinations/index', {
    title: 'TravelAtlas - Community Driven Travel Knowledge Platform',
    stats: {
      destinations: totalDestinations || 24,
      reviews: totalReviews || 86,
      travelers: totalUsers || 150,
      photos: totalPhotos || 310
    }
  });
});

// 2. Explore Destinations List (`/destinations`)
module.exports.index = catchAsync(async (req, res) => {
  const { search, category } = req.query;
  let query = {};

  if (category && category !== 'All') {
    query.category = category;
  }

  if (search && search.trim() !== '') {
    const searchRegex = new RegExp(search.trim(), 'i');
    query.$or = [
      { title: searchRegex },
      { state: searchRegex },
      { country: searchRegex },
      { category: searchRegex }
    ];
  }

  let destinations = await Destination.find(query).sort({ createdAt: -1 });
  let nearbyDestinations = [];

  // Fallback: If no exact search results found, fetch top-rated or recent nearby destinations as suggestions
  if (destinations.length === 0 && (search || (category && category !== 'All'))) {
    nearbyDestinations = await Destination.find({})
      .sort({ averageRating: -1, createdAt: -1 })
      .limit(6);
  }

  const mapDestinations = destinations.length > 0 ? destinations : nearbyDestinations;
  const allDestinationsMapData = mapDestinations.map((d) => ({
    id: d._id,
    title: d.title,
    state: d.state,
    country: d.country,
    category: d.category,
    averageRating: d.averageRating,
    coordinates: d.coordinates,
    coverUrl: d.coverImage?.url || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80'
  }));

  const categories = [
    'All',
    'Waterfalls',
    'Mountains',
    'Beaches',
    'Temples',
    'Historical Places',
    'Adventure',
    'Camping',
    'Museums',
    'Wildlife',
    'Lakes',
    'Road Trips'
  ];

  res.render('destinations/explore', {
    title: 'Explore Destinations - TravelAtlas',
    destinations,
    nearbyDestinations,
    mapData: JSON.stringify(allDestinationsMapData),
    categories,
    selectedCategory: category || 'All',
    searchQuery: search || ''
  });
});

// 3. Live Duplicate Check API Endpoint (`/api/destinations/check-duplicate`)
module.exports.checkDuplicate = catchAsync(async (req, res) => {
  const { title, state } = req.query;
  if (!title || title.trim() === '') {
    return res.json({ exists: false });
  }

  const titleRegex = new RegExp(`^${title.trim()}$`, 'i');
  let existing = await Destination.findOne({ title: titleRegex });

  if (!existing && state && state.trim() !== '') {
    existing = await Destination.findOne({
      title: new RegExp(title.trim(), 'i'),
      state: new RegExp(`^${state.trim()}$`, 'i')
    });
  }

  if (existing) {
    return res.json({
      exists: true,
      destination: {
        id: existing._id,
        title: existing.title,
        state: existing.state,
        country: existing.country
      }
    });
  }

  res.json({ exists: false });
});

// 4. Render New Destination Form
module.exports.renderNew = (req, res) => {
  const categories = [
    'Waterfalls',
    'Mountains',
    'Beaches',
    'Temples',
    'Historical Places',
    'Adventure',
    'Camping',
    'Museums',
    'Wildlife',
    'Lakes',
    'Road Trips'
  ];
  res.render('destinations/new', {
    title: 'Add New Destination - TravelAtlas',
    categories
  });
};

// 5. Create Destination with Duplicate Prevention & Geoapify
module.exports.createDestination = catchAsync(async (req, res) => {
  const { title, description, state, country, category } = req.body.destination;

  // Check duplicate by title or title+state
  const existing = await Destination.findOne({
    $or: [
      { title: new RegExp(`^${title.trim()}$`, 'i') },
      {
        title: new RegExp(title.trim(), 'i'),
        state: new RegExp(`^${state.trim()}$`, 'i')
      }
    ]
  });

  if (existing) {
    req.flash(
      'info',
      `"${existing.title}" in ${existing.state || existing.country} already exists! Redirected you to its single canonical page where you can add your review, tips, or photos.`
    );
    return res.redirect(`/destinations/${existing._id}`);
  }

  // Geocode title, state, country using Geoapify with smart fallback
  const coordinates = await geocodeDestination(title, state, country);

  let coverImage = {
    url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    filename: 'default-cover'
  };

  if (req.file) {
    coverImage = {
      url: getFileUrl(req.file),
      filename: getFileName(req.file)
    };
  }

  const destination = new Destination({
    title,
    description,
    state,
    country,
    category,
    coordinates,
    coverImage,
    createdBy: req.user._id,
    createdByName: req.user.username
  });

  await destination.save();
  req.flash('success', 'Successfully added a new destination!');
  res.redirect(`/destinations/${destination._id}`);
});

// 5. Show Destination Page
module.exports.showDestination = catchAsync(async (req, res) => {
  const { id } = req.params;
  const destination = await Destination.findById(id)
    .populate({
      path: 'reviews',
      populate: {
        path: 'author',
        select: 'username profileImage'
      }
    })
    .populate('createdBy', 'username profileImage');

  if (!destination) {
    req.flash('error', 'Destination not found!');
    return res.redirect('/destinations');
  }

  // Calculate Aggregated Travel Metrics from Reviews
  const reviews = destination.reviews || [];
  const metrics = {
    totalReviews: reviews.length,
    parking: { Available: 0, Limited: 0, Paid: 0, 'Not Available': 0 },
    food: { Available: 0, Nearby: 0, 'Pack Your Own': 0, None: 0 },
    crowd: { Low: 0, Moderate: 0, High: 0, Extreme: 0 },
    seasons: { Spring: 0, Summer: 0, Monsoon: 0, Autumn: 0, Winter: 0 },
    timeSpent: { '1-2 Hours': 0, 'Half Day': 0, 'Full Day': 0, 'Multi-Day': 0 },
    familyFriendlyYes: 0
  };

  reviews.forEach((r) => {
    if (metrics.parking[r.parking] !== undefined) metrics.parking[r.parking]++;
    if (metrics.food[r.foodAvailability] !== undefined) metrics.food[r.foodAvailability]++;
    if (metrics.crowd[r.crowdLevel] !== undefined) metrics.crowd[r.crowdLevel]++;
    if (metrics.seasons[r.visitedSeason] !== undefined) metrics.seasons[r.visitedSeason]++;
    if (metrics.timeSpent[r.timeSpent] !== undefined) metrics.timeSpent[r.timeSpent]++;
    if (r.familyFriendly === 'Yes') metrics.familyFriendlyYes++;
  });

  // Calculate top values for visual badge presentation
  const getTopKey = (obj) => {
    let top = 'Not enough data';
    let max = 0;
    for (const [key, count] of Object.entries(obj)) {
      if (count > max) {
        max = count;
        top = key;
      }
    }
    return top;
  };

  const aggregatedSummary = {
    topParking: getTopKey(metrics.parking),
    topFood: getTopKey(metrics.food),
    topCrowd: getTopKey(metrics.crowd),
    bestSeason: getTopKey(metrics.seasons),
    popularTimeSpent: getTopKey(metrics.timeSpent),
    familyFriendlyPct: reviews.length > 0 ? Math.round((metrics.familyFriendlyYes / reviews.length) * 100) : 0
  };

  res.render('destinations/show', {
    title: `${destination.title} (${destination.state}, ${destination.country}) - TravelAtlas`,
    destination,
    metrics,
    summary: aggregatedSummary
  });
});

// 6. Render Edit Destination Form
module.exports.renderEdit = catchAsync(async (req, res) => {
  const { id } = req.params;
  const destination = await Destination.findById(id);
  if (!destination) {
    req.flash('error', 'Destination not found!');
    return res.redirect('/destinations');
  }

  const categories = [
    'Waterfalls',
    'Mountains',
    'Beaches',
    'Temples',
    'Historical Places',
    'Adventure',
    'Camping',
    'Museums',
    'Wildlife',
    'Lakes',
    'Road Trips'
  ];

  res.render('destinations/edit', {
    title: `Edit ${destination.title} - TravelAtlas`,
    destination,
    categories
  });
});

// 7. Update Destination Logic
module.exports.updateDestination = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { title, description, state, country, category } = req.body.destination;

  const destination = await Destination.findById(id);
  if (!destination) {
    req.flash('error', 'Destination not found!');
    return res.redirect('/destinations');
  }

  // Update fields
  destination.title = title;
  destination.description = description;
  destination.state = state;
  destination.country = country;
  destination.category = category;

  // Re-geocode coordinates
  destination.coordinates = await geocodeDestination(title, state, country);

  if (req.file) {
    destination.coverImage = {
      url: getFileUrl(req.file),
      filename: getFileName(req.file)
    };
  }

  await destination.save();
  req.flash('success', 'Successfully updated destination details!');
  res.redirect(`/destinations/${destination._id}`);
});

// 8. Delete Destination
module.exports.deleteDestination = catchAsync(async (req, res) => {
  const { id } = req.params;
  await Destination.findByIdAndDelete(id);
  req.flash('success', 'Successfully deleted destination!');
  res.redirect('/destinations');
});

// 9. Privacy Policy Page
module.exports.privacyPolicy = (req, res) => {
  res.render('pages/privacy', { title: 'Privacy Policy - TravelAtlas' });
};

// 10. Terms & Conditions Page
module.exports.termsConditions = (req, res) => {
  res.render('pages/terms', { title: 'Terms & Conditions - TravelAtlas' });
};

// 11. Community Guidelines Page
module.exports.communityGuidelines = (req, res) => {
  res.render('pages/community', { title: 'Community Guidelines - TravelAtlas' });
};


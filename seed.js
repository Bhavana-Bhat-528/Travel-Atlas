require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Destination = require('./models/Destination');
const Review = require('./models/Review');
const seedDestinations = require('./utils/seedData');

const seedDB = async () => {
  try {
    let connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travelAtlas';
    try {
      await mongoose.connect(connStr);
    } catch (dbErr) {
      if (dbErr.message && dbErr.message.includes('already exists with different case')) {
        connStr = connStr.replace(/\/travelAtlas/i, '/travelatlas');
        await mongoose.connect(connStr);
      } else {
        throw dbErr;
      }
    }
    console.log('[Seed Script] Connected to MongoDB.');

    // Clear existing data
    await User.deleteMany({});
    await Destination.deleteMany({});
    await Review.deleteMany({});
    console.log('[Seed Script] Cleared old collection records.');

    // Create demo users: Jane Doe & Traveler Sam
    const janeDoe = new User({
      username: 'jane_doe',
      email: 'janedoe@example.com',
      bio: 'Avid traveler and outdoor enthusiast exploring nature trails and hidden gems.',
      profileImage: {
        url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
        filename: 'jane-doe'
      }
    });
    const registeredJane = await User.register(janeDoe, 'Password123!');
    console.log(`[Seed Script] Created seed user: ${registeredJane.username} (Password123!)`);

    const demoUser = new User({
      username: 'traveler_sam',
      email: 'sam@travelatlas.com',
      bio: 'Wanderlust explorer sharing structured insights from 30+ countries.',
      profileImage: {
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        filename: 'demo-user'
      }
    });

    const registeredUser = await User.register(demoUser, 'Password123!');
    console.log(`[Seed Script] Created seed user: ${registeredUser.username} (Password123!)`);

    // Insert destinations and sample reviews
    for (const data of seedDestinations) {
      const { sampleReviews, ...destInfo } = data;

      const destination = new Destination({
        ...destInfo,
        createdBy: registeredUser._id,
        createdByName: registeredUser.username,
        reviews: []
      });

      await destination.save();

      let totalRating = 0;

      if (sampleReviews && sampleReviews.length > 0) {
        for (const revData of sampleReviews) {
          const review = new Review({
            ...revData,
            destination: destination._id,
            author: registeredUser._id,
            authorName: registeredUser.username
          });

          await review.save();
          destination.reviews.push(review._id);
          totalRating += review.rating;
        }

        destination.averageRating = parseFloat(
          (totalRating / sampleReviews.length).toFixed(1)
        );
        await destination.save();
      }

      console.log(`[Seed Script] Seeded: ${destination.title} (${destination.category}) with ${destination.reviews.length} reviews`);
    }

    console.log('\n✅ Database Seeding Completed Successfully!');
    process.exit(0);
  } catch (err) {
    console.error(`❌ [Seed Error] ${err.message}`);
    process.exit(1);
  }
};

seedDB();

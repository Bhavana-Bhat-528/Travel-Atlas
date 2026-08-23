const User = require('../models/User');
const { getFileUrl, getFileName } = require('../config/cloudinary');
const Destination = require('../models/Destination');
const Review = require('../models/Review');
const catchAsync = require('../utils/catchAsync');

// Render Signup Page
module.exports.renderSignup = (req, res) => {
  res.render('auth/signup', { title: 'Join TravelAtlas' });
};

// Handle Signup Logic
module.exports.signup = catchAsync(async (req, res, next) => {
  try {
    const { username, email, password, bio } = req.body;
    let profileImage = {
      url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      filename: 'default-avatar'
    };

    if (req.file) {
      profileImage = {
        url: getFileUrl(req.file),
        filename: getFileName(req.file)
      };
    }

    const user = new User({ email, username, bio, profileImage });
    const registeredUser = await User.register(user, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash('success', `Welcome to TravelAtlas, ${registeredUser.username}!`);
      req.session.save((saveErr) => {
        if (saveErr) console.error('Session save error:', saveErr);
        res.redirect('/destinations');
      });
    });
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('/signup');
  }
});

// Render Login Page
module.exports.renderLogin = (req, res) => {
  res.render('auth/login', { title: 'Login - TravelAtlas' });
};

// Handle Login
module.exports.login = (req, res) => {
  req.flash('success', `Welcome back, ${req.user.username}!`);
  const redirectUrl = res.locals.returnTo || '/destinations';
  delete req.session.returnTo;
  req.session.save((err) => {
    if (err) console.error('Session save error:', err);
    res.redirect(redirectUrl);
  });
};

// Handle Logout
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash('success', 'Logged out successfully.');
    req.session.save((saveErr) => {
      if (saveErr) console.error('Session save error:', saveErr);
      res.redirect('/');
    });
  });
};

// Show Profile Page
module.exports.showProfile = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    req.flash('error', 'User not found!');
    return res.redirect('/destinations');
  }

  // Fetch destinations and reviews authored by this user
  const destinationsAdded = await Destination.find({ createdBy: user._id });
  const reviewsWritten = await Review.find({ author: user._id }).populate('destination', 'title state country coverImage');

  res.render('auth/profile', {
    title: `${user.username}'s Profile - TravelAtlas`,
    profileUser: user,
    destinationsAdded,
    reviewsWritten
  });
});

// Render Edit Profile Form
module.exports.renderEditProfile = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.render('auth/editProfile', {
    title: 'Edit Profile - TravelAtlas',
    profileUser: user
  });
});

// Update Profile Logic
module.exports.updateProfile = catchAsync(async (req, res) => {
  const { username, bio } = req.body.user;
  const user = await User.findById(req.user._id);

  if (!user) {
    req.flash('error', 'User not found!');
    return res.redirect('/destinations');
  }

  user.username = username;
  user.bio = bio;

  if (req.file) {
    user.profileImage = {
      url: getFileUrl(req.file),
      filename: getFileName(req.file)
    };
  }

  await user.save();
  req.flash('success', 'Profile updated successfully!');
  res.redirect(`/profile/${user._id}`);
});

// Delete Account (Preserving Community Knowledge)
module.exports.deleteAccount = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  // 1. Reassign user's reviews to Anonymous Traveler
  await Review.updateMany(
    { author: userId },
    { $set: { author: null, authorName: 'Anonymous Traveler' } }
  );

  // 2. Reassign user's created destinations to Anonymous Traveler
  await Destination.updateMany(
    { createdBy: userId },
    { $set: { createdBy: null, createdByName: 'Anonymous Traveler' } }
  );

  // 3. Delete user document
  await User.findByIdAndDelete(userId);

  // 4. Logout session
  req.logout((err) => {
    if (err) return next(err);
    req.flash('success', 'Account deleted. Your community travel contributions remain preserved for future travelers.');
    res.redirect('/');
  });
});

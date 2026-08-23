const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');
const { isLoggedIn, storeReturnTo } = require('../middleware/auth');
const { validateProfile } = require('../middleware/validate');
const { upload } = require('../config/cloudinary');
const { authLimiter } = require('../middleware/security');

// Signup Routes
router
  .route('/signup')
  .get(authController.renderSignup)
  .post(authLimiter, upload.single('profileImage'), authController.signup);

// Login Routes
router
  .route('/login')
  .get(authController.renderLogin)
  .post(
    authLimiter,
    storeReturnTo,
    passport.authenticate('local', {
      failureFlash: true,
      failureRedirect: '/login'
    }),
    authController.login
  );

// Logout Route
router.get('/logout', authController.logout);

// User Profile & Contributions
router.get('/profile/:id', authController.showProfile);

// Edit Profile Routes
router
  .route('/profile/edit/me')
  .get(isLoggedIn, authController.renderEditProfile)
  .put(isLoggedIn, upload.single('profileImage'), validateProfile, authController.updateProfile);

// Delete Account Route (Preserves community contributions)
router.delete('/profile/delete/me', isLoggedIn, authController.deleteAccount);

module.exports = router;

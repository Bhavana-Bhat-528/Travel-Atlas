const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController');
const { isLoggedIn, isDestinationOwner } = require('../middleware/auth');
const { validateDestination } = require('../middleware/validate');
const { upload } = require('../config/cloudinary');

// Root Landing Page (`/`)
router.get('/', destinationController.landingPage);

// Platform Static Pages
router.get('/privacy', destinationController.privacyPolicy);
router.get('/terms', destinationController.termsConditions);
router.get('/community-guidelines', destinationController.communityGuidelines);


// Explore Destinations (`/destinations`) & Create Destination (`POST /destinations`)
router
  .route('/destinations')
  .get(isLoggedIn, destinationController.index)
  .post(
    isLoggedIn,
    upload.single('coverImage'),
    validateDestination,
    destinationController.createDestination
  );

// Live Duplicate Check API Endpoint
router.get('/api/destinations/check-duplicate', destinationController.checkDuplicate);

// Render New Destination Form
router.get('/destinations/new', isLoggedIn, destinationController.renderNew);

// Show, Update & Delete Destination Routes
router
  .route('/destinations/:id')
  .get(isLoggedIn, destinationController.showDestination)
  .put(
    isLoggedIn,
    isDestinationOwner,
    upload.single('coverImage'),
    validateDestination,
    destinationController.updateDestination
  )
  .delete(isLoggedIn, isDestinationOwner, destinationController.deleteDestination);

// Render Edit Form
router.get('/destinations/:id/edit', isLoggedIn, isDestinationOwner, destinationController.renderEdit);

module.exports = router;

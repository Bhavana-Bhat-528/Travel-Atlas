const express = require('express');
const router = express.Router({ mergeParams: true });
const reviewController = require('../controllers/reviewController');
const { isLoggedIn, isReviewOwner } = require('../middleware/auth');
const { validateReview } = require('../middleware/validate');
const { upload } = require('../config/cloudinary');

// Create Review Route (`POST /destinations/:id/reviews`)
router.post(
  '/',
  isLoggedIn,
  upload.array('reviewImages', 5), // Allow up to 5 photos per review
  validateReview,
  reviewController.createReview
);

// Delete Review Route (`DELETE /destinations/:id/reviews/:reviewId`)
router.delete('/:reviewId', isLoggedIn, isReviewOwner, reviewController.deleteReview);

module.exports = router;

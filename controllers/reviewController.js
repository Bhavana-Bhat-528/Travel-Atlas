const Destination = require('../models/Destination');
const Review = require('../models/Review');
const catchAsync = require('../utils/catchAsync');
const { getFileUrl, getFileName } = require('../config/cloudinary');

// Helper function to re-calculate destination average rating
const updateDestinationAverageRating = async (destinationId) => {
  const destination = await Destination.findById(destinationId).populate('reviews');
  if (!destination) return;

  if (destination.reviews.length === 0) {
    destination.averageRating = 0;
  } else {
    const totalRating = destination.reviews.reduce((acc, curr) => acc + curr.rating, 0);
    destination.averageRating = parseFloat((totalRating / destination.reviews.length).toFixed(1));
  }
  await destination.save();
};

// Create Review
module.exports.createReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const destination = await Destination.findById(id);

  if (!destination) {
    req.flash('error', 'Destination not found!');
    return res.redirect('/destinations');
  }

  const reviewData = req.body.review;
  reviewData.destination = destination._id;
  reviewData.author = req.user._id;
  reviewData.authorName = req.user.username;

  // Process multiple review photo uploads if attached
  if (req.files && req.files.length > 0) {
    reviewData.images = req.files.map((file) => ({
      url: getFileUrl(file),
      filename: getFileName(file)
    }));
  }

  const review = new Review(reviewData);
  await review.save();

  destination.reviews.push(review._id);
  await destination.save();

  // Update destination average rating
  await updateDestinationAverageRating(destination._id);

  req.flash('success', 'Thank you for contributing your travel experience!');
  res.redirect(`/destinations/${destination._id}`);
});

// Delete Review
module.exports.deleteReview = catchAsync(async (req, res) => {
  const { id, reviewId } = req.params;

  // Remove review reference from Destination
  await Destination.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  
  // Delete Review document
  await Review.findByIdAndDelete(reviewId);

  // Recalculate average rating
  await updateDestinationAverageRating(id);

  req.flash('success', 'Successfully deleted review!');
  res.redirect(`/destinations/${id}`);
});

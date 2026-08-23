const Destination = require('../models/Destination');
const Review = require('../models/Review');

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash('error', 'You must be signed in to perform this action!');
    return res.redirect('/login');
  }
  next();
};

const storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};

const isDestinationOwner = async (req, res, next) => {
  const { id } = req.params;
  const destination = await Destination.findById(id);

  if (!destination) {
    req.flash('error', 'Destination not found!');
    return res.redirect('/destinations');
  }

  if (destination.createdBy && !destination.createdBy.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to modify this destination!');
    return res.redirect(`/destinations/${id}`);
  }
  next();
};

const isReviewOwner = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);

  if (!review) {
    req.flash('error', 'Review not found!');
    return res.redirect(`/destinations/${id}`);
  }

  if (review.author && !review.author.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to delete this review!');
    return res.redirect(`/destinations/${id}`);
  }
  next();
};

module.exports = {
  isLoggedIn,
  storeReturnTo,
  isDestinationOwner,
  isReviewOwner
};

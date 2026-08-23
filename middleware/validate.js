const Joi = require('joi');
const sanitizeHtml = require('sanitize-html');
const ExpressError = require('../utils/ExpressError');

// Custom Joi extension to sanitize HTML & prevent XSS
const extension = (joi) => ({
  type: 'string',
  base: joi.string(),
  messages: {
    'string.escapeHTML': '{{#label}} must not include HTML or script tags!'
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {}
        });
        if (clean !== value) return helpers.error('string.escapeHTML', { value });
        return clean;
      }
    }
  }
});

const CustomJoi = Joi.extend(extension);

// Joi Destination Schema
const destinationJoiSchema = CustomJoi.object({
  destination: CustomJoi.object({
    title: CustomJoi.string().required().escapeHTML().trim(),
    description: CustomJoi.string().required().escapeHTML().trim(),
    state: CustomJoi.string().required().escapeHTML().trim(),
    country: CustomJoi.string().required().escapeHTML().trim(),
    category: CustomJoi.string()
      .valid(
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
      )
      .required()
  }).required()
});

// Joi Review Schema
const reviewJoiSchema = CustomJoi.object({
  review: CustomJoi.object({
    rating: CustomJoi.number().min(1).max(5).required(),
    review: CustomJoi.string().required().escapeHTML().trim(),
    visitedSeason: CustomJoi.string()
      .valid('Spring', 'Summer', 'Monsoon', 'Autumn', 'Winter')
      .required(),
    travelMode: CustomJoi.string()
      .valid('Car', 'Bike', 'Public Transport', 'Trekking/Walking', 'Tour Bus')
      .required(),
    travelTips: CustomJoi.string().allow('').escapeHTML().trim(),
    parking: CustomJoi.string()
      .valid('Available', 'Limited', 'Paid', 'Not Available')
      .required(),
    foodAvailability: CustomJoi.string()
      .valid('Available', 'Nearby', 'Pack Your Own', 'None')
      .required(),
    crowdLevel: CustomJoi.string()
      .valid('Low', 'Moderate', 'High', 'Extreme')
      .required(),
    familyFriendly: CustomJoi.string()
      .valid('Yes', 'No', 'Partially')
      .required(),
    timeSpent: CustomJoi.string()
      .valid('1-2 Hours', 'Half Day', 'Full Day', 'Multi-Day')
      .required()
  }).required()
});

// Joi User Profile Schema
const profileJoiSchema = CustomJoi.object({
  user: CustomJoi.object({
    username: CustomJoi.string().required().escapeHTML().trim(),
    bio: CustomJoi.string().allow('').escapeHTML().trim().max(300)
  }).required()
});

// Middleware handlers
const validateDestination = (req, res, next) => {
  const { error } = destinationJoiSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(', ');
    req.flash('error', `Validation Error: ${msg}`);
    return res.redirect('back');
  }
  next();
};

const validateReview = (req, res, next) => {
  const { error } = reviewJoiSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(', ');
    req.flash('error', `Validation Error: ${msg}`);
    return res.redirect('back');
  }
  next();
};

const validateProfile = (req, res, next) => {
  const { error } = profileJoiSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(', ');
    req.flash('error', `Validation Error: ${msg}`);
    return res.redirect('back');
  }
  next();
};

module.exports = {
  validateDestination,
  validateReview,
  validateProfile
};

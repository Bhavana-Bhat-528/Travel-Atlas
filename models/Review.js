const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String
});

const ReviewSchema = new Schema(
  {
    destination: {
      type: Schema.Types.ObjectId,
      ref: 'Destination',
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false // May be set to null or Anonymous Traveler if user deletes account
    },
    authorName: {
      type: String,
      default: 'Anonymous Traveler'
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    visitedSeason: {
      type: String,
      enum: ['Spring', 'Summer', 'Monsoon', 'Autumn', 'Winter'],
      default: 'Summer'
    },
    travelMode: {
      type: String,
      enum: ['Car', 'Bike', 'Public Transport', 'Trekking/Walking', 'Tour Bus'],
      default: 'Car'
    },
    review: {
      type: String,
      required: [true, 'Review description is required'],
      trim: true
    },
    travelTips: {
      type: String,
      default: ''
    },
    parking: {
      type: String,
      enum: ['Available', 'Limited', 'Paid', 'Not Available'],
      default: 'Available'
    },
    foodAvailability: {
      type: String,
      enum: ['Available', 'Nearby', 'Pack Your Own', 'None'],
      default: 'Available'
    },
    crowdLevel: {
      type: String,
      enum: ['Low', 'Moderate', 'High', 'Extreme'],
      default: 'Moderate'
    },
    familyFriendly: {
      type: String,
      enum: ['Yes', 'No', 'Partially'],
      default: 'Yes'
    },
    timeSpent: {
      type: String,
      enum: ['1-2 Hours', 'Half Day', 'Full Day', 'Multi-Day'],
      default: 'Half Day'
    },
    images: [ImageSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', ReviewSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./Review');

const ImageSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  filename: String
});

const DestinationSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Destination title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    state: {
      type: String,
      required: [true, 'State / Region is required'],
      trim: true
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true
    },
    coordinates: {
      latitude: { type: Number, required: true, default: 15.4989 },
      longitude: { type: Number, required: true, default: 73.8278 }
    },
    coverImage: ImageSchema,
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
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
      ]
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review'
      }
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    createdByName: {
      type: String,
      default: 'Anonymous Traveler'
    }
  },
  { timestamps: true }
);

// Compound index to help search & prevent identical duplicate title + state + country
DestinationSchema.index({ title: 1, state: 1, country: 1 });

// Cascade delete reviews when a destination is removed
DestinationSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews
      }
    });
  }
});

module.exports = mongoose.model('Destination', DestinationSchema);

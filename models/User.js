const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true
    },
    profileImage: {
      url: {
        type: String,
        default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'
      },
      filename: {
        type: String,
        default: 'default-avatar'
      }
    },
    bio: {
      type: String,
      default: 'Passionate traveler exploring the world with TravelAtlas.',
      maxLength: 300
    },
    isAnonymous: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// Plugin handles username, hash, salt
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);

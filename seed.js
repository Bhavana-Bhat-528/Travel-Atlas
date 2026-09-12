require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Destination = require('./models/Destination');
const Review = require('./models/Review');
const seedDestinations = require('./utils/seedData');

const seedDB = async () => {
  try {
    let connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travelatlas';
    try {
      const conn = await mongoose.connect(connStr);
      console.log(`[Seed Script] Connected to MongoDB Atlas host: ${conn.connection.host} (Database: ${conn.connection.name})`);
    } catch (dbErr) {
      if (dbErr.message && dbErr.message.includes('already exists with different case')) {
        connStr = connStr.replace(/\/travelAtlas/i, '/travelatlas');
        const conn = await mongoose.connect(connStr);
        console.log(`[Seed Script] Connected to MongoDB Atlas host: ${conn.connection.host} (Database: ${conn.connection.name})`);
      } else {
        throw dbErr;
      }
    }

    // Clear existing data
    await User.deleteMany({});
    await Destination.deleteMany({});
    await Review.deleteMany({});
    console.log('[Seed Script] Cleared old collection records.');

    // Create demo users: Jane Doe & Traveler Sam
    const janeDoe = new User({
      username: 'jane_doe',
      email: 'janedoe@example.com',
      bio: 'Avid traveler and outdoor enthusiast exploring nature trails and hidden gems.',
      profileImage: {
        url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
        filename: 'jane-doe'
      }
    });
    const registeredJane = await User.register(janeDoe, 'Password123!');
    console.log(`[Seed Script] Created seed user: ${registeredJane.username} (Password123!)`);

    const demoUser = new User({
      username: 'traveler_sam',
      email: 'sam@travelatlas.com',
      bio: 'Wanderlust explorer sharing structured insights from 30+ countries.',
      profileImage: {
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        filename: 'demo-user'
      }
    });

    const registeredUser = await User.register(demoUser, 'Password123!');
    console.log(`[Seed Script] Created seed user: ${registeredUser.username} (Password123!)`);

    // Insert destinations and sample reviews (distributed between jane_doe and traveler_sam)
    for (let i = 0; i < seedDestinations.length; i++) {
      const data = seedDestinations[i];
      const { sampleReviews, ...destInfo } = data;

      // Distribute destination creator between jane_doe and traveler_sam
      const destCreator = i % 2 === 0 ? registeredJane : registeredUser;

      const destination = new Destination({
        ...destInfo,
        createdBy: destCreator._id,
        createdByName: destCreator.username,
        reviews: []
      });

      await destination.save();

      let totalRating = 0;

      if (sampleReviews && sampleReviews.length > 0) {
        for (let rIdx = 0; rIdx < sampleReviews.length; rIdx++) {
          const revData = sampleReviews[rIdx];
          // Alternate review author between jane_doe and traveler_sam
          const reviewAuthor = (i + rIdx) % 2 === 0 ? registeredJane : registeredUser;

          const review = new Review({
            ...revData,
            destination: destination._id,
            author: reviewAuthor._id,
            authorName: reviewAuthor.username
          });

          await review.save();
          destination.reviews.push(review._id);
          totalRating += review.rating;
        }

        destination.averageRating = parseFloat(
          (totalRating / sampleReviews.length).toFixed(1)
        );
        await destination.save();
      }

      console.log(`[Seed Script] Seeded: ${destination.title} (${destination.category}) by ${destCreator.username} with ${destination.reviews.length} reviews`);
    }

    console.log('\n✅ Database Seeding Completed Successfully!');
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error(`❌ [Seed Error] ${err.message}`);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
};

seedDB();

const mongoose = require('mongoose');

const connectDB = async () => {
  let connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travelatlas';
  try {
    const conn = await mongoose.connect(connStr);
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host} (Database: ${conn.connection.name})`);
  } catch (err) {
    if (err.message && err.message.includes('already exists with different case')) {
      console.warn('[MongoDB] Database case mismatch detected. Falling back to travelatlas...');
      connStr = connStr.replace(/\/travelAtlas/i, '/travelatlas');
      const conn = await mongoose.connect(connStr);
      console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host} (Database: ${conn.connection.name})`);
      return;
    }
    console.error(`[MongoDB Connection Error] ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

// config/db.js

const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is missing. Add your MongoDB connection string to backend/.env.');
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    const details = error.message.replace(
      /mongodb(?:\+srv)?:\/\/[^@\s]+@/gi,
      'mongodb://[REDACTED]@'
    );
    const code = error.code ? ` (${error.code})` : '';
    throw new Error(`MongoDB connection failed${code}: ${details}`);
  }
};

module.exports = connectDB;
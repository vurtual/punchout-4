const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_DOMAIN = process.env.MONGODB_DOMAIN;

const connectToDB = async () => {
  const mongoDBURI = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_DOMAIN}`;
  try {
    await mongoose.connect(mongoDBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return 'Connected to MongoDB Database';
  } catch (error) {
    console.error(error);
  }
};

module.exports = { connectToDB };

const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_DOMAIN = process.env.MONGODB_DOMAIN;

async function connectToDB(reload = false) {
  const mongoDBURI = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_DOMAIN}`;
  try {
    await mongoose.connect(mongoDBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // disconnectionTest()

    if (!reload) maintainConnection();
    return 'Connected to MongoDB Database';
  } catch (error) {
    console.error(error);
    return false;
  }
}

function maintainConnection() {
  mongoose.connection.on('disconnected', async () => {
    console.log('Disconnected from MongoDB');
    console.log('Attempting reconnection');
    let connected = false;
    const reload = true;
    do {
      connected = await connectToDB(reload);
    } while (!connected);
  });

  mongoose.connection.on('error', error => {
    console.error('MongoDB connection error:', error);
  });
}

function disconnectionTest() {
  let seconds = 5;

  let int = setInterval(
    () => console.log(`Disconnecting mongo db in ${1000 * --seconds} seconds`),
    1000
  );

  setTimeout(() => {
    mongoose.connection.emit('disconnected');
  }, 1000 * seconds);
}

module.exports = { connectToDB };

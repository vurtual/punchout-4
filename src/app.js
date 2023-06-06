const { connectToDB } = require('./server/data/connect-mongo-db');
const { launchServer } = require('./server/serve');

const startup = async () => {
  console.log(await launchServer());
  console.log(await connectToDB());
};

startup();

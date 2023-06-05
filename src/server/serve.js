const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT;
const PROTOCOL = process.env.PROTOCOL;
const URL = process.env.URL;

const launchServer = app.listen(PORT, () =>
  console.log(`Server running at ${PROTOCOL}://${URL}:${PORT}`)
);

module.exports = { launchServer };

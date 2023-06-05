const express = require('express');
const { router } = require('./routes');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT;
const PROTOCOL = process.env.PROTOCOL;
const URL = process.env.URL;

app.set('views', 'src/client/views');
app.set('viewengine', 'ejs');
app.use('/', router);
app.use(express.static('src/client/public'));

const launchServer = app.listen(PORT, () =>
  console.log(`Server running at ${PROTOCOL}://${URL}:${PORT}`)
);

module.exports = { launchServer };

const { Router } = require('express');
const router = Router();
const { clientRouter } = require('./routes/client');

router.use('/', clientRouter);

module.exports = { router };

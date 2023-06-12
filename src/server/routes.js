const { Router } = require('express');
const router = Router();
const { serverRouter } = require('./routes/server');
const { clientRouter } = require('./routes/client');

router.use('/api', serverRouter);
console.log('1');

router.use('/', clientRouter);
console.log('2');

module.exports = { router };

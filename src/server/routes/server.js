const { Router } = require('express');
const { productRouter } = require('./server-routes/product');
const serverRouter = Router();

serverRouter.use('/', productRouter);

module.exports = { serverRouter };

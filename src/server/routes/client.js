const { Router } = require('express');
const { homeRouter } = require('./client-routes/home');
const clientRouter = Router();

module.exports = { clientRouter };

clientRouter.use('/', homeRouter);

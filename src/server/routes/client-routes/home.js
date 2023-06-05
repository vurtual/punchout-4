const { Router } = require('express');
const homeRouter = Router();

module.exports = { homeRouter };

homeRouter.get('/', (req, res) => res.render('home.ejs'));

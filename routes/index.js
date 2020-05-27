const routes = require('express').Router();
const apiRoutes = require('./apiRoutes');


routes.use("/", apiRoutes)


module.exports = routes
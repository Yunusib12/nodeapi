const routes = require('express').Router();
const dbController = require('../controllers/dbController');

routes
    .route("/")
    .get(dbController.findAllEmployee);

routes
    .route("/api/employee/:id")
    .get(dbController.getEmployeeDetail);


module.exports = routes
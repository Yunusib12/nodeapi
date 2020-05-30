const routes = require('express').Router();
const dbController = require('../controllers/dbController');

//Default Route
routes
    .route("/")
    .get(dbController.findAllEmployee);

//Get employee Detail Route
routes
    .route("/api/employee/:id")
    .get(dbController.getEmployeeData);

//Get employee Detail plus Project assigned to him
routes
    .route("/api/getemployeedetails/:id?")
    .get(dbController.getEmployeeDetail);

//Get Single Project Detail
routes
    .route("/api/project/:id?")
    .get(dbController.getProjectDetail)

module.exports = routes
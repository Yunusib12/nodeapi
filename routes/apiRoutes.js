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
    .route("/api/getemployeedetails")
    .get(dbController.getEmployeeDetail);

//Get Projects list
// routes
//     .route("/api/project")
//     .get(dbController.getAllProject);

//Get Single Project Detail
routes
    .route("/api/project/:id?")
    .get(dbController.getProjectDetail)

module.exports = routes
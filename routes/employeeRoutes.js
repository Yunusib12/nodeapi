/**
 * routes/employeeRoutes.js — every employee URL.
 *
 * Mounted under "/api" (see routes/index.js), so a path like
 * "/employee/new" here is reached in the browser as "/api/employee/new".
 *
 * ROUTE ORDER MATTERS. Express checks routes top-to-bottom and uses the
 * first match. ":id" is a wildcard that matches ANY value, so the
 * specific paths ("/employee/new", "/employee/:id/edit") must be listed
 * BEFORE the catch-all "/employee/:id?", otherwise "new" would be
 * treated as an :id.
 */

import express from 'express';
import dbController from '../controllers/index.js';

const routes = express.Router();

// ---- Create ----
routes.get("/employee/new", dbController.showCreateEmployeeForm); // show blank form
routes.post("/employee", dbController.createEmployee);            // save new employee

// ---- Edit / Update ----
routes.get("/employee/:id/edit", dbController.showEditEmployeeForm); // show pre-filled form
routes.post("/employee/:id", dbController.updateEmployee);           // save changes

// ---- Delete ----
// HTML forms can only do GET/POST, so deletion uses POST (not HTTP DELETE).
routes.post("/employee/:id/delete", dbController.deleteEmployee);

// ---- Read ----
// With an :id -> HTML detail page; without -> JSON list of all employees.
routes
    .route("/employee/:id?")
    .get(dbController.getEmployeeData);

// Employee profile(s) + assigned project, as JSON.
routes
    .route("/getemployeedetails/:id?")
    .get(dbController.getEmployeeDetail);

export default routes;

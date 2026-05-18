/**
 * routes/defaultRoutes.js — the website's home page route.
 *
 * Mounted at "/" in routes/index.js, so:
 *   GET /  ->  dbController.findAllEmployee  ->  renders the employee list
 */

import express from 'express';
import dbController from '../controllers/index.js';

const routes = express.Router();

// .route("/").get(...) means: when a GET request hits "/", run this controller.
routes
    .route("/")
    .get(dbController.findAllEmployee);

export default routes;

/**
 * routes/projectRoutes.js — project URLs.
 *
 * Mounted under "/api", so:
 *   GET /api/project       -> all projects (JSON)
 *   GET /api/project/2     -> project #2  (JSON, 404 if missing)
 *
 * ("?" after :id makes the id optional, so one route handles both cases.)
 */

import express from 'express';
import dbController from '../controllers/index.js';

const routes = express.Router();

routes
    .route("/project/:id?")
    .get(dbController.getProjectDetail);

export default routes;

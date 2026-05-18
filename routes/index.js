/**
 * routes/index.js — the top-level router.
 *
 * A "router" is a mini Express app that maps URL paths to controllers.
 * We split routes by area and mount each group under a base path:
 *
 *   "/"     -> defaultRoutes   (the home page)
 *   "/api"  -> employeeRoutes  (so its "/employee" becomes "/api/employee")
 *   "/api"  -> projectRoutes   (so its "/project"  becomes "/api/project")
 *
 * app.js does `app.use(routes)` to plug this whole tree into the app.
 */

import express from 'express';
import defaultRoutes from './defaultRoutes.js';
import employeeRoutes from './employeeRoutes.js';
import projectRoutes from './projectRoutes.js';

const routes = express.Router();

routes.use("/", defaultRoutes);     // GET /
routes.use("/api", employeeRoutes); // /api/employee...
routes.use("/api", projectRoutes);  // /api/project...

export default routes;

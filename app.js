/**
 * app.js — builds and configures the Express application.
 *
 * Think of an Express app as a pipeline: every incoming HTTP request flows
 * top-to-bottom through the "middleware" registered with app.use(...).
 * Order matters — each piece runs in the order it is added here.
 *
 * The app is exported (not started) so tests can drive it directly.
 */

import "dotenv/config";                  // loads variables from the .env file into process.env (must run first)
import express from "express";           // the web framework
import helmet from "helmet";             // sets security-related HTTP headers
import morgan from "morgan";             // logs each incoming request to the console
import path from "path";                 // helps build correct file-system paths
import { fileURLToPath } from "url";     // converts an ES-module URL to a normal path
import routes from "./routes/index.js";  // all of our application routes
import { notFound, errorHandler } from "./middleware/index.js"; // 404 + error handlers
import { PUBLIC_DIR, VIEW_ENGINE, VIEWS_DIR } from "./inc/index.js";

// __dirname is not available in ES modules by default, so we recreate it.
// It is the absolute path of the folder this file lives in.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 1) Security headers. Helmet sets safe defaults. We customise the Content
//    Security Policy (CSP): the browser will only load resources from places
//    we list here. We explicitly allow avatar images from the DiceBear host.
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            "default-src": ["'self'"],                                  // by default only our own server
            "img-src": ["'self'", "data:", "https://api.dicebear.com"], // images: us + inline + DiceBear
            "style-src": ["'self'", "'unsafe-inline'"],                 // CSS: us + inline style="" attributes
            "script-src": ["'self'"]                                    // JS: only files served by us
        }
    }
}));

// 2) Request logging. Skipped during automated tests so test output stays clean.
if (process.env.NODE_ENV !== "test") {
    app.use(morgan("dev"));
}

// 3) Parse HTML form submissions. After this, form fields are available
//    as req.body (used by the create/update Employee forms).
app.use(express.urlencoded({ extended: true }));

// 4) Serve static files (CSS, client-side JS) straight from the /public folder.
app.use(express.static(path.join(__dirname, PUBLIC_DIR)));

// 5) Tell Express to render .ejs templates, and where to find them.
app.set("view engine", VIEW_ENGINE);
app.set("views", path.join(__dirname, VIEWS_DIR));

// 6) Our actual application routes (home page + /api/* endpoints).
app.use(routes);

// 7) If no route above matched the URL, this 404 handler responds.
app.use(notFound);

// 8) If any handler called next(err), this centralized error handler
//    formats the response. It MUST be registered last.
app.use(errorHandler);

export default app;

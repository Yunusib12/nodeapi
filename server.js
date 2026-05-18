/**
 * server.js — the application ENTRY POINT.
 *
 * This file does only one job: take the fully-configured Express app
 * (built in app.js) and start an HTTP server listening on a port.
 *
 * Why is this separate from app.js?
 *   - app.js exports the app WITHOUT calling listen(). That lets the
 *     automated tests import the app and send fake requests to it without
 *     ever opening a real network port.
 *   - server.js is what you run in real life: `npm start` -> node server.js
 */

import app from "./app.js";              // the configured Express application
import { PORT } from "./inc/index.js"; // which port to listen on (from .env)

// Start the web server. The callback runs once the server is ready.
app.listen(PORT, () => console.log(`The server is listening on port ${PORT}`));

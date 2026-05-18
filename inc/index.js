/**
 * inc/index.js — every "magic value" in the app lives here.
 *
 * Why centralize constants? So there is ONE place to change a value, and so
 * the rest of the code reads with names (HTTP_NOT_FOUND) instead of numbers
 * (404). Import only what you need, e.g.:
 *   import { HTTP_NOT_FOUND } from "../inc/index.js";
 *
 * Note: "dotenv/config" is imported in app.js BEFORE this file is used, so
 * process.env is already populated when PORT below is evaluated.
 */

// The port the server listens on. Comes from the .env file; if missing,
// fall back to 4000. (Your .env currently sets PORT=4005.)
export const PORT = process.env.PORT || 4000;

// HTTP status codes — numbers the browser understands.
export const HTTP_OK = 200;          // success
export const HTTP_NOT_FOUND = 404;   // resource/route does not exist
export const HTTP_SERVER_ERROR = 500; // something blew up on the server

// EJS template names (files in src/views/, without the .ejs extension).
export const VIEW_MAIN = "main";                     // home page (employee list)
export const VIEW_EMPLOYEE_DETAIL = "employeedetail"; // one employee + project
export const VIEW_EMPLOYEE_FORM = "employeeForm";     // create/edit form
export const VIEW_ERROR = "error";                    // 404 / 500 page

// File-system locations and the template engine name.
export const PUBLIC_DIR = "/public";              // static assets folder
export const VIEWS_DIR = "./src/views";           // EJS templates folder
export const VIEW_ENGINE = "ejs";                 // templating engine
export const DB_EMPLOYEE_PATH = "./db/employeeDb.json"; // "database" file (employees)
export const DB_PROJECT_PATH = "./db/projectDb.json";   // "database" file (projects)

// Content types — used to decide whether to answer with HTML, JSON or text.
export const CONTENT_HTML = "text/html";
export const CONTENT_JSON = "application/json";
export const CONTENT_TEXT = "txt";

// Human-readable error messages.
export const MSG_NOT_FOUND = "Not Found";
export const MSG_SERVER_ERROR = "Internal Server Error";
export const MSG_GENERIC_ERROR = "Something went wrong";

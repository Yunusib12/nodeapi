/**
 * middleware/index.js — the "nothing matched" and "something broke" handlers.
 *
 * These are registered LAST in app.js:
 *   - notFound:     runs when no route matched the URL  -> 404
 *   - errorHandler: runs when any controller called next(err) -> 4xx/5xx
 *
 * Both use res.format(), which looks at the request's "Accept" header and
 * replies in the format the client wants: an HTML page for a browser, or
 * JSON for an API client (and plain text as a last resort).
 */

import {
    HTTP_NOT_FOUND,
    HTTP_SERVER_ERROR,
    VIEW_ERROR,
    CONTENT_HTML,
    CONTENT_JSON,
    CONTENT_TEXT,
    MSG_NOT_FOUND,
    MSG_SERVER_ERROR,
    MSG_GENERIC_ERROR
} from "../inc/index.js";

/**
 * notFound — catch-all for unknown routes.
 * Reached only if no route above it matched, so it always means "404".
 */
function notFound(req, res) {

    res.status(HTTP_NOT_FOUND);

    res.format({
        // Browser asked for HTML -> render the error page.
        [CONTENT_HTML]: () => res.render(VIEW_ERROR, {
            status: HTTP_NOT_FOUND,
            message: MSG_NOT_FOUND,
            url: `The route ${req.originalUrl} does not exist`
        }),
        // API client asked for JSON -> send a JSON error object.
        [CONTENT_JSON]: () => res.json({
            error: MSG_NOT_FOUND,
            message: `The route ${req.originalUrl} does not exist`
        }),
        // Anything else -> plain text.
        default: () => res.type(CONTENT_TEXT).send(`${HTTP_NOT_FOUND} ${MSG_NOT_FOUND}: ${req.originalUrl}`)
    });
}

/**
 * errorHandler — the single place that turns an error into a response.
 *
 * Express recognizes this as an error handler ONLY because it declares
 * FOUR parameters (err, req, res, next) — that's the special signature.
 * Controllers send errors here by calling next(err).
 *
 * err.status lets a controller choose the code (e.g. 404 for "not found");
 * if absent we assume 500 (a real server bug).
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {

    const status = err.status || HTTP_SERVER_ERROR;
    const message = err.message || MSG_GENERIC_ERROR;

    // Log real server faults (5xx) to the console. Expected client
    // mistakes (4xx, e.g. a wrong id) are normal — don't spam the log.
    if (status >= HTTP_SERVER_ERROR) {
        console.error(err.stack || err);
    }

    res.status(status);

    res.format({
        [CONTENT_HTML]: () => res.render(VIEW_ERROR, {
            status,
            // Show a friendly title; the detailed message goes in `url`.
            message: status === HTTP_NOT_FOUND ? MSG_NOT_FOUND : MSG_SERVER_ERROR,
            url: message
        }),
        [CONTENT_JSON]: () => res.json({
            error: err.name || MSG_SERVER_ERROR,
            message
        }),
        default: () => res.type(CONTENT_TEXT).send(`${status} ${message}`)
    });
}

export { notFound, errorHandler };

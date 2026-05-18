/**
 * findAllEmployee — handles GET "/" (the home page).
 *
 * Every Express handler receives three arguments:
 *   req  = the incoming request (URL, params, body, ...)
 *   res  = how we reply (render a page, send JSON, redirect, ...)
 *   next = call next(err) to hand an error to the error handler
 *
 * This one fetches every employee and renders the "main" template,
 * passing the list to the page as `listEmployeeArray`.
 */

import { employeeRepository } from '../repositories/index.js';
import { VIEW_MAIN } from '../inc/index.js';

function findAllEmployee(req, res, next) {

    try {
        const listEmployeeArray = employeeRepository.getAll();
        res.render(VIEW_MAIN, { listEmployeeArray }); // -> renders src/views/main.ejs
    } catch (err) {
        next(err); // anything thrown goes to the centralized error handler
    }
}

export default findAllEmployee;

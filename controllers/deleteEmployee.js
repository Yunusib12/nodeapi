/**
 * deleteEmployee — handles POST "/api/employee/:id/delete".
 *
 * Triggered by the small "Delete" form button on each employee card
 * (a JS confirm() dialog asks the user first — see public/assets/js/app.js).
 *
 * Ask the repository to remove the employee; if nothing was removed the
 * id didn't exist, so send 404. Otherwise redirect back to the list.
 */

import * as employeeRepository from '../repositories/employeeRepository.js';
import { HTTP_NOT_FOUND } from '../inc/constant.js';

function deleteEmployee(req, res, next) {
    try {
        const removed = employeeRepository.remove(req.params.id); // true / false

        if (!removed) {
            const err = new Error(`Employee ${req.params.id} not found`);
            err.status = HTTP_NOT_FOUND;
            return next(err);
        }

        res.redirect("/");
    } catch (err) {
        next(err);
    }
}

export default deleteEmployee;

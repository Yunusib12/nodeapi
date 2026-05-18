/**
 * showCreateEmployeeForm — handles GET "/api/employee/new"
 *
 * Just SHOWS the empty "Add Employee" form. It does not save anything;
 * submitting the form sends a POST to createEmployee.js.
 *
 * We pass the list of projects so the form can render a dropdown, and
 * `mode`/`action`/`error` so the same employeeForm.ejs template can be
 * reused for both creating and editing.
 */

import * as projectRepository from '../repositories/projectRepository.js';
import { VIEW_EMPLOYEE_FORM } from '../inc/constant.js';

function showCreateEmployeeForm(req, res, next) {
    try {
        res.render(VIEW_EMPLOYEE_FORM, {
            mode: "create",                 // the template uses this to pick labels
            formTitle: "Add Employee",
            action: "/api/employee",        // where the form POSTs to
            employee: { name: "", avatar: "", projectId: "" }, // empty fields
            projects: projectRepository.getAll(),               // for the dropdown
            error: null                     // no validation error yet
        });
    } catch (err) {
        next(err);
    }
}

export default showCreateEmployeeForm;

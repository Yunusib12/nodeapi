/**
 * createEmployee — handles POST "/api/employee" (the Add form submit).
 *
 * Flow:
 *   1. Read the submitted fields from req.body (filled by express.urlencoded).
 *   2. Validate: a name is required. If missing, re-show the form with a
 *      400 status and an error message (and keep what the user typed).
 *   3. Otherwise create the employee and redirect back to the home page,
 *      where the new employee now appears in the list.
 */

import { employeeRepository, projectRepository } from '../repositories/index.js';
import { VIEW_EMPLOYEE_FORM } from '../inc/index.js';

function createEmployee(req, res, next) {
    try {
        const { name, avatar, projectId } = req.body; // form fields

        // Validation: name must be present and not just whitespace.
        if (!name || !name.trim()) {
            return res.status(400).render(VIEW_EMPLOYEE_FORM, {
                mode: "create",
                formTitle: "Add Employee",
                action: "/api/employee",
                employee: { name, avatar, projectId }, // echo back user input
                projects: projectRepository.getAll(),
                error: "Name is required."
            });
        }

        employeeRepository.create({ name, avatar, projectId });
        res.redirect("/"); // Post/Redirect/Get: avoids resubmitting on refresh
    } catch (err) {
        next(err);
    }
}

export default createEmployee;

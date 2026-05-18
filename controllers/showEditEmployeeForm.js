/**
 * showEditEmployeeForm — handles GET "/api/employee/:id/edit"
 *
 * Shows the SAME form template as "create", but pre-filled with the
 * chosen employee's current values. Submitting it POSTs to updateEmployee.
 * If the id doesn't exist, send a 404.
 */

import { employeeRepository, projectRepository } from '../repositories/index.js';
import { VIEW_EMPLOYEE_FORM, HTTP_NOT_FOUND } from '../inc/index.js';

function showEditEmployeeForm(req, res, next) {
    try {
        const employee = employeeRepository.getById(req.params.id);

        if (!employee) {
            const err = new Error(`Employee ${req.params.id} not found`);
            err.status = HTTP_NOT_FOUND;
            return next(err);
        }

        res.render(VIEW_EMPLOYEE_FORM, {
            mode: "edit",
            formTitle: `Edit ${employee.name}`,
            action: `/api/employee/${employee.id}`, // POST target = update route
            employee,                               // pre-fills the inputs
            projects: projectRepository.getAll(),
            error: null
        });
    } catch (err) {
        next(err);
    }
}

export default showEditEmployeeForm;

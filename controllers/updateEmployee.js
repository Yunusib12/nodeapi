/**
 * updateEmployee — handles POST "/api/employee/:id" (the Edit form submit).
 *
 * (HTML forms can only send GET or POST, so we use POST here instead of
 * the REST-style PUT.)
 *
 * Flow: validate the name -> ask the repository to update -> if the id
 * was not found send 404, otherwise redirect back to the home list.
 */

import { employeeRepository, projectRepository } from '../repositories/index.js';
import { VIEW_EMPLOYEE_FORM, HTTP_NOT_FOUND } from '../inc/index.js';

function updateEmployee(req, res, next) {
    try {
        const { id } = req.params;                     // which employee
        const { name, avatar, projectId } = req.body;  // new values

        // Same name-required validation as create.
        if (!name || !name.trim()) {
            return res.status(400).render(VIEW_EMPLOYEE_FORM, {
                mode: "edit",
                formTitle: "Edit Employee",
                action: `/api/employee/${id}`,
                employee: { id, name, avatar, projectId },
                projects: projectRepository.getAll(),
                error: "Name is required."
            });
        }

        const updated = employeeRepository.update(id, { name, avatar, projectId });

        // update() returns undefined when no employee has that id.
        if (!updated) {
            const err = new Error(`Employee ${id} not found`);
            err.status = HTTP_NOT_FOUND;
            return next(err);
        }

        res.redirect("/");
    } catch (err) {
        next(err);
    }
}

export default updateEmployee;

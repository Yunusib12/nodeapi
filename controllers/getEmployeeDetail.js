/**
 * getEmployeeDetail — handles GET "/api/getemployeedetails/:id?"
 *
 * This is a pure JSON (API) endpoint. It returns a "profile": the
 * employee's core fields with their matching project(s) embedded.
 *   with    an id -> a 1-element array for that employee (404 if missing)
 *   without an id -> the profile for every employee
 */

import { employeeRepository, projectRepository } from '../repositories/index.js';
import { HTTP_NOT_FOUND } from '../inc/index.js';

// Build the response shape for one employee: their info + their project(s).
function toProfile(employee) {
    return {
        "id": employee.id,
        "createdAt": employee.createdAt,
        "name": employee.name,
        "project": projectRepository.getByEmployee(employee.projectId)
    };
}

function getEmployeeDetail(req, res, next) {

    try {
        const employeeId = req.params.id;

        if (employeeId) {
            const employee = employeeRepository.getById(employeeId);

            if (!employee) {
                const err = new Error(`Employee ${employeeId} not found`);
                err.status = HTTP_NOT_FOUND;
                return next(err);
            }

            // Wrapped in an array to keep the response shape consistent
            // with the "all employees" case below.
            return res.json([toProfile(employee)]);
        }

        // No id: map every employee to a profile object.
        res.json(employeeRepository.getAll().map(toProfile));
    } catch (err) {
        next(err);
    }
}

export default getEmployeeDetail;

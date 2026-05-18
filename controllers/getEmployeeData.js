/**
 * getEmployeeData — handles GET "/api/employee/:id?"
 * (the "?" means the id part of the URL is optional).
 *
 * Two behaviours depending on the URL:
 *   /api/employee        (no id) -> respond with the full list as JSON
 *   /api/employee/3      (an id) -> render the HTML detail page for that
 *                                   employee, including their project(s)
 * If an id is given but no such employee exists, send a 404 error.
 */

import * as employeeRepository from '../repositories/employeeRepository.js';
import * as projectRepository from '../repositories/projectRepository.js';
import { VIEW_EMPLOYEE_DETAIL, HTTP_NOT_FOUND } from '../inc/constant.js';

function getEmployeeData(req, res, next) {

    try {
        const employeeId = req.params.id; // value from the ":id" part of the URL

        // No id in the URL -> return everyone as JSON (an API response).
        if (!employeeId) {
            return res.json(employeeRepository.getAll());
        }

        const employee = employeeRepository.getById(employeeId);

        // Asked for a specific employee that doesn't exist -> 404.
        if (!employee) {
            const err = new Error(`Employee ${employeeId} not found`);
            err.status = HTTP_NOT_FOUND; // the error handler reads this
            return next(err);
        }

        // Render the detail page. The template expects:
        //   emplDetArr     - array with the single employee
        //   emplProArr     - that employee's project(s)
        //   isDetailNeeded - tells the template to show the projects panel
        res.render(VIEW_EMPLOYEE_DETAIL, {
            emplDetArr: [employee],
            emplProArr: projectRepository.getByEmployee(employee.projectId),
            isDetailNeeded: true
        });
    } catch (err) {
        next(err);
    }
}

export default getEmployeeData;

/**
 * controllers/index.js — collects every controller into one object.
 *
 * A "controller" is the function that runs when a route is hit: it reads
 * the request, asks a repository for data, and sends back a response.
 *
 * Each controller lives in its own small file (one job per file). This
 * file imports them all and bundles them into `dbController`, so the
 * route files can do `dbController.getEmployeeData` etc. from one import.
 */

import findAllEmployee from './findAllEmployee.js';             // GET /            -> home page list
import getEmployeeData from './getEmployeeData.js';             // GET /api/employee[/:id]
import getEmployeeDetail from './getEmployeeDetail.js';         // GET /api/getemployeedetails[/:id]
import getProjectDetail from './getProjectDetail.js';           // GET /api/project[/:id]
import showCreateEmployeeForm from './showCreateEmployeeForm.js'; // GET /api/employee/new
import createEmployee from './createEmployee.js';               // POST /api/employee
import showEditEmployeeForm from './showEditEmployeeForm.js';   // GET /api/employee/:id/edit
import updateEmployee from './updateEmployee.js';               // POST /api/employee/:id
import deleteEmployee from './deleteEmployee.js';               // POST /api/employee/:id/delete

const dbController = {
    findAllEmployee,
    getEmployeeData,
    getEmployeeDetail,
    getProjectDetail,
    showCreateEmployeeForm,
    createEmployee,
    showEditEmployeeForm,
    updateEmployee,
    deleteEmployee
};

export default dbController;

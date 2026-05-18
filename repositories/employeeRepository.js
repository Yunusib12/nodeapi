/**
 * repositories/employeeRepository.js — all employee data access.
 *
 * A "repository" hides HOW data is stored. Controllers call these
 * functions (getAll, create, ...) and never know the data is really a
 * JSON file. If you swapped in a real database later, only this file
 * would change.
 *
 * The employee list is loaded ONCE at startup and kept in memory in the
 * `employees` array. Every write changes that array AND saves it back to
 * disk via persist(), so memory and file stay in sync.
 */

import { loadJson, saveJson } from './jsonStore.js';
import { DB_EMPLOYEE_PATH } from '../inc/constant.js';

// Read the JSON file into memory a single time when this module is first imported.
const employees = loadJson(DB_EMPLOYEE_PATH);

// Write the current in-memory array back to the JSON file.
function persist() {
    saveJson(DB_EMPLOYEE_PATH, employees);
}

// Compute the next free id (highest existing id + 1; 1 if list is empty).
function nextId() {
    return employees.reduce((max, e) => Math.max(max, e.id), 0) + 1;
}

// Build a stable avatar image URL from a name. Same name => same picture.
function avatarFor(name) {
    return `https://api.dicebear.com/9.x/avataaars/png?seed=${encodeURIComponent(name)}`;
}

// Return every employee.
function getAll() {
    return employees;
}

// Find one employee by id. Number(id) so a string "3" from the URL still matches 3.
// Returns the employee object, or undefined if not found.
function getById(id) {
    return employees.find((employee) => employee.id === Number(id));
}

// Create a new employee from form data, save, and return the new record.
// - id and createdAt are generated automatically.
// - avatar is auto-generated from the name when left blank.
// - projectId becomes a number, or null if none chosen.
function create({ name, avatar, projectId }) {
    const employee = {
        id: nextId(),
        createdAt: new Date().toISOString(),
        name: name.trim(),
        avatar: (avatar && avatar.trim()) || avatarFor(name.trim()),
        projectId: Number(projectId) || null
    };
    employees.push(employee);
    persist();
    return employee;
}

// Update an existing employee's fields. Returns the updated employee,
// or undefined if no employee has that id.
function update(id, { name, avatar, projectId }) {
    const employee = getById(id);
    if (!employee) return undefined;

    employee.name = name.trim();
    employee.avatar = (avatar && avatar.trim()) || avatarFor(name.trim());
    employee.projectId = Number(projectId) || null;
    persist();
    return employee;
}

// Delete an employee by id. Returns true if one was removed, false if
// no employee had that id.
function remove(id) {
    const index = employees.findIndex((employee) => employee.id === Number(id));
    if (index === -1) return false;

    employees.splice(index, 1);
    persist();
    return true;
}

export { getAll, getById, create, update, remove };

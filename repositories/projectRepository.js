/**
 * repositories/projectRepository.js — all project data access.
 *
 * Same idea as employeeRepository.js but for projects, and read-only
 * (the UI never creates/edits projects). Projects are loaded once at
 * startup and cached in the `projects` array.
 */

import { loadJson } from './jsonStore.js';
import { DB_PROJECT_PATH } from '../inc/index.js';

// Read the projects JSON file into memory a single time at import.
const projects = loadJson(DB_PROJECT_PATH);

// Return every project.
function getAll() {
    return projects;
}

// Find one project by id (or undefined if none matches).
function getById(id) {
    return projects.find((project) => project.id === Number(id));
}

/**
 * getByEmployee(projectId)
 * An employee stores a single projectId. We return an ARRAY (0 or 1
 * items) instead of a single project so the templates can always do
 * `array.forEach(...)` without checking whether it's null first.
 */
function getByEmployee(projectId) {
    return projects.filter((project) => project.id === Number(projectId));
}

export { getAll, getById, getByEmployee };

/**
 * repositories/index.js — the single entry point for the data layer.
 *
 * Same idea as controllers/index.js and routes/index.js: instead of
 * importing each repository file directly, everywhere else imports from
 * this one folder. Adding a new repository later means adding one line
 * here, and no other file needs to change its import path.
 *
 * Usage:
 *   import { employeeRepository, projectRepository } from "../repositories/index.js";
 *   employeeRepository.getAll();
 *
 * `export * as X` re-exports every function of a module under the name X.
 */

export * as employeeRepository from './employeeRepository.js';
export * as projectRepository from './projectRepository.js';
export * as jsonStore from './jsonStore.js';

/**
 * getProjectDetail — handles GET "/api/project/:id?"
 *
 * A JSON (API) endpoint for projects:
 *   without an id -> array of all projects
 *   with    an id -> a 1-element array with that project (404 if missing)
 */

import { projectRepository } from '../repositories/index.js';
import { HTTP_NOT_FOUND } from '../inc/index.js';

function getProjectDetail(req, res, next) {

    try {
        const projectId = req.params.id;

        // No id -> return all projects.
        if (!projectId) {
            return res.json(projectRepository.getAll());
        }

        const project = projectRepository.getById(projectId);

        // Specific project requested but not found -> 404.
        if (!project) {
            const err = new Error(`Project ${projectId} not found`);
            err.status = HTTP_NOT_FOUND;
            return next(err);
        }

        res.json([project]); // array keeps the shape consistent with "all"
    } catch (err) {
        next(err);
    }
}

export default getProjectDetail;

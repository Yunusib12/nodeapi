/**
 * repositories/jsonStore.js — tiny helper for reading/writing JSON files.
 *
 * This project has no real database. Instead, data lives in JSON files in
 * the db/ folder. This module is the ONLY place that touches the file
 * system for that data, so the rest of the app never deals with files.
 */

import fs from 'fs';                   // Node's file-system module
import path from 'path';               // builds OS-correct file paths
import { fileURLToPath } from 'url';   // ES-module way to get this file's path

// Absolute path to the project's root folder.
// We resolve it relative to THIS file (../..) rather than process.cwd(),
// so the app works no matter which directory you start it from.
const PROJECT_ROOT = path.resolve(fileURLToPath(import.meta.url), "../..");

/**
 * loadJson(relativePath)
 * Reads a JSON file and returns the parsed JavaScript value.
 * If the file is missing or contains invalid JSON, it throws a clear
 * error — this intentionally crashes the app at startup ("fail fast")
 * so a broken data file is noticed immediately instead of much later.
 */
function loadJson(relativePath) {

    const absolutePath = path.join(PROJECT_ROOT, relativePath);

    try {
        return JSON.parse(fs.readFileSync(absolutePath, "utf-8"));
    } catch (err) {
        throw new Error(`Failed to load JSON data file "${absolutePath}": ${err.message}`);
    }
}

/**
 * saveJson(relativePath, data)
 * Writes a JavaScript value back to a JSON file, pretty-printed with
 * 2-space indentation and a trailing newline. Called after every
 * create/update/delete so the file on disk matches what's in memory.
 */
function saveJson(relativePath, data) {

    const absolutePath = path.join(PROJECT_ROOT, relativePath);

    try {
        fs.writeFileSync(absolutePath, JSON.stringify(data, null, 2) + "\n");
    } catch (err) {
        throw new Error(`Failed to write JSON data file "${absolutePath}": ${err.message}`);
    }
}

export { loadJson, saveJson };

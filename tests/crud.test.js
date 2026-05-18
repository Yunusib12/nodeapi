import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import request from "supertest";
import app from "../app.js";

const DB = path.join(fileURLToPath(import.meta.url), "../../db/employeeDb.json");
let backup;

before(() => { backup = fs.readFileSync(DB); });
after(() => { fs.writeFileSync(DB, backup); }); // never pollute the real data file

const UNIQUE = `Test Person ${Date.now()}`;

async function listEmployees() {
    const res = await request(app).get("/api/employee");
    return res.body;
}

test("GET /api/employee/new renders the create form", async () => {
    const res = await request(app).get("/api/employee/new");
    assert.equal(res.status, 200);
    assert.match(res.text, /Add Employee/);
    assert.match(res.text, /name="name"/);
});

test("CRUD lifecycle: create -> edit -> update -> delete", async () => {
    const startCount = (await listEmployees()).length;

    // CREATE
    const created = await request(app)
        .post("/api/employee")
        .type("form")
        .send({ name: UNIQUE, projectId: "1" });
    assert.equal(created.status, 302);
    assert.equal(created.headers.location, "/");

    let list = await listEmployees();
    assert.equal(list.length, startCount + 1);
    const mine = list.find((e) => e.name === UNIQUE);
    assert.ok(mine, "created employee is present");
    assert.match(mine.avatar, /api\.dicebear\.com/); // auto-generated avatar

    // EDIT form is prefilled
    const editForm = await request(app).get(`/api/employee/${mine.id}/edit`);
    assert.equal(editForm.status, 200);
    assert.match(editForm.text, new RegExp(UNIQUE));

    // UPDATE
    const updated = await request(app)
        .post(`/api/employee/${mine.id}`)
        .type("form")
        .send({ name: `${UNIQUE} Updated`, projectId: "2" });
    assert.equal(updated.status, 302);

    list = await listEmployees();
    assert.ok(list.find((e) => e.name === `${UNIQUE} Updated`));

    // DELETE
    const deleted = await request(app).post(`/api/employee/${mine.id}/delete`);
    assert.equal(deleted.status, 302);

    list = await listEmployees();
    assert.equal(list.length, startCount);
    assert.ok(!list.find((e) => e.id === mine.id));
});

test("POST /api/employee with no name returns 400 and re-renders the form", async () => {
    const res = await request(app)
        .post("/api/employee")
        .type("form")
        .send({ name: "" });
    assert.equal(res.status, 400);
    assert.match(res.text, /Name is required/);
});

test("POST delete on a missing employee returns 404", async () => {
    const res = await request(app)
        .post("/api/employee/999999/delete")
        .set("Accept", "application/json");
    assert.equal(res.status, 404);
});

import { test } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../app.js";

test("GET / renders the employee list page", async () => {
    const res = await request(app).get("/");
    assert.equal(res.status, 200);
    assert.match(res.text, /Employee Directory/);
});

test("GET /api/employee/1 renders detail with avatar and project", async () => {
    const res = await request(app).get("/api/employee/1");
    assert.equal(res.status, 200);
    assert.match(res.text, /api\.dicebear\.com/);   // bug #5: working avatar
    assert.match(res.text, /MongoDB/);              // bug #3: project shown
});

test("GET /api/employee/9999 returns a 404 error page", async () => {
    const res = await request(app)
        .get("/api/employee/9999")
        .set("Accept", "text/html");
    assert.equal(res.status, 404);
    assert.match(res.text, /404 - Not Found/);
});

test("GET /api/employee (no id) returns JSON list", async () => {
    const res = await request(app).get("/api/employee");
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body));
    // The app supports CRUD, so don't assert an exact seed count - just
    // that the endpoint returns a non-empty list with the expected shape.
    assert.ok(res.body.length > 0);
    assert.ok("id" in res.body[0] && "name" in res.body[0]);
});

test("GET /api/getemployeedetails/1 returns profile with project", async () => {
    const res = await request(app).get("/api/getemployeedetails/1");
    assert.equal(res.status, 200);
    assert.equal(res.body[0].name, "Ms. Gaylord Streich");
    assert.equal(res.body[0].project[0].name, "MongoDB");
});

test("GET /api/project/1 returns the project as JSON", async () => {
    const res = await request(app).get("/api/project/1");
    assert.equal(res.status, 200);
    assert.equal(res.body[0].id, 1);
});

test("GET /api/project/9999 returns 404 JSON", async () => {
    const res = await request(app)
        .get("/api/project/9999")
        .set("Accept", "application/json");
    assert.equal(res.status, 404);
    assert.match(res.body.message, /not found/);
});

test("unknown route returns 404 (not 500) as JSON", async () => {
    const res = await request(app)
        .get("/api/nope")
        .set("Accept", "application/json");
    assert.equal(res.status, 404);
    assert.equal(res.body.error, "Not Found");
});

test("security headers are set by helmet", async () => {
    const res = await request(app).get("/");
    assert.ok(res.headers["content-security-policy"]);
    assert.equal(res.headers["x-content-type-options"], "nosniff");
});

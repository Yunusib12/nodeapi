# nodeapi

A small Express employee/project API with server-rendered EJS pages and a JSON
API. Data is read from JSON files in `db/` (cached in memory at startup).

## Requirements

- Node.js 18+ (uses the built-in `node --test` runner and ESM)

## Setup

```bash
npm install
cp .env.example .env   # adjust PORT if needed (default in .env: 4005)
```

## Scripts

| Command       | Description                                  |
| ------------- | -------------------------------------------- |
| `npm start`   | Run the server (`node server.js`)            |
| `npm run dev` | Run with nodemon (auto-restart on changes)   |
| `npm test`    | Run the test suite (`node --test` + supertest) |

Server starts on `http://localhost:<PORT>` (PORT from `.env`, falls back to 4000).

## Endpoints

| Method | Path                            | Description                                            |
| ------ | ------------------------------- | ------------------------------------------------------ |
| GET    | `/`                             | HTML: employee list (home page)                        |
| GET    | `/api/employee/:id?`            | With `:id` → HTML detail (employee + project); without → JSON list |
| GET    | `/api/getemployeedetails/:id?`  | JSON: employee profile(s) with embedded project        |
| GET    | `/api/project/:id?`             | JSON: a project by id, or all projects                 |

Unknown routes return a 404 (HTML error page or JSON, via content negotiation).
A request for a missing id returns `404` with a descriptive message.

## Project structure

```
app.js          Express app (middleware, routes, error handlers) - exported for tests
server.js       Boots the app and listens on PORT
inc/            Global constants (constant.js)
routes/         Route modules, aggregated by routes/index.js
controllers/    Request handlers, aggregated by controllers/index.js
repositories/   Data-access layer (loads/caches the JSON "DB")
middleware/     404 + centralized error handler
src/views/      EJS templates
db/             JSON data files
playground/     Standalone scratch scripts - NOT used by the app
```

## Notes

- Security headers via `helmet`; request logging via `morgan` (silenced when
  `NODE_ENV=test`).
- The JSON data files are loaded once at startup; editing them requires a restart.
- A missing/corrupt `db/*.json` file fails the process loudly at boot (fail-fast).

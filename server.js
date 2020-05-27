const express = require('express');
const rq = require('request');
const path = require("path");
const routes = require("./routes");
const port = process.env.PORT | 4500;
const app = express();

//Set Static folder
app.use(express.static(path.join(__dirname, "/public")));
//app.use(express.static(__dirname + '/public'));
//Set View Engine  - EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./src/views"));

app.use(routes);


app.listen(port, () => console.log(`The server is listening on port ${port}`));


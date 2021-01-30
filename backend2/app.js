const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require('cors')
const usersRouter = require("./routes/users");
const setupRouter = require("./routes/setup");
require("./db/mongoose");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.options('*', cors())

app.use("/users", usersRouter);
app.use("/setup", setupRouter);

module.exports = app;

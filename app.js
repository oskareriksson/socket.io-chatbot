const express = require("express");
const colors = require("colors");
const pug = require("pug");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./routes/routes.js");
const config = require("./config/config.js");
let app = express();
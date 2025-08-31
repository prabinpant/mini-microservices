const express = require("express");
const bodyParser = require("bod-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

const express = require("express");
const visitRequest = require("../controller/visitRequest.controller");

const visitRoute = express.Router()

visitRoute.post("/visitRequest", visitRequest)


module.exports = visitRoute
const express = require("express");
const visitRequest = require("../controller/visitRequest.controller");
const getVisitorqrCode = require("../controller/qu.controller");

const visitRoute = express.Router()

visitRoute.post("/visitRequest", visitRequest)
visitRoute.get("/getVisitorqrCode", getVisitorqrCode)

module.exports = visitRoute
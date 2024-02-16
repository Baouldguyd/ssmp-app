const express = require("express");
const visitRequest = require("../controller/visitRequest.controller");
const getVisitorqrCode = require("../controller/qu.controller");
const getAllVisitors = require("../controller/getAllVisitors");

const visitRoute = express.Router()

visitRoute.post("/visitRequest", visitRequest)
visitRoute.get("/getVisitorqrCode", getVisitorqrCode)
visitRoute.get("/getAllVisitors", getAllVisitors)

module.exports = visitRoute
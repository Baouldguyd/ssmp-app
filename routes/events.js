const express = require("express")
const auth = require("../middleware/auth")
const eventCreation = require("../controller/createEvents.controller")
const updateEvent = require("../controller/updateEvents.controller")
const deleteEvent = require("../controller/deleteEvents.controller")
const getAllEvents = require("../controller/getAllEvents.controller")


const eventsRoute = express.Router()

eventsRoute.post("/eventCreation", auth, eventCreation);
eventsRoute.put("/updateEvent/:_id", auth, updateEvent);
eventsRoute.delete("/deleteEvent/:_id", auth, deleteEvent);
eventsRoute.get("/getAllEvents", auth, getAllEvents)


module.exports = eventsRoute
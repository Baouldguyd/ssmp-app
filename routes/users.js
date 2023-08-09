const express = require("express")
const enrollParticipants = require("../controller/users.controller")
const bodyParser = require("body-parser")

const usersRouter = express.Router()


usersRouter.post("/enrollParticipants", bodyParser, enrollParticipants)


module.exports = usersRouter
const express = require("express")
const enrollParticipants = require("../controller/users.controller")

const usersRouter = express.Router()


usersRouter.post("/enrollParticipants", enrollParticipants)


module.exports = usersRouter
const express = require("express")
const enrollParticipants = require("../controller/users.controller")
const login = require("../controller/login.controller")

const usersRouter = express.Router()


usersRouter.post("/enrollParticipants", enrollParticipants)
usersRouter.post("/login", login)


module.exports = usersRouter
const express = require("express")
const enrollParticipants = require("../controller/users.controller")
const login = require("../controller/login.controller")
const password = require("../controller/password.controller")
const getLocalGovLagosEast = require("../controller/lga.controller")
const participantsApproval = require("../controller/participantsApproval.controller")
const auth = require("../middleware/auth")
const { getUserProfileInfo } = require("../controller/getUserProfileInfo.controller")
const uploadProfileImage = require("../controller/uploadProfileImage.controller")
const forgotPassword = require("../controller/forgotPassword.controller")




const usersRouter = express.Router()


usersRouter.post("/enrollParticipants", enrollParticipants)
usersRouter.post("/changePassword", password)
usersRouter.post("/login", login)
usersRouter.post("/forgotPassword", forgotPassword)
usersRouter.get("/lga", getLocalGovLagosEast)
usersRouter.put("/approvePendingParticipants/:_id", auth, participantsApproval)
usersRouter.get("/getUserProfileInfo", auth, getUserProfileInfo)
usersRouter.put("/uploadProfileImage/:_id", auth, uploadProfileImage )















module.exports = usersRouter
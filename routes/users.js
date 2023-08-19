const express = require("express")
const enrollParticipants = require("../controller/users.controller")
const login = require("../controller/login.controller")
const password = require("../controller/password.controller")
const getLocalGovLagosEast = require("../controller/lga.controller")
const participantsApproval = require("../controller/participantsApproval.controller")
const auth = require("../middleware/auth")
const { getUserProfileInfo } = require("../controller/getUserProfileInfo.controller")
const updateProfileImage = require("../controller/updateProfileImage.controller")




const usersRouter = express.Router()


usersRouter.post("/enrollParticipants", enrollParticipants)
usersRouter.post("/changePassword", password)
usersRouter.post("/login", login)
usersRouter.get("/lga", getLocalGovLagosEast)
usersRouter.put("/approvePendingParticipants/:_id", auth, participantsApproval)
usersRouter.get("/getUserProfileInfo", auth, getUserProfileInfo)
usersRouter.put("/updateProfileImage/:_id", auth, updateProfileImage )


module.exports = usersRouter
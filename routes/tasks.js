const express = require("express");
const auth = require("../middleware/auth");
const createTask = require("../controller/createTask.controller");
const getAllTask = require("../controller/getAllTask.controller");
const deleteTask = require("../controller/deleteTask.controller");
const updateTask = require("../controller/updateTask.controller");


const tasksRoute = express.Router()


tasksRoute.post("/createTask", auth, createTask)
tasksRoute.get("/getAllTask", auth, getAllTask)
tasksRoute.put("/updateTask/:_id", auth, updateTask )
tasksRoute.delete("/deleteTask/:_id", auth, deleteTask)

module.exports.tasksRoute = tasksRoute
const express = require("express");
const createCourse = require("../controller/createCourse.controller");
const auth = require("../middleware/auth");
const { getAllCourses } = require("../controller/getAllCourses.controller");
const updateCourse = require("../controller/updateCourses.controller");
const deleteCourse = require("../controller/deleteCourse.controller");

const coursesRoute = express.Router()


coursesRoute.post("/createCourse", auth, createCourse)
coursesRoute.get("/getAllCourses", auth, getAllCourses)
coursesRoute.put("/updateCourse/:_id", auth, updateCourse)
coursesRoute.delete("/deleteCourse/:_id", auth, deleteCourse)

module.exports.coursesRoute = coursesRoute
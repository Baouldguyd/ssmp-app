const Joi = require("joi");
const { RoleType } = require("../utils/constant");
const Course = require("../models/courses");

const deleteCourse = async (req, res) => {

  if (req.user.role !== RoleType.ADMIN) {
    return res.status(401).send({
      responseCode: "80",
      responseMessage: "Unauthorized",
      data: null,
    });
  }

  try {
    const course = await Course.findByIdAndDelete({ _id: req.params._id });
    if (!course) {
      return res.status(400).send({
        responseCode: "96",
        responseMessage: "No course found",
        data: null,
      });
    }
 
    // await course.save()

    res.status(200).send({
        responseCode: "00",
        responseMessage: "Course deleted successfully",
        data: null
    })
  } catch (error) {
    res.status(500).send({
      responseCode: "95",
      responseMessage: "internal server error",
      data: null,
    });
    console.log(error);
  }
}
module.exports = deleteCourse

const Joi = require("joi");
const { RoleType } = require("../utils/constant");
const Course = require("../models/courses");

const updateCourse = async (req, res) => {
  const schema = Joi.object({
    courseImage: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    learningObjectives: Joi.string().required(),
    duration: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);
  if (error)
    return res.status(400).send({
      responseCode: "96",
      responseMessage: error.details[0].message?.replaceAll("\"", ""),
      data: null,
    });

  if (req.user.role !== RoleType.ADMIN) {
    return res.status(401).send({
      responseCode: "80",
      responseMessage: "Unauthorized",
      data: null,
    });
  }

  try {
    const { courseImage, title, description, learningObjectives, duration } =
      req.body;
    let course = await Course.findByIdAndUpdate({ _id: req.params._id });
    if (!course) {
      return res.status(400).send({
        responseCode: "96",
        responseMessage: "No course found",
        data: null,
      });
    }
    course = Course({
      _id: course._id,
      courseImage,
      title,
      description,
      learningObjectives,
      duration,
      dateUpdated: new Date().toJSON(),
      updatedBy: req.user.email,
    });
    await course.save();
    res.status(200).send({
        responseCode: "00",
        responseMessage: "Course updated successfully",
        data: course
    })
  } catch (error) {
    res.status(500).send({
      responseCode: "95",
      responseMessage: "internal server error",
      data: null,
    });
    console.log(error);
  }
};

module.exports = updateCourse;

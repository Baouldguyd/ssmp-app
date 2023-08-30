const Joi = require("joi");
const { RoleType, TaskStatus } = require("../utils/constant");
const Tasks = require("../models/tasks");

const updateTask = async (req, res) => {
  const schema = Joi.object({
    course: Joi.string().required(),
    taskTitle: Joi.string().required(),
    taskPoints: Joi.string().required(),
    taskDescription: Joi.string().required(),
    deadline: Joi.string().required()
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
    const { course,taskTitle,taskPoints,deadline,taskDescription } =
      req.body;
    let task = await Tasks.findByIdAndUpdate({ _id: req.params._id});
    if (!task) {
      return res.status(400).send({
        responseCode: "96",
        responseMessage: "No task found",
        data: null,
      });
    }
    task = Tasks({
      // _id: task._id,
      course,
      taskTitle,
      taskPoints,
      taskDescription,
      deadline,
      taskStatus: TaskStatus.NOTSUBMITTED,
      createdBy: req.user.email,
      dateCreated: new Date().toJSON(),
    });
    await task.save();
    res.status(200).send({
        responseCode: "00",
        responseMessage: "Task updated successfully",
        data: task
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

module.exports = updateTask;

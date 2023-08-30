
const { RoleType } = require("../utils/constant");
const Tasks = require("../models/tasks");

const deleteTask = async (req, res) => {

  if (req.user.role !== RoleType.ADMIN) {
    return res.status(401).send({
      responseCode: "80",
      responseMessage: "Unauthorized",
      data: null,
    });
  }

  try {
    const task = await Tasks.findByIdAndDelete({ _id: req.params._id });
    if (!task) {
      return res.status(400).send({
        responseCode: "96",
        responseMessage: "No task found",
        data: null,
      });
    }
 

    res.status(200).send({
        responseCode: "00",
        responseMessage: "Task deleted successfully",
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
module.exports = deleteTask

const Joi = require("joi")
const Tasks = require("../models/tasks")
const { TaskStatus, RoleType } = require("../utils/constant")

const createTask = async (req,res) =>{
    const schema =Joi.object({
       course: Joi.string().required(),
       taskTitle: Joi.string().required(),
       taskPoints: Joi.string().required(),
       taskDescription: Joi.string().required(),
       deadline: Joi.string().required()
    })

    const { error } = schema.validate(req.body)
    if(error) return res.status(400).send({
        responseCode: "96",
        responseMessage: error.details[0].message.replaceAll("\"", ""),
        data: null
    });
    if (req.user.role !== RoleType.ADMIN) {
        return res.status(401).send({
          responseCode: "80",
          responseMessage: "Unauthorized",
          data: null,
        });
    }
    const { course,taskTitle,taskPoints, deadline,taskDescription } = req.body
    try {
        let task = await Tasks.findOne({taskTitle})
        if (task) return res.status(400).send({
            responseCode: "96",
            responseMessage: "task already exists",
            data: null
        })

        task = new Tasks ({
            course,
            taskTitle,
            taskPoints,
            taskDescription,
            deadline,
            taskStatus: TaskStatus.NOTSUBMITTED,
            createdBy: req.user.email,
            dateCreated: new Date().toJSON(),
        })

        await task.save()
        res.status(200).send({
            responseCode: "00",
            responseMessage: "task created successful",
            data: task
        })
    } catch (error) {
        res.status(500).send({
            responseCode: "95",
            responseMessage:"internal server error"?.replaceAll("\"", ""),
            data: null
        })
        console.log(error)
    }
}

module.exports = createTask
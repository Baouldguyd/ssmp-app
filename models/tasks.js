const mongoose = require("mongoose")

const tasksSchema = new mongoose.Schema({
    course:{
        type: String
    },
    taskTitle: {
        type: String,
        required : "Task title is required."
    },
    taskPoints: {
        type: String
    },
    taskDescription: {
        type: String,
        required: "Task description is required."
    },
    createdBy: {
        type: String
    },
    dateCreated:{
        type: String,
        default: new Date().toJSON()
    },
    taskStatus: {
        type: String
    },
    deadline:{
        type: String
    }

})
const Tasks = mongoose.model ("task", tasksSchema)

module.exports =Tasks
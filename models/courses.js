const mongooes = require ("mongoose");



const courseSchema = new mongooes.Schema({
    courseImage: {
        type: String
    },
    title: {
        type: String,
        required: "Course Title is needed."
    },
    description:{
        type: String
    },
    learnigObjectives: {
        type: String,
    },
    duration: {
        type: String,
    },
    dateCreated: {
        type: String,
    },
    dateUpdated: {
        type: String,
    },
    updatedBy: {
        type: String,
    }

})

const Course = mongooes.model("Course", courseSchema) 


module.exports = Course
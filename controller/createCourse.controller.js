/*
step 1 - validate client request body using joi library
*/ 
const Course = require("../models/courses")


const createCourse = async (req, res) => {
    const Schema = Joi.object({
        courseImage: Joi.string().required(),
        title: Joi.string().required(),
        decription: Joi.string().required(),
        learningObjectives: Joi.string().required(),
        duration: Joi.string().required(),
        dateCreated: Joi.string().required(),
        dateUpdated: Joi.string().required(),
        updatedBy: Joi.string().required(),
    });

    const {error} = Schema.validate(req.body)
    if(error) return res.status(400).send ({
        responseCode: "96",
        responseMessage: error.details[0].message,
        data: null
    })
    
    const{
        courseImage,
        title,
        decription,
        learningObjectives,
        duration,
        dateCreated,
        dateUpdated,
        updatedBy

    }=req.body
    
    let course = new Course({
        courseImage,
        title,
        decription,
        learningObjectives,
        duration,
        dateCreated,
        dateUpdated,
        updatedBy
    })







}
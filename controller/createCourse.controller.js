/*
step 1 - validate client request body using joi library
*/ 
const Course = require("../models/courses")
const joi = require("joi");

const createCourse = async (req, res) => {
    const schema = joi.object({
        courseImage: joi.string().required(),
        title: joi.string().required(),
        decription: joi.string().required(),
        learningObjectives: joi.string().required(),
        duration: joi.number().required(),
        dateCreated: joi.string().required(),
        dateUpdated: joi.string().required(),
        updatedBy: joi.string().required(),
    });

    const {error} = schema.validate(req.body);


    if (error) 
      return res.status(400).send ({
        responseCode: "96",
        responseMessage: error.details[0].message,
        data: null
    })
    
    const {
        courseImage,
        title,
        decription,
        learningObjectives,
        duration,
        dateCreated,
        dateUpdated,
        updatedBy

    } = req.body

    try {
       if (course) 
       return res.status(400).send({
        responseCode: "96",
        responseMessage: "course creation failed"
       })
    
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

        await course.save()
        res.status(200).send({
            responseCode: "00",
            responseMessage: "course creation successful",
            data: course
        })
        } catch (error) {
            res.status(500).send({
                responseCode: "96",
                responseMessage: "internal server error",
                data: null
            })
            console.log(error);
        }


};

module.exports = createCourse
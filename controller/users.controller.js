/*
step 1 - validate client request body using joi library

*/
const Joi = require("joi")
const Users = require("../models/users")
const enrollParticipants = async (req, res)=>{
    const Schema = Joi.object({
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.string().required()
    })
    const { error } = Schema.validate(req.body)
    if(error) return res.status(400).send({
        responseCode: "96",
        responseMessage: error.details[0].message,
        data: null
    })


    const { firstName, lastName, email, phoneNumber } = req.body
    try {
        let user = await Users.findOne({email});

        if (user) return res.status(400).send({
            responseCode: "86",
            responseMessage: "email already exists",
            data: null
        })
        
        user = new Users({
            firstName,
            lastName,
            email,
            phoneNumber,
            isVerified: false,
            isDeactivated: false,
            isReactivated: false,
            dateCreated: new Date().toJSON(),
            dateUpdated: null,
            startDate: null,
            endDate: null
        })
    
        await user.save()
        res.status(201).send({
            responseCode: "00",
            responseMessage: "enrollment successful",
            data: user
        })
    } catch (error) {
        res.status(500).send({
            responseCode: "95",
            responseMessage:"internal server error",
            data: null
        })
        console.log(error)
    }
}

module.exports = enrollParticipants
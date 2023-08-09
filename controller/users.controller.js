/*
step 1 - validate client request body using joi library

*/
const Joi = require("joi")
const Users = require("../models/users")
const enrollParticipants = async (req, res)=>{
    const Schema = Joi.object({
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        email: Joi.email().required(),
        phoneNumber: Joi.string().required(),
        lga: Joi.string().min(3).required(),
        homeAddress: Joi.string().min(3).required()
    })

    const { error } = Schema.validate(req.body)
    if(error) return res.status(400).send({
        responseCode: "96",
        responseMessage: error.details[0].message,
        data: null
    })


    const { firstName, lastName, email, phoneNumber, lga, homeAddress } = req.body
    try {
        const user = await Users.findOne({email})
    } catch (error) {
        res.status(500).send({
            responseCode: "95",
            responseMessage:"internal server error",
            data: null
        })
    }
}

module.exports = enrollParticipants
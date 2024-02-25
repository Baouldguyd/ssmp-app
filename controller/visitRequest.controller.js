const Joi = require("joi")
const Visitors = require("../models/visit")

const visitRequest = async (req, res)=>{
    const Schema = Joi.object({
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.string().required(),
        sex: Joi.string().required(),
        address: Joi.string().required(),
        reasonForVisit: Joi.string().required()
    });

    const { error } = Schema.validate(req.body)
    if(error) return res.status(400).send({
        responseCode: "96",
        responseMessage: error.details[0].message.replaceAll("\"", ""),
        data: null
    })

    const { 
        firstName, 
        lastName, 
        email, 
        phoneNumber,
        sex,
        address,
        reasonForVisit
     } = req.body
    try {
        let visitor = await Visitors.findOne({email});
        if (visitor) return res.status(400).send({
            responseCode: "96",
            responseMessage: "email already exists",
            data: null
        })
         
        visitor = new Visitors({
            firstName,
            lastName,
            email,
            phoneNumber,
            sex,
            address,
            reasonForVisit,
            isAccepted: false,
            isRejected: false,
        })

        await visitor.save()
        const response = {
            'message': "Vistor's information received successfully",
            'user': {visitor} // Echo back the received user data
        };
        res.status(200).json(response);
    } catch (error) {
        res.status(500).send({
            responseCode: "95",
            responseMessage:"internal server error"?.replaceAll("\"", ""),
            data: null
        })
        console.log(error)
    }
}; 

module.exports = visitRequest
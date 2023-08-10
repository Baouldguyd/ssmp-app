const joi = require("joi");
const Users = require("../models/users");

const login = async(req, res) => {
    const schema = joi.object({
        email: joi.string().email().required().min(3),
        password: joi.string().min(8).required()
    })

    const { error } = schema.validate(req.body);

    if(error) return res.status(400).send({
        responseCode: "96",
        responseMessage: error.details[0].message,
        data: null
    });
try {
    let user = await Users.findOne({email: req.body.email})
    if(!user)return res.status(400).send({
        responseCode: "96",
        responseMessage: "Invalid email or password",
        data: null
    });
    
} catch (error) {
    res.status(500).send({
        responseCode: "95",
        responseMessage:"internal server error",
        data: null
    })
    console.log(error)
}

}

module.exports = login
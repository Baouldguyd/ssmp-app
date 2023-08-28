const Users = require("../models/users");

const resetPassword = async (req, res) =>{
    const schema = Joi.object({
        password: Joi.string().min(8).required(),
        otp: Joi.number().min(4).required(),
        email: Joi.string().email().required(),
    })

    const { error } = schema.validate(req.body);

    if (error)
      return res.status(400).send({
        responseCode: "96",
        responseMessage: error.details[0].message?.replaceAll("\"", ""),
        data: null,
      });
    const { email, otp, password } = req.body;

    try {
        const user = await Users.findOne({ email, otp });
    
        if (!user)
          return res.status(400).send({
            responseCode: "96",
            responseMessage: "User not found",
            data: null,
          });
        user.otp = null
        const salt = await bcrypt.genSalt(10); 
        user.password = await bcrypt.hash(password, salt);
    
        await user.save();

        res.status(200).send({
            responseCode: "00",
            responseMessage: "Password changed succesfully",
            data: null
        })
      } catch (error) {
        res.status(500).send({
          responseCode: "96",
          responseMessage: "internal server error",
          data: null,
        });
        console.log(error);
      }
}

module.exports = resetPassword
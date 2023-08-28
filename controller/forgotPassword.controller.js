const Users = require("../models/users");
const sendResetPasswordMail = require("../utils/sendResetPasswordMail");


const forgotPassword = async (req, res) => {
    try{
        let user = await Users.findOne({email: req.body.email })
         if (!user) {
            return res.status(400).send({
                responseCode: "96",
                responseMessage: "No user found",
                data: null
            });
         }

         const createOtp = Math.floor(Math.random() * 9000) + 1000;
         user.otp = createOtp

         await user.save()

        if (user.email === user.email) {
            res.status(200).send({
                responseCode: "00",
                responseMessage: `Dear <b>${user.firstName?.toUpperCase()}</b>! 
               A mail has been sent to ${user.email}. Check to reset your password `
             });
            
            sendResetPasswordMail(user)
        }
        } catch (error) {
            res.status(500).send({
              responseCode: "95",
              responseMessage: "internal server error",
              data: null,
            });
            console.log(error);
          }
    }
    module.exports = forgotPassword

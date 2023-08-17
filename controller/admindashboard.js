const Users = require("../models/users");
const Joi = require("joi");
const { RoleType } = require("../utils/constant");


const getAllParticipants = async (req, res) => {
      if (req.user.role !== RoleType.ADMIN){
    return res.status(401).send({
      responseCode: "80",
      responseMessage: "Unauthorized",
      data: null,
    });
    
  }
   try {
    const user = await Users.find({});
    if (!user) {
      return res.status(400).send({
        responseCode: "96",
        responseMessage: "User not found",
        data: null,
      });
    
    }
    res.status(200).send({
        responseCode: "00",
        responseMessage: "Total Participants fetched successfully",
        data: {
            totalParticipant: Array.isArray(user) && user.filter((item) => {
                return item.role !== RoleType.ADMIN
            }).length,
              totalApprovedUser: Array.isArray(user) && user.filter((item) => {
            return item.role !== "ADMIN" && item.isApproved
          }).length,
            totalDisapprovedUser: Array.isArray(user) && user.filter((item) => {
            return item.role !== "ADMIN" && !item.isApproved
          }).length
         }
    })
  } catch (error) {
    res.status(500).send({
      responseCode: "95",
      responseMessage: "internal server error",
      data: null,
    });
    console.log(error);
  }
}


 module.exports = getAllParticipants;
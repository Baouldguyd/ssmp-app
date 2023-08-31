const Users = require("../models/users");
const { RoleType } = require("../utils/constant");

const getAllUsers = async(req, res) => {
    try {
        const user = await Users.find();
        if (!user) {
            return res.status(400).send({
                responseCode: "96",
                responseMessage: "No user could be fetched",
                data: null
            })
        }
        
        res.status(200).send({
            responseCode: "00",
            responseMessage: " Total User fetched successfully",
            data: {
                totalParticipants:
                  Array.isArray(user) &&
                  user.filter((item) => {
                    return item.role !== RoleType.ADMIN;
                  })}
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

module.exports = getAllUsers
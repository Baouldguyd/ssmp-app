const Users = require("../models/users");
const { RoleType, ApprovalStatus } = require("../utils/constant");

const getAllDisapprovedParticipants = async(req, res) => {
    if (req.user.role !== RoleType.ADMIN) {
        return res.status(401).send({
          responseCode: "80",
          responseMessage: "Unauthorized",
          data: null,
        });
      }
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
            responseMessage: " Total Disapproved Participants fetched successfully",
            data: {
                totalParticipants:
                  Array.isArray(user) &&
                  user.filter((item) => {
                    return item.role !== RoleType.ADMIN  &&
                    item.approvalStatus == ApprovalStatus.DISAPPROVED
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

module.exports = getAllDisapprovedParticipants
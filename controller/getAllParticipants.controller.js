const Users = require("../models/users");
const { RoleType, ApprovalStatus } = require("../utils/constant");

const getAllParticipants = async (req, res) => {
  if (req.user.role !== RoleType.ADMIN) {
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
        totalParticipants:
          Array.isArray(user) &&
          user.filter((item) => {
            return item.role !== RoleType.ADMIN;
          }).length,
          totalPendingUser:
          Array.isArray(user) &&
          user.filter((item) => {
            return (
              item.role !== "ADMIN" &&
              item.approvalStatus == ApprovalStatus.PENDING
            );
          }).length,
        totalApprovedUser:
          Array.isArray(user) &&
          user.filter((item) => {
            return (
              item.role !== "ADMIN" &&
              item.approvalStatus == ApprovalStatus.APPROVED
            );
          }).length,
        totalDisapprovedUser:
          Array.isArray(user) &&
          user.filter((item) => {
            return (
              item.role !== "ADMIN" &&
              item.approvalStatus == ApprovalStatus.DISAPPROVED
            );
          }).length,
      },
    });
  } catch (error) {
    res.status(500).send({
      responseCode: "95",
      responseMessage: "internal server error",
      data: null,
    });
    console.log(error);
  }
};

module.exports = getAllParticipants;
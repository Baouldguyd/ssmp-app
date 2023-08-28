const { RoleType, ApprovalStatus } = require("../utils/constant");
const Users = require("../models/users");
const Joi = require("joi");
const sendApprovalMailToParticipant = require("../utils/sendApprovalMailToParticipants");
const sendDisapprovalMailToParticipant = require("../utils/sendDisapprovedMailToParticipants");

const participantsApproval = async (req, res) => {
  if (req.user.role !== RoleType.ADMIN) {
    return res.status(401).send({
      responseCode: "80",
      responseMessage: "Unauthorized",
      data: null,
    });
  }

  const schema = Joi.object({
    approvalStatus: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error)
    return res.status(400).send({
      responseCode: "96",
      responseMessage: error.details[0].message?.replaceAll('"', ""),
      data: null,
    });

  try {
    const user = await Users.findByIdAndUpdate({ _id: req.params._id });
    if (!user) {
      return res.status(400).send({
        responseCode: "96",
        responseMessage: "Participant not found",
        data: null,
      });
    }

    user.approvalStatus = req.body.approvalStatus;
    user.approvedDate = new Date().toJSON();
    user.approvedBy = req.user.email;
    user.startDate = req.user.startDate;
    user.endDate = req.user.endDate;
    user.otp = Math.floor(Math.random() * 9000) + 1000;

    await user.save();

    if (user.approvalStatus === ApprovalStatus.APPROVED) {
      res.status(200).send({
        responseCode: "00",
        responseMessage: user.firstName + " approved successfully",
      });
      sendApprovalMailToParticipant(user);
    }
    if(user.approvalStatus === ApprovalStatus.DISAPPROVED) {
      res.status(200).send({
        responseCode: "00",
        responseMessage: user.firstName + " disapproved successfully"
      });
      sendDisapprovalMailToParticipant(user);
    }
  } catch (error) {
    res.status(500).send({
      responseCode: "95",
      responseMessage: "internal server error",
      data: null,
    });
    console.log(error);
  }
};

module.exports = participantsApproval;

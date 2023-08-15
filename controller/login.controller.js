const joi = require("joi");
const Users = require("../models/users");
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/createToken");
const { RoleType } = require("../utils/constant");

const login = async (req, res) => {
  const schema = joi.object({
    email: joi.string().email().required().min(3),
    password: joi.string().min(8).required(),
  });

  const { error } = schema.validate(req.body);

  if (error)
    return res.status(400).send({
      responseCode: "96",
      responseMessage: error.details[0].message,
      data: null,
    });
  try {
    let user = await Users.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).send({
        responseCode: "96",
        responseMessage: "Invalid email or password",
        data: null,
      });

    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validatePassword)
      return res.status(400).send({
        responseCode: "96",
        responseMessage: "Invalid email or password",
        data: null,
      });
    if (!user.isApproved && user.role !== RoleType.ADMIN) return res.status(200).send({
        responseCode: "96",
        responseMessage: "Kindly verify your account to proceed",
        data: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          sex: user.sex,
          dob: user.dob,
          lga: user.lga,
          homeAddress: user.homeAddress,
          programme: user.programme,
          occupation: user.occupation,
          education: user.education,
          classOfDegree: user.classOfDegree,
          instituitionAttended: user.instituitionAttended,
          yearOfGraduation: user.yearOfGraduation,
          computerSkill: user.computerSkill,
          softwareUsed: user.softwareUsed,
          softwareTraining: user.softwareTraining,
          applicationYouWillBuild: user.applicationYouWillBuild,
          techStack: user.techStack,
          preferredJob: user.preferredJob,
          workSector: user.workSector,
          reasonForScholarship: user.reasonForScholarship,
          commitment: user.commitment,
          isApproved: user.isApproved,
          approvedBy: user.approvedBy,
          approvedDate: user.approvedDate,
          isDeactivated: user.isDeactivated,
          isReactivated: user.isReactivated,
          dateCreated: user.dateCreated,
          dateUpdated: user.dateUpdated,
          startDate: user.startDate,
          endDate: user.endDate,
        },
      });

    const token = createToken(user);

    res.status(200).send({
      responseCode: "00",
      responseMessage: "Login successful",
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        sex: user.sex,
        dob: user.dob,
        lga: user.lga,
        homeAddress: user.homeAddress,
        programme: user.programme,
        occupation: user.occupation,
        education: user.education,
        classOfDegree: user.classOfDegree,
        instituitionAttended: user.instituitionAttended,
        yearOfGraduation: user.yearOfGraduation,
        computerSkill: user.computerSkill,
        softwareUsed: user.softwareUsed,
        softwareTraining: user.softwareTraining,
        applicationYouWillBuild: user.applicationYouWillBuild,
        techStack: user.techStack,
        preferredJob: user.preferredJob,
        workSector: user.workSector,
        reasonForScholarship: user.reasonForScholarship,
        commitment: user.commitment,
        isApproved: user.isApproved,
        approvedBy: user.approvedBy,
        approvedDate: user.approvedDate,
        isDeactivated: user.isDeactivated,
        isReactivated: user.isReactivated,
        dateCreated: user.dateCreated,
        dateUpdated: user.dateUpdated,
        startDate: user.startDate,
        endDate: user.endDate,
        token,
      },
    });
  } catch (error) {
    res.status(500).send({
      responseCode: "95",
      responseMessage: "Internal server error",
      data: null,
    });
    console.log(error);
  }
};

module.exports = login;

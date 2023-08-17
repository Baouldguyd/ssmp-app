const Users = require("../models/users");

const getUserProfileInfo = async (req, res) => {
  try {
    const user = await Users.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(400).send({
        responseCode: "96",
        responseMessage: "User not found",
        data: null,
      });
    }

    res.status(200).send({
      responseCode: "00",
      responseMessage: "User fetched successfully",
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
  } catch (error) {
    res.status(500).send({
      responseCode: "95",
      responseMessage: "internal server error",
      data: null,
    });
    console.log(error);
  }
};

module.exports.getUserProfileInfo = getUserProfileInfo;

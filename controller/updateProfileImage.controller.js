const Joi = require("joi");
const Users = require("../models/users");

const updateProfileImage = async (req, res) => {
  const schema = Joi.object({
    profileImage: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error)
    return res.status(400).send({
      responseCode: "96",
      responseMessage: error.details[0].message?.replaceAll('"', ""),
      data: null,
    });

  try {
    const { profileImage } = req.body;
    let user = await Users.findByIdAndUpdate({ _id: req.params._id });
    if (!user) {
      return res.status(400).send({
        responseCode: "96",
        responseMessage: "No user found",
        data: null,
      });
    }

    user = Users({
      firstName: user.firstName,
      lastName: user.lastName,
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
      profileImage,
    });

    await user.save();
    res.status(200).send({
      responseCode: "00",
      responseMessage: "Profile Image updated successfully",
      data: profileImage,
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

module.exports = updateProfileImage;

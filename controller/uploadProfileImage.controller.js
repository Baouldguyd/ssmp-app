const Users = require("../models/users");
 
 const uploadProfileImage = async (req, res) => {
    try {
      const user = await Users.findOne({ _id: req.user._id });
      if (!user)
        return res.status(400).send({
          responseCode: "80",
          responseMessage: "No user found",
          data: null,
        });
      // Upload the image to Cloudinary
      await cloudinary.uploader
        .upload_stream(
          { folder: "uploads" }, // You can specify a folder in Cloudinary
          (error, result) => {
            if (error) {
              console.error("Error uploading image:", error);
              return res.status(500).json({ error: "Image upload failed" });
            }
            user.profileImage = result.secure_url;
            user.save();
            res.status(200).send({
              responseCode: "00",
              responseMessage: "Profile image upload successfully",
              data: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                profileImage: user.profileImage,
                dateCreated: user.dateCreated,
                dateUpdated: user.dateUpdated,
                role: user.role,
              },
            });
          }
        )
        .end(req.file.buffer);
    } catch (error) {
      res.status(500).send({
        responseCode: "90",
        responseMessage: "Internal server error",
        data: error.message,
      });
      console.log(error);
    }
  }

  module.exports = uploadProfileImage
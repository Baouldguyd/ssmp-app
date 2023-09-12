// const Joi = require("joi");
const { RoleType } = require("../utils/constant");
const Events = require("../models/events");

const deleteEvent = async (req, res) => {

  if (req.user.role !== RoleType.ADMIN) {
    return res.status(401).send({
      responseCode: "80",
      responseMessage: "Unauthorized",
      data: null,
    });
 }

  try {
    const event = await Events.findByIdAndDelete({ _id: req.params._id });
    if (!event) {
      return res.status(400).send({
        responseCode: "96",
        responseMessage: "No event found",
        data: null,
      });
    }
 

    res.status(200).send({
        responseCode: "00",
        responseMessage: "Event deleted successfully",
        data: null
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
module.exports = deleteEvent

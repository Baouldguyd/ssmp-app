const Joi = require("joi");
const { RoleType } = require("../utils/constant");
const Events = require("../models/events");


const updateEvent = async (req, res) => {
  const schema = Joi.object({
    eventImage: Joi.string().required(),
    eventName: Joi.string().required(),
    speaker: Joi.string().required(),
    eventDescription: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error)
    return res.status(400).send({
      responseCode: "96",
      responseMessage: error.details[0].message?.replaceAll("\"", ""),
      data: null,
    });

  if (req.user.role !== RoleType.ADMIN) {
    return res.status(401).send({
      responseCode: "80",
      responseMessage: "Unauthorized",
      data: null,
    });
  }

  try {
    const { eventImage, eventName, speaker, eventDescription, eventDate } =
      req.body;
    let event = await Events.findByIdAndUpdate({ _id: req.params._id});
    if (!event) {
      return res.status(400).send({
        responseCode: "96",
        responseMessage: "No event found",
        data: null,
      });
    }
    event = Events({
      eventImage,
      eventName,
      speaker,
      eventDescription,
      eventDate,
      dateCreated: new Date().toJSON(),
      createdBy: req.user.email,
      dateUpdated: new Date().toJSON(),
      updatedBy: req.user.email,
    });
    await event.save();
    res.status(200).send({
        responseCode: "00",
        responseMessage: "Event updated successfully",
        data: event
    })
  } catch (error) {
    res.status(500).send({
      responseCode: "95",
      responseMessage: "internal server error",
      data: null,
    });
    console.log(error);
  }
};

module.exports = updateEvent;

const Events = require("../models/events");
const Joi = require("joi");
const { RoleType } = require("../utils/constant");


const eventCreation = async (req, res) => {
        const schema = Joi.object({
            eventName: Joi.string().required(),
            speaker: Joi.string(),
            eventDescription: Joi.string().required(),
            eventUrl: Joi.string().required()
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
          const { eventName, speaker, eventDate, eventDescription, eventUrl } =
            req.body;
        
          try {
            let event = await Events.findOne({ eventName });
        
            if (event)
              return res.status(400).send({
                responseCode: "96",
                responseMessage: "Event already exist",
                data: null,
              });
        
            event = new Events({
              eventName,
              speaker,
              eventDate,
              eventDescription,
              eventUrl,
              dateCreated: new Date().toJSON(),
              createdBy: req.user.email,
              dateUpdated: null,
              updatedBy: null,

            });
        
            await event.save();
            res.status(200).send({
              responseCode: "00",
              responseMessage: "event created successfully",
              data: event,
            });
          } catch (error) {
            res.status(500).send({
              responseCode: "96",
              responseMessage: "internal server error",
              data: null,
            });
            console.log(error);
          }
    }


module.exports = eventCreation



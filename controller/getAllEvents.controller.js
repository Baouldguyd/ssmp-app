const Events = require("../models/events");

const getAllEvents = async(req, res) => {
    try {
        const event = await Events.find();
        if (!event) {
            return res.status(400).send({
                responseCode: "96",
                responseMessage: "No event could be fetched",
                data: null
            })
        }
        
        res.status(200).send({
            responseCode: "00",
            responseMessage: "Events fetched successfully",
            data: event
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

module.exports = getAllEvents
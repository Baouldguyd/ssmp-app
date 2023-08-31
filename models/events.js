const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    eventName: {
        type : String
    },
    speaker:{
        type: String
    },
    eventDate: {
        type : String
    },
    eventDescription: {
        type: String,
    },
    eventUrl:{
        type: String
    },
    dateCreated: {
        type: String,
        default: new Date().toJSON()
    },
    createdBy: {
        type: String
    },  
    dateUpdated: {
        type: String,
    },
    updatedBy: {
        type: String,
    }
})

const Events = mongoose.model("event", eventSchema)

module.exports = Events
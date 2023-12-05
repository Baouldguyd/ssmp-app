const mongoose = require("mongoose");

const visitorsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: 3,
        required: "First name is required"
    },
    lastName: {
        type: String,
        minlength: 3,
        required: "Last name is required"
    },
    email: {
        type: String,
        unique: true,
        required : "Email is required"
    },
    phoneNumber: {
        type: String,
        required: "Phone number is required"
    },
    sex:{
        type: String,
        required: "Sex is required"
    },
    address:{
        type: String,
        required: "Home Address is required"
    },
    reasonForVisit:{
        type: String,
        required: "Enter Your Address"
    },
    isAccepted: {
        type: Boolean,
        default: false
    },
    isRejected: {
        type: Boolean,
        default: false
    },
})

const Visitors = mongoose.model("visitors", visitorsSchema)

module.exports = Visitors


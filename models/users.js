const mongoose = require("mongoose")


const usersSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: "password is required"
    },
    phoneNumber: {
        type: String,
        required: "Phone number is required"
    },
    lga: {
        type: String,
        minlength: 3,
        required: "Lga is required"
    },
    homeAddress: {
        type: String,
        minlength: 3,
        required: " home address is required"
    },
    startDate: {
        type: String,
        minlength: 3,
        required: "Start date is required"
    },
    endDate: {
        type: String,
        minlength: 3,
        required: "End date is required"
    },
    isVerified: {
        type: Boolean,
        required: "isverified is required",
        default: false
    },
    isDeactivated: {
        type: Boolean,
        required: "isdeactivated is required",
        default: false
    },
    isReactivated: {
        type: Boolean,
        required: "isreactivated is required",
        default: false
    },
    dateCreated: {
        type: String,
        default: new Date().toJSON()
    },
    dateUpdated: {
        type: String,
    },
})


const Users = mongoose.model("users", usersSchema )


module.exports = Users
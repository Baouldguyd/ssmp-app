const Visitors = require("../models/visit");


const getAllVisitors = async(req, res) => {
    try {
        const visitor = await Visitors.find();
        if (!visitor) {
            return res.status(400).send({
                responseCode: "96",
                responseMessage: "No visitor could be fetched",
                data: null
            })
        }
        
        res.status(200).send({
            responseCode: "00",
            responseMessage: " All Visitors fetched successfully",
            data: visitor
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

module.exports = getAllVisitors
const Lga = require("../models/lga")

const getLocalGovLagosEast = async (_req, res) =>{
    try {
        const data = await Lga.find({})
        res.status(200).send({
            responseCode: "00",
            responseMessage:"successful",
            data
        })
    } catch (error) {
        res.status(500).send({
            responseCode: "95",
            responseMessage:"internal server error",
            data: null
        })
        console.log(error)
    }
}
module.exports = getLocalGovLagosEast
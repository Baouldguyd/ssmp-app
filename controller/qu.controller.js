const QRCode= require("qrcode")
const Visitors = require("../models/visit") 

const getVisitorqrCode = async(req, res) => {
  try {
    // const visitorId = req.params.id;
    const visitorId = req.body.id;

  // Check if req.visitor._id is defined
  if (!visitorId) {
    return res.status(400).send({
      responseCode: "96",
      responseMessage: "Visitor ID is missing in the request",
      data: null,
    });
  }
    const visitor = await Visitors.findOne({ _id: visitorId });
    if (!visitor) {
      return res.status(400).send({
        responseCode: "96",
        responseMessage: "Visitor not found",
        data: null,
      });
    }

     // Prepare user data for the QR code
    const visitorData = `firstName: ${visitor.firstName}\nlastName: ${visitor.lastName}\nEmail: ${visitor.email}\nphoneNumber: ${visitor.phone}\nsex: ${visitor.address}\nreasonForVisit: ${visitor.reasonForVisit}`;

     // Generate QR code
    const qrCode = await QRCode.toDataURL(visitorData);

    res.status(200).send({
      responseCode: "00",
      responseMessage: "Successful",
      image: qrCode
  })
  }catch (error) {
    res.status(500).send({
        responseCode: "95",
        responseMessage:"internal server error"?.replaceAll("\"", ""),
        data: null
    })
    console.log(error)
}
};

module.exports = getVisitorqrCode
   
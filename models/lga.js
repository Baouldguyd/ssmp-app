const mongoose = require("mongoose");

const lgaSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

const Lga = mongoose.model("Lga", lgaSchema);

module.exports = Lga;

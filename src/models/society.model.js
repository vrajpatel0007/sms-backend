const mongoose = require("mongoose");

const societySchema = new mongoose.Schema(
  {
    societyname: {
      type: String,
      require: true
    },
    societyaddress: {
      type: String,
      require: true
    },
    Country: {
      type: String,
      require: true
    },
    State: {
      type: String,
      require: true
    },
    City: {
      type: String,
      require: true
    },
    Zipcode: {
      type: Number,
      require: true
    },
    residents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resident'
      }
    ],
    units: {
      type: Number,
      default: 0
    },
  },
  {
    timestamps: true,
  }
);


const Society = mongoose.model("Society", societySchema);

module.exports = Society;


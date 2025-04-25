const  mongoose = require("mongoose");

const facilitySchema = new mongoose.Schema(
  {
    Facility_Name: {
      type: String,
      require: true
    },
    Description: {
      type: String,
      require: true
    },
    Schedule_Service_Date: {
      type: Date,
      require: true
    },
    Remind_Before: {
      type: String,
      require: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Manager'
    },
    Society: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Society'
    }
  },
  {
    timestamps: true,
  }
);



const Facility = mongoose.model("Facility ", facilitySchema);

module.exports = Facility;

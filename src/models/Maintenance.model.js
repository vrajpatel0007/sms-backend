const  mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema(
  {
    Maintenance_Amount: {
      type: Number,
      require: true
    },
    Penalty_Amount: {
      type: Number,
      require: true
    },
    Maintenance_Due_Date: {
      type: Date,
      require: true
    },
    Penalty_Applied_After_Day_Selection: {
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



const Maintenance = mongoose.model("Maintenance", maintenanceSchema);

module.exports = Maintenance;

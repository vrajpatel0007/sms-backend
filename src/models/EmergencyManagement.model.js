const mongoose = require("mongoose");

const emergencymanagementSchema = new mongoose.Schema(
    {
        Alert_Type: {
            type: String,
            require: true
        },
        Description: {
            type: String,
            require: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Security'
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



const Alert = mongoose.model("Alert", emergencymanagementSchema);

module.exports = Alert;

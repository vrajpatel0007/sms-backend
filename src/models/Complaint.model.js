const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
    {
        Complainer_Name: {
            type: String,
            require: true
        },
        Complaint_Name: {
            type: String,
            require: true
        },
        Description: {
            type: String,
            require: true
        },
        Wing: {
            type: String,
            require: true
        },
        Unit: {
            type: String,
            require: true
        },
        Priority: {
            type: String,
            enum: ["High", "Medium", "Low"],
            require: true
        },
        Status: {
            type: String,
            enum: ["open", "Pending", "Solve"],
            require: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Resident'
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



const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;

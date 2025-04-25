const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
    {
        Requester_Name: {
            type: String,
            require: true
        },
        Request_Name: {
            type: String,
            require: true
        },
        Request_Date: {
            type: Date,
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



const Request = mongoose.model("Request", requestSchema);

module.exports = Request;

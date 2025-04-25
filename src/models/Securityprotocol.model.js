const mongoose = require("mongoose");

const securityprotocolSchema = new mongoose.Schema(
    {
        Title: {
            type: String,
            require: true
        },
        Description: {
            type: String,
            require: true
        },
        Date: {
            type: Date,
            default: Date.now,
            require: true
        },
        Time: {
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



const Securityprotocol = mongoose.model("Securityprotocol", securityprotocolSchema);

module.exports = Securityprotocol;

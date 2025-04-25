const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
    {
        Visitor_Name: {
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
        Date: {
            type: Date,
            require: true
        },
        Phone: {
            type: Number,
            require: true
        },
        Time: {
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



const Visitor = mongoose.model("Visitor", visitorSchema);

module.exports = Visitor;

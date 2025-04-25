const mongoose = require("mongoose");

const securitySchema = new mongoose.Schema(
    {
        photo: {
            type: String,
            require: true
        },
        Full_Name: {
            type: String,
            require: true
        },
        Email: {
            type: String,
            require: true
        },
        phone_Number: {
            type: Number,
            require: true
        },
        Gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            require: true
        },
        Shift: {
            type: String,
            enum: ["Night", "Day"],
            require: true
        },
        Shift_Data: {
            type: Date,
            require: true
        },
        Shift_Time: {
            type: String,
            require: true
        },
        Aadhar_Card: {
            type: String,
            require: true
        },
        Password: {
            type: String,
            require: true
        },
        Role: {
            type: String,
            default: "Security",
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



const Security = mongoose.model("Security", securitySchema);

module.exports = Security;

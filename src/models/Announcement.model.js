const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    Society: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Society'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manager'
    }
},
    {
        timestamps: true
    });

const Announcement = mongoose.model('Announcement', announcementSchema);
module.exports = Announcement;
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        message: {
            type: String,
            required: true,
            trim: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    },
    {
        collection: 'chats',
    }
);


const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat

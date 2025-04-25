const mongoose = require("mongoose");
const Notification  = require("../models/Notification.model");

const users = {}; // userId -> socketId

const registerUser = (userId, socketId) => {
  users[userId] = socketId;
  console.log(`🟢 Registered: ${userId} -> ${socketId}`);
};

const unregisterUser = (socketId) => {
  for (const userId in users) {
    if (users[userId] === socketId) {
      delete users[userId];
      console.log(`🔴 Unregistered: ${userId}`);
      break;
    }
  }
};

async function sendNotification({ socketio, recipientId, message, type }) {
    // Validate input fields
    if (!message || !type || !recipientId) {
      console.warn("❌ Missing required fields for notification.");
      return { success: false, message: "Missing required fields" };
    }
  
    try {
      // Create a new notification instance
      const notification = new Notification({
        recipientId,
        message,
        type,
        isRead: false,  // Default notification as unread
      });
  
      // Save the notification to the database
      await notification.save();
  
      // Emit the notification to all connected users (real-time notification)
      if (socketio) {
        socketio.emit("new_notification", { recipientId, message, type });
        console.log("✅ Emitted notification to Socket.IO.");
      }
  
      // Log the saved notification (optional)
      console.log("✅ Notification saved:", notification);
  
      // Return success response
      return { success: true, notification };
    } catch (error) {
      // Handle any errors that occur during the save operation
      console.error("❌ Error saving notification:", error);
  
      // Return failure response
      return { success: false, message: "Error saving notification" };
    }
  }
  

module.exports = {
  registerUser,
  unregisterUser,
  sendNotification,
};

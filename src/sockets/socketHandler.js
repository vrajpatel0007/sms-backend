// const { registerUser, unregisterUser, sendNotification } = require("./notification");

// function socketHandler(io) {
//   io.on("connection", (socket) => {
//     console.log("A user connected:", socket.id);

//     // Register user when they connect
//     socket.on("register", (userId) => {
//       registerUser(userId, socket.id);
//     });

//     // Handle user disconnection
//     socket.on("disconnect", () => {
//       console.log("A user disconnected:", socket.id);
//       unregisterUser(socket.id);
//     });

//     // Listen for a notification trigger event
//     socket.on("send_notification", async ({ type, recipientId, message }) => {
//       await sendNotification(io, type, recipientId, null, message); // No need for societyId if sending to a specific user
//     });
//   });
// }

// module.exports = socketHandler;
const { registerUser, unregisterUser, sendNotification } = require("./notification");

function socketHandler(io) {
  io.on("connection", (socket) => {
    console.log("✅ A user connected:", socket.id);

    socket.on("register", (userId) => {
      registerUser(userId, socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ A user disconnected:", socket.id);
      unregisterUser(socket.id);
    });

    socket.on("send_notification", async ({ type, recipientId, message }) => {
      await sendNotification(io, type, recipientId, null, message);
    });
  });
}

module.exports = socketHandler;

const express = require("express");
const http = require("http");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const routes = require("./src/routes/route");
const connectDB = require("./src/db/dbconnect");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const socketHandler = require("./src/sockets/socketHandler");

// Load environment variables
dotenv.config({ path: ".env" });

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust for production security
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "public")));

// Register API routes
app.use(routes);
app.get("/", (req, res) => {
  res.send("Welcome to the API! 🎉");
});
// Connect to MongoDB
connectDB();

// Initialize socket events
socketHandler(io);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
  console.log("🎤 AMA: Ask Me Anything! (About Express + Socket.io 😉)");
});

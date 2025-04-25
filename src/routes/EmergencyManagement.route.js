const express = require("express");
const router = express.Router();
const AlertController = require("../controllers/EmergencyManagement.controller");
const { authUser } = require("../middleware/auth");

router.post("/createAlert", authUser, AlertController.createAlert);
router.get("/getAllAlerts", authUser, AlertController.getAllAlerts);
router.get("/getAlert/:id", authUser, AlertController.getAlert);
router.delete("/deleteAlert/:id", authUser, AlertController.deleteAlert);

module.exports = router;

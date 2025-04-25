const express = require("express");
const router = express.Router();
const MaintenanceController = require("../controllers/Maintenance.controller");
const { authUser } = require("../middleware/auth");

router.post("/createMaintenance", authUser, MaintenanceController.createMaintenance);
router.get("/getAllaintenances", authUser, MaintenanceController.getAllMaintenances);
router.get("/getMaintenance/:id", authUser, MaintenanceController.getMaintenance);
router.put("/updateMaintenance/:id", authUser, MaintenanceController.updateMaintenance);
router.delete("/deleteMaintenance/:id", authUser, MaintenanceController.deleteMaintenance);
router.get("/getMaintenanceStatus", authUser, MaintenanceController.getMaintenanceStatus);


module.exports = router;

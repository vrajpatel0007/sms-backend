const express = require("express");
const router = express.Router();
const facilityController = require("../controllers/Facility.controller");
const { authUser } = require("../middleware/auth");

router.post("/createFacility", authUser, facilityController.createFacility);
router.get("/getAllFacilities", authUser, facilityController.getAllFacilities);
router.get("/getFacility/:id", authUser, facilityController.getFacility);
router.put("/updateFacility/:id", authUser, facilityController.updateFacility);
router.delete("/deleteFacility/:id", authUser, facilityController.deleteFacility);

module.exports = router;

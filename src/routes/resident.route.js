const express = require("express");
const resident_controller = require("../controllers/resident.controller");
const router = express.Router();
const { authUser } = require("../middleware/auth")
const { upload } = require("../middleware/upload")

router.post("/create", authUser, upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "aadhaarFront", maxCount: 1 },
    { name: "aadhaarBack", maxCount: 1 },
    { name: "addressProof", maxCount: 1 },
    { name: "rentAgreement", maxCount: 1 },
]), resident_controller.createResident)
router.get("/getall", authUser, resident_controller.getAllResident)
router.get("/profile/:id", authUser, resident_controller.getResident)
router.put("/update/:id", authUser, upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "aadhaarFront", maxCount: 1 },
    { name: "aadhaarBack", maxCount: 1 },
    { name: "addressProof", maxCount: 1 },
    { name: "rentAgreement", maxCount: 1 },
]), resident_controller.updateResident)
router.delete("/delete/:id", authUser, resident_controller.deleteResident)

module.exports = router;
const express = require("express");
const manager_controller = require("../controllers/manager.controller");
const router = express.Router();
const { authUser } = require("../middleware/auth")
const { upload } = require("../middleware/upload")


router.post("/createmanager", manager_controller.register);
router.put("/updatemanger", authUser, upload.fields([{ name: "Image" }]), manager_controller.update)
router.get("/profile", authUser, manager_controller.getProfile)
router.post("/login", manager_controller.login);
router.post("/sedotp", manager_controller.sed_otp);
router.post("/verifyotp", manager_controller.otpverify);
router.post("/forgotpassword", manager_controller.forgotpassword);

module.exports = router;

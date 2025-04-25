const express = require("express");
const securityController = require("../controllers/Security.controller");
const router = express.Router();
const { authUser } = require("../middleware/auth");
const { upload } = require("../middleware/upload");

// Routes
router.post("/createsecurity", authUser, upload.fields([{ name: "photo", maxCount: 1 },{ name: "Aadhar_Card", maxCount: 1 }]), securityController.register);
router.put("/updatesecurity/:id", authUser,upload.fields([{ name: "photo", maxCount: 1 },{ name: "Aadhar_Card", maxCount: 1 }]), securityController.update);
router.get("/security/:id", authUser, securityController.getSecurity);
router.get("/getallsecurity", authUser, securityController.getgetallsecurity)
router.delete("/deletesecurity/:id", authUser, securityController.deleteSecurity);


router.post('/createVisitor', authUser, securityController.createVisitor);
router.get('/getallVisitors', authUser, securityController.getAllVisitors);

router.post("/createprotocol", authUser, securityController.createSecurityProtocol)
router.get('/getallprotocols', authUser, securityController.getAllSecurityProtocols)
router.get("/getprotocol/:id", authUser, securityController.getSecurityProtocol)
router.put("/updateprotocol/:id", authUser, securityController.updateSecurityProtocol)
router.delete("/deleteprotocol/:id", authUser, securityController.deleteSecurityProtocol)

module.exports = router;
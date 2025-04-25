const express = require("express");
const router = express.Router();
const OtherincomeController = require("../controllers/Otherincome.controller");
const { authUser } = require("../middleware/auth");

router.post("/createOtherincome", authUser, OtherincomeController.createOtherincome);
router.get("/getAllOtherincome", authUser, OtherincomeController.getallOtherincomes);
router.get("/getOtherincome/:id", authUser, OtherincomeController.getOtherincome);
router.put("/updateOtherincome/:id", authUser, OtherincomeController.updateOtherincome);
router.delete("/deleteOtherincome/:id", authUser, OtherincomeController.deleteOtherincome);

module.exports = router;

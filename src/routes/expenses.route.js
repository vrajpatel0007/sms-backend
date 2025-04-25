const express = require("express");
const router = express.Router();
const expenses_controller = require("../controllers/expenses.controller");
const { authUser } = require("../middleware/auth")
const { upload } = require("../middleware/upload")

router.post("/createexpenses",authUser, upload.fields([{ name: "Bill" }]),expenses_controller.createexpenses);
router.get("/getAllexpensess",authUser, expenses_controller.getAllexpenses);
router.get("/getexpenses/:id",authUser, expenses_controller.getexpense);
router.put("/updateexpenses/:id",authUser, upload.fields([{ name: "Bill" }]), expenses_controller.updateexpenses);
router.delete("/deleteexpenses/:id",authUser, expenses_controller.deleteexpenses);

module.exports = router;

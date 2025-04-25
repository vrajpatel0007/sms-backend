const express = require("express");
const router = express.Router();
const importantnumber_controller = require("../controllers/importantnumber.controller");
const { authUser } = require("../middleware/auth")

router.post("/createImportantNumber", authUser,importantnumber_controller.createImportantNumber);
router.get("/getAllImportantNumbers", authUser,importantnumber_controller.getAllImportantNumbers);
router.put("/updateImportantNumber/:id", authUser,importantnumber_controller.updateImportantNumber);
router.delete("/deleteImportantNumber/:id", authUser,importantnumber_controller.deleteImportantNumber);

module.exports = router;

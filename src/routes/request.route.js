const express = require("express");
const router = express.Router();
const RequestController = require("../controllers/Request.controller");
const { authUser } = require("../middleware/auth");

router.post("/createRequest", authUser, RequestController.createRequest);
router.get("/getAllRequests", authUser, RequestController.getAllRequests);
router.get("/getRequest/:id", authUser, RequestController.getRequest);
router.put("/updateRequest/:id", authUser, RequestController.updateRequest);
router.delete("/deleteRequest/:id", authUser, RequestController.deleteRequest);

module.exports = router;

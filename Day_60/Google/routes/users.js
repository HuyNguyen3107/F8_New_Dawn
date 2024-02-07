var express = require("express");
var router = express.Router();
const userController = require("../controllers/user.controller");

/* GET users listing. */
router.get("/", userController.index);
router.get("/permission/:id", userController.permission);
router.post("/permission/:id", userController.handlePermission);

module.exports = router;

var express = require("express");
var router = express.Router();
const userController = require("../controllers/user.controller");
const permissionMiddleware = require("../middlewares/permission.middleware");

/* GET users listing. */
router.get("/", permissionMiddleware("users.watch"), userController.index);
router.get("/permission/:id", userController.permission);
router.post("/permission/:id", userController.handlePermission);

module.exports = router;

var express = require("express");
var router = express.Router();
const roleController = require("../controllers/role.controller");
const permissionMiddleware = require("../middlewares/permission.middleware");

router.get("/", permissionMiddleware("users.watch"), roleController.index);
router.get("/add", permissionMiddleware("users.create"), roleController.add);
router.post(
  "/add",
  permissionMiddleware("users.create"),
  roleController.handleAdd
);
router.get(
  "/edit/:id",
  permissionMiddleware("users.edit"),
  roleController.edit
);
router.post(
  "/edit/:id",
  permissionMiddleware("users.edit"),
  roleController.handleEdit
);
router.post(
  "/delete/:id",
  permissionMiddleware("users.delete"),
  roleController.delete
);

module.exports = router;

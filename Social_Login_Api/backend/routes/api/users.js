var express = require("express");
var router = express.Router();
const userController = require("../../controllers/api/user.controller");
const authMiddleware = require("../../middlewares/api/auth.middleware");

/* GET users listing. */
router.get("/", authMiddleware, userController.getListUser);
router.get("/profile", authMiddleware, userController.getProfile);
router.get("/:id", authMiddleware, userController.getUser);
router.patch("/:id", authMiddleware, userController.update);
router.post("/delete/:id", authMiddleware, userController.delete);
router.post("/delete", authMiddleware, userController.deletes);

module.exports = router;

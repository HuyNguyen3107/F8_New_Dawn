var express = require("express");
var router = express.Router();
const accountController = require("../controllers/account.controller");

/* GET home page. */
router.get("/", accountController.index);
router.post("/", accountController.handleInfo);
router.get("/change-password", accountController.changePassword);
router.post("/change-password", accountController.handleChangePassword);
router.get("/manage-device", accountController.manageDevice);
router.post("/logout/:id", accountController.logoutDevice);

module.exports = router;

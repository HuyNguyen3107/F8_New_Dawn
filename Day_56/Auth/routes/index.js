var express = require("express");
var router = express.Router();
const indexController = require("../controllers/index.controller");

/* GET home page. */
router.get("/", indexController.index);
router.get("/logout", indexController.logout);
router.get("/check-mail", indexController.checkMail);

module.exports = router;

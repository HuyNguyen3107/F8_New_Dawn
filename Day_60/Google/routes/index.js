var express = require("express");
var router = express.Router();
const path = require("path");
const { where } = require("sequelize");
const indexController = require("../controllers/index.controller");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { req });
});

router.get("/short/:id", indexController.redirect);
router.get("/save-redirect", indexController.saveRedirect);
router.get("/check-password/:id", indexController.checkPassword);
router.post("/check-password/:id", indexController.handleCheckPassword);

router.get("/logout", indexController.logout);

module.exports = router;

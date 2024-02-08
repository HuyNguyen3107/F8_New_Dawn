var express = require("express");
var router = express.Router();
const bankController = require("../controllers/bank.controller");

/* GET home page. */
router.get("/", bankController.index);

module.exports = router;

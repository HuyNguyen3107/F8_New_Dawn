var express = require("express");
var router = express.Router();
const contactController = require("../controllers/contact.controller");

/* GET home page. */
router.get("/", contactController.index);
router.post("/", contactController.handleSend);
router.get("/histories", contactController.histories);
router.get("/histories-detail/:uuid", contactController.historiesDetail);
router.post("/delete-email/:uuid", contactController.deleteEmail);

module.exports = router;

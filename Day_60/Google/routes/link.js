var express = require("express");
var router = express.Router();
const linkController = require("../controllers/link.controller");

/* GET users listing. */
router.get("/", linkController.index);
router.post("/", linkController.handleShorten);
router.get("/manage", linkController.manage);
router.get("/manage/password/:id", linkController.password);
router.get("/manage/edit/:id", linkController.edit);
router.post("/manage/edit/:id", linkController.handleEdit);
router.post("/manage/delete/:id", linkController.delete);

module.exports = router;

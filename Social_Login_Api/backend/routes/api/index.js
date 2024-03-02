var express = require("express");
var router = express.Router();
const authRouter = require("./auth");
const userRouter = require("./users");

/* GET users listing. */
router.use("/auth", authRouter);
router.use("/users", userRouter);

module.exports = router;

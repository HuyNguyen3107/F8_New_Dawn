var express = require("express");
var router = express.Router();
const authController = require("../controllers/auth.controller");
const passport = require("passport");

router.get("/login", authController.login);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    failureFlash: true,
    badRequestMessage: "Please Enter Email and Password",
    successRedirect: "/",
  })
);
router.get("/google", passport.authenticate("google"));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureFlash: true,
    failureRedirect: "/auth/login",
    successRedirect: "/",
  })
);
router.get("/register", authController.register);
router.post("/register", authController.handleRegister);
router.get("/forgot-password", authController.forgotPassword);
router.post("/forgot-password", authController.handleForgotPassword);
router.get("/reset-password", authController.resetPassword);
router.post("/reset-password", authController.handleResetPassword);

module.exports = router;

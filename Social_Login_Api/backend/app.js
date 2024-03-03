var createError = require("http-errors");
require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const expressEjsLayout = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const whitelist = require("./utils/cors");
const cors = require("cors");
const passport = require("passport");
const userService = require("./services/user.service");

const apiRouter = require("./routes/api/index");

const validateMiddleware = require("./middlewares/validate.middleware");

const passportGoogle = require("./passports/passport.google");
const passportGithub = require("./passports/passport.github");

// var corsOptions = {
//   origin: function (origin, callback) {
//     const env = process.env.NODE_ENV || "development";
//     if (env === "production") {
//       if (whitelist.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//       return;
//     }

//     callback(null, true);
//   },
// };

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(
  session({
    name: "f8",
    secret: "21aba181cc4d",
    resave: false,
    saveUninitialized: true,
    // cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use("github", passportGithub);
passport.use("google", passportGoogle);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  const user = await userService.findByPk(id);
  done(null, user);
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressEjsLayout);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use(validateMiddleware);
app.use("/api", cors(), apiRouter);

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

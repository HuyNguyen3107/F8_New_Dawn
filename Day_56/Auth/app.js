require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const expressEjsLayout = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const authMiddleware = require("./middlewares/auth.middleware");
const indexMiddleware = require("./middlewares/index.middleware");
const validateMiddleware = require("./middlewares/validate.middleware");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const accountRouter = require("./routes/account");
const contactRouter = require("./routes/contact");

var app = express();

app.use(
  session({
    name: "f8_session",
    secret: "21aba181cc4d",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 360000000000,
    },
  })
);

app.use(flash());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressEjsLayout);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(validateMiddleware);
app.use(indexMiddleware);
app.use("/auth", authRouter);
app.use(authMiddleware);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/account", accountRouter);
app.use("/contact", contactRouter);

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

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const hbs = require("express-hbs");

const homeRouter = require("./routes/home");
const aboutRouter = require("./routes/about");
const blogRouter = require("./routes/blog");
const usersRouter = require("./routes/users");
const topicRouter = require("./routes/topic");

const app = express();

const relative = (subpath) => {
  return path.join(__dirname, subpath);
};

// view engine setup
app.engine(
  "hbs",
  hbs.express4({
    partialsDir: [relative("views/partials")],
    defaultLayout: relative("views/layout/default.hbs"),
  })
);
app.set("views", relative("views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", homeRouter);
app.use("/users", usersRouter);
app.use("/about", aboutRouter);
app.use("/blog", blogRouter);
app.use("/topic", topicRouter);

app.locals.PROD_MODE = "production" === app.get("env");
app.locals.NAVS = [
  { id: 1, name: "home", href: "/" },
  { id: 2, name: "blog", href: "/blog" },
  { id: 3, name: "about", href: "/about" },
  { id: 4, name: "topic", href: "/topic" },
];

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

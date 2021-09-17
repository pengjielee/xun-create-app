const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const { mongodb_conn, port, secret } = require("./config");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

//创建monbodb数据库连接，并暴露全局变量db
global.db = mongoose.createConnection(mongodb_conn, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const User = require("./models/user");

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    },
    async (jwtPayload, next) => {
      const user = await User.findOne({ _id: jwtPayload.id });
      if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
    }
  )
);

const app = express();
app.disable("x-powered-by");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, limit: "10mb" }));
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.get("/hello", (req, res) => {
  res.status(200).send("Hello World!");
});

app.get(
  "/admin",
  (req, res, next) => {
    passport.authenticate("jwt", function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (user) {
        req.user = user;
        return next();
      } else {
        return res.status(401).json({ status: 0, message: "未授权" });
      }
    })(req, res, next);
  },
  (req, res) => {
    res.json({ status: 1, message: "profile", data: req.user });
  }
);

//添加user路由
app.use("/api/user", require("./routes/user"));

//404错误处理
app.use(function (req, res, next) {
  res.status(404).send("Not Found");
});

//添加全局错误处理
app.use(function (err, req, res, next) {
  return res.status(500).json({ status: 500, message: "内部错误" });
});

module.exports = app.listen(port, () => {
  console.log(`My app listening at http://localhost:${port}`);
});

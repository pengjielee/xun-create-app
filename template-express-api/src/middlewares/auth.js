const passport = require("passport");

const auth = (req, res, next) => {
  passport.authenticate("jwt", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (user) {
      req.user = user;
      return next();
    } else {
      return res.status(401).json({ status: 0, message: "需要授权" });
    }
  })(req, res, next);
};

module.exports = {
  auth: auth,
};

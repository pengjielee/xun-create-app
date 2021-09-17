const express = require("express");
const { header, body } = require("express-validator");
const router = express.Router();
const Controller = require("../controllers/user");
const middleware = require("../middlewares/auth");

router.get("/", Controller.list);
router.get("/:id", Controller.detail);
router.post("/", Controller.add);
router.delete("/:id", Controller.delete);
router.put("/", Controller.update);
router.post("/profile", middleware.auth, Controller.profile);

// 修改密码
router.post(
  "/changepwd",
  header("Authorization").exists(),
  Controller.changePwd
);

router.post(
  "/register",
  body("username").isLength({ min: 2 }).withMessage("用户名最小长度为2"),
  body("password").isLength({ min: 6 }).withMessage("密码最小长度为6"),
  Controller.register
);

router.post(
  "/login",
  body("username").isLength({ min: 2 }).withMessage("用户名最小长度为2"),
  body("password").isLength({ min: 6 }).withMessage("密码最小长度为6"),
  Controller.login
);

module.exports = router;

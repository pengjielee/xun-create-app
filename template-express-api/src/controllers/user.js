const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const md5 = require("blueimp-md5");
const { validationResult } = require("express-validator");
const Model = require("../models/user");
const config = require("../config");

exports.list = async (req, res, next) => {
  let { page = 1, size = 10 } = req.query;
  page = parseInt(page);
  size = parseInt(size);
  const number = (page - 1) * size;
  const data = await Model.find({})
    .sort({ create_date: -1 })
    .limit(size)
    .skip(number);
  res.json({ status: 1, message: "ok", data: data });
};

exports.detail = async (req, res, next) => {
  const { id } = req.params;
  const data = await Model.findById(id);

  res.json({ status: 1, message: "ok", data: data });
};

exports.add = async (req, res, next) => {
  const { username, email, password } = req.body;
  const newModel = new Model({
    username,
    email,
    password,
  });
  const data = await newModel.save();
  if (!data) {
    res.json({ status: 0, message: "error" });
  } else {
    res.json({ status: 1, message: "ok", data: data });
  }
};

exports.delete = async (req, res, next) => {
  const { id } = req.params;
  const data = await Model.findByIdAndRemove(id);
  if (!data) {
    res.json({ status: 0, message: "error" });
  } else {
    res.json({ status: 1, message: "ok", data: data });
  }
};

exports.update = async (req, res, next) => {
  const { id, username, email, password } = req.body;
  const data = await Model.findByIdAndUpdate(id, {
    username,
    email,
    password,
  });
  if (!data) {
    res.json({ status: 0, message: "error" });
  } else {
    res.json({ status: 1, message: "ok", data: data });
  }
};

exports.login1 = async (req, res, next) => {
  const { username, password } = req.body;

  //根据用户名查找数据库是否存在该用户
  const dbUser = await Model.findOne({ username });
  if (!dbUser) {
    return res.json({ status: 0, message: "用户不存在" });
  }

  //获取数据库中的用户id和密码
  const { _id, password: dbPassword } = dbUser;

  // 如果密码相符，则生成token
  if (password === dbPassword) {
    //获取加密密钥，token过期时间
    const { secret, expiresIn } = config;
    const payload = { id: _id };
    const token = jwt.sign(payload, secret, {
      expiresIn,
    });
    res.json({ status: 1, message: "ok", data: { token: token } });
  } else {
    res.json({ status: 0, message: "用户名或密码错误" });
  }
};

exports.profile = (req, res) => {
  res.send(req.user);
};

exports.changePwd = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ status: 0, message: errors.array() });
  }
  res.json({ status: 1, message: "修改密码" });
};

exports.register = async (req, res, next) => {
  //检查提交参数
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ status: 0, message: errors.array() });
  }

  //获取提交的用户名和密码
  const { username, password } = req.body;

  //检查数据库中的用户名是否存在
  const dbUser = await Model.findOne({ username });
  if (dbUser) {
    return res.json({ status: 0, message: "用户名已被占用，换一个吧" });
  }

  //生成加密盐
  const salt = await bcrypt.genSalt(10);
  //使用md5加密密码
  const encryptPassword = md5(password, salt);

  //保存用户信息
  const newUser = new Model({
    username: username,
    password: encryptPassword,
    salt: salt, //加密盐也保存
  });
  const user = await newUser.save();

  if (!user) {
    res.json({ status: 0, message: "注册失败" });
  } else {
    res.json({ status: 1, message: "注册成功", data: user.username });
  }
};

exports.login = async (req, res, next) => {
  //检查提交参数
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ status: 0, errors: errors.array() });
  }

  //获取提交的用户名和密码
  const { username, password } = req.body;

  //检查数据库中的用户是否存在
  const dbUser = await Model.findOne({ username });
  if (!dbUser) {
    return res.json({ status: 9999, message: "用户不存在" });
  }

  //获取数据库中保存的用户信息
  const { _id, password: dbPassword, salt } = dbUser;

  //对密码进行加密
  const encryptPassword = md5(password, salt);
  const isMatch = encryptPassword === dbPassword;
  //如果密码正确
  if (isMatch) {
    const { secret, expiresIn } = config;
    // 生成token，把用户id存入
    const payload = { userid: _id };
    const token = jwt.sign(payload, secret, {
      expiresIn,
    });
    //返回token
    res.json({ status: 1, message: "ok", data: { token: token } });
  } else {
    res.json({ status: 0, message: "用户名或密码错误" });
  }
};

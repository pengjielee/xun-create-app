var express = require("express");
var multer = require("multer");
var path = require("path");
var router = express.Router();
var fs = require("fs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var date = new Date();
    var year = date.getFullYear() + "";
    var month = date.getMonth() + 1 + "";
    month = month[1] ? month : "0" + month;

    // 创建上传保存目录
    var uploadYearDir = path.join("public/uploads", year);
    var uploadMonthDir = path.join("public/uploads", year, month);
    fs.mkdir(uploadYearDir, (err) => {
      fs.mkdir(uploadMonthDir, (err) => {
        cb(null, uploadMonthDir);
      });
    });

    req.uploadDir = uploadMonthDir;
  },
  filename: function (req, file, cb) {
    var originalname = file.originalname;
    var destination = path.resolve(req.uploadDir, originalname);
    fs.access(destination, (err) => {
      if (err) {
        cb(null, originalname);
      } else {
        var name = path.parse(originalname).name;
        var ext = path.parse(originalname).ext;
        var timestamp = Date.now();
        var filename = name + "-" + timestamp + "" + ext;
        cb(null, filename);
      }
    });
  },
});
var upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    file.originalname = file.originalname.toLowerCase();
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return cb(new Error("only png/jpg/jpeg files are allowed!"), false);
    }
    cb(null, true);
  },
});

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/uploads", function (req, res, next) {
  res.render("uploads", { urls: [] });
});

router.post("/uploads", upload.array("photos"), function (req, res, next) {
  var urls = [];
  req.files.map(function (file, index) {
    urls.push(file.path.replace('public',''));
  });
  res.json({ status: 1, message: "ok", data: urls });
});

module.exports = router;

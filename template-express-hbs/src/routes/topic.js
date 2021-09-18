const express = require("express");
const router = express.Router();
const axios = require("axios");

/* GET topic page. */
router.get("/", async function (req, res, next) {
  const result = await axios.get("https://cnodejs.org/api/v1/topics");
  const { success, data } = result.data;
  const topics = success ? data : [];
  res.render("topic/index", { title: "Topic Page", topics: topics });
});

router.get("/:id", async function (req, res, next) {
  const { id } = req.params;
  const result = await axios.get(`https://cnodejs.org/api/v1/topic/${id}`);
  const { success, data } = result.data;
  const topic = success ? data : null;
  res.render("topic/detail", { title: "Topic Page", topic: topic });
});

module.exports = router;

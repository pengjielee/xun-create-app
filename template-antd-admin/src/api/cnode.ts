import fetch from "@/utils/fetch";

export const getTopics = (params) =>
  fetch({
    url: "https://cnodejs.org/api/v1/topics",
    params,
  });

export const getTopicById = (id) =>
  fetch({
    url: `https://cnodejs.org/api/v1/topic/${id}`,
  });

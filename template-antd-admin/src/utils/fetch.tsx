import axios from "axios";
import { message, notification } from "antd";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const service = axios.create({
  baseURL: "/",
  timeout: 30000,
  cancelToken: source.token,
  headers: {
    "Cache-Control": "no-cache",
  },
});

service.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error.response && error.response.status == 601) {
      message.error("登录失效，请重新登录");
    }
    if (error.response && error.response.status === 500) {
      const url = error.response.data && error.response.data.url;
      notification.error({
        message: "接口错误",
        description: `接口：${url}`,
        duration: null,
      });
    }
    if (error.response && error.response.status === 611) {
      const url = error.response.data && error.response.data.url;
      notification.error({
        message: "接口无权限",
        description: `接口：${url}`,
        duration: null,
      });
    }
    return Promise.reject(error.response ? error.response.data : {});
  }
);

export default service;

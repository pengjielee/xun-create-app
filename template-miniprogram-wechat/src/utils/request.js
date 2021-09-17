import { getCurrentPageRoute } from './utils';

const token = '';

const loginPageRoute = 'pages/login/index';

export const request = (options) => {
  const self = this;
  const token = getToken();

  let { url, method, data, header } = options;

  method = method || 'GET';
  header = Object.assign(
    {},
    {
      'Content-Type': 'application/json',
      cookie: `z=${token}`,
    },
    header,
  );

  return new Promise((resolve, reject) => {
    wx.request({
      url: `${getBaseUrl()}/${url}`,
      data,
      method,
      header,
      success(res) {
        const currentPageRoute = getCurrentPageRoute();
        if (res.statusCode === 601 && currentPageRoute !== loginPageRoute) {
          wx.showToast({
            icon: 'none',
            title: '登录已过期',
            duration: 1000,
            complete: () => {
              setTimeout(() => {
                wx.navigateTo({
                  url: `/${loginPageRoute}`,
                });
              }, 1000);
            },
          });
        } else {
          resolve(res);
        }
      },
      fail() {
        wx.showToast({
          title: '出错了',
          icon: 'none',
          duration: 2000,
        });
      },
    });
  });
};

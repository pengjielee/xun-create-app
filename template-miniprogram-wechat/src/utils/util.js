export const formatTime = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second]
    .map(formatNumber)
    .join(':')}`;
};

export const formatNumber = (n) => {
  n = n.toString();
  return n[1] ? n : `0${n}`;
};

export const getCurrentPageRoute = () => {
  let pages = getCurrentPages();

  return pages.length ? pages[pages.length - 1].route : 'pages/home/index';
};

export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const splitNumber = (number) => {
  var result = [];
  var revArr = String(number).split('').reverse(); //整数部分倒序
  revArr.forEach(function (item, index) {
    result.push(item);
    if ((index + 1) % 3 === 0 && index != revArr.length - 1) {
      result.push(',');
    }
  });
  return result.reverse().join('');
};

export const accountInfo = wx.getAccountInfoSync();

// 设备信息
export const systemInfo = wx.getSystemInfoSync() || {};

// check isQyWechat
export const isQyWechat = !!(systemInfo.environment === 'wxwork');

// 环境： wxwork | develop | trial | release
export const env = isQyWechat ? 'wxwork' : accountInfo.miniProgram.envVersion;

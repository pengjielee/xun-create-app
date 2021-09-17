// app.js
App({
  require: function ($uri) {
    return require($uri);
  },

  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    // 登录
    wx.login({
      success: (res) => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    });

    const systemInfo = wx.getSystemInfoSync();
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    // 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
    this.globalData.navBarHeight =
      (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 +
      menuButtonInfo.height +
      systemInfo.statusBarHeight;
    this.globalData.menuButtonWidth = menuButtonInfo.width;
    this.globalData.menuButtonHeight = menuButtonInfo.height;
    this.globalData.menuButtonRight = systemInfo.screenWidth - menuButtonInfo.right;
    this.globalData.menuButtonTop = menuButtonInfo.top;
  },
  globalData: {
    userInfo: null,
    navBarHeight: 0, //导航栏高度
    menuButtonTop: 0, //胶囊按钮距顶部的距离
    menuButtonRight: 0, //胶囊按钮距右边的距离
    menuButtonWidth: 0, //胶囊按钮宽度
    menuButtonHeight: 0, //胶囊按钮高度
  },
});

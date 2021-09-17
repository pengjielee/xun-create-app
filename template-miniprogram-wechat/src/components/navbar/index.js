const app = getApp();

// src/components/navbar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String, //页面title
    background: {
      type: String,
      value: '#fff',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  lifetimes: {
    attached: function () {
      this.setData({
        navBarHeight: app.globalData.navBarHeight, //导航栏高度
        navBarTop: app.globalData.menuButtonTop + 5, //胶囊按钮与顶部的距离
      });
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {},
});

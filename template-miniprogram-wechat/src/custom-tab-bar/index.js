// custom-tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    selected: 0,
    color: '#31373F',
    selectedColor: '#F22D50',
    list: [
      {
        pagePath: '/pages/home/index',
        iconPath: '../assets/icons/tabbar-home.png',
        selectedIconPath: '../assets/icons/tabbar-home-active.png',
        text: '首页',
        icon: 'icon-home',
      },
      {
        pagePath: '/pages/mine/index',
        iconPath: '../assets/icons/tabbar-mine.png',
        selectedIconPath: '../assets/icons/tabbar-mine-active.png',
        text: '我的',
        icon: 'icon-mine',
      },
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      wx.switchTab({ url });
      this.setData({
        selected: data.index,
      });
    },
  },
});

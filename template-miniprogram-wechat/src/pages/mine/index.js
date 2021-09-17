// src/pages/about/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1,
      });
    }
    this.dialog = this.selectComponent('#dialog');
  },

  handleJumpToLogsPage: function () {
    wx.navigateTo({
      url: '/pages/logs/index',
    });
  },

  handleOpenDialog: function () {
    this.dialog.setData({
      title: '提示',
      content: `由于您的恶意操作，现对您的账号积分进行冻结，如有问题请联系我们：400-662-5588`,
      confirmText: '知道啦',
    });
    this.dialog.show();
  },

  onDialogConfirm: function () {
    this.dialog.hide();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});

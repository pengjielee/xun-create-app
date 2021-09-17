// src/components/alert/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: 'alert',
    },
    title: {
      type: String,
      value: '弹窗标题',
    },
    content: {
      type: String,
      value: '弹窗内容',
    },
    confirmText: {
      type: String,
      value: '确定',
    },
    cancelText: {
      type: String,
      value: '取消',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    visible: false,
    showCancelButton: false,
  },

  observers: {
    type: function (type) {
      this.setData({
        showCancelButton: type === 'confirm',
      });
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    show() {
      this.setData({
        visible: true,
      });
    },
    hide() {
      this.setData({
        visible: false,
      });
    },
    _cancelEvent() {
      //触发取消回调
      this.triggerEvent('cancelEvent');
    },
    _confirmEvent() {
      //触发成功回调
      this.triggerEvent('confirmEvent');
    },
  },
});

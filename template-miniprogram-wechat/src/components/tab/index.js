// src/components/tab/index.js
Component({
  relations: {
    '../tabs/index': {
      type: 'parent', // 关联的目标节点应为父节点
    },
  },

  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    visiable: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _setVisible: function (flag) {
      if (flag) {
        this.setData({
          visiable: true,
        });
      } else {
        this.setData({
          visiable: false,
        });
      }
    },
  },
});

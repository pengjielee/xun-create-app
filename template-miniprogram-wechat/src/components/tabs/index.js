// src/components/tabs/index.js

const path = `../tab/index`;

Component({
  externalClasses: ['panda-tabnav'],

  relations: {
    [path]: {
      type: 'child', // 关联的目标节点应为子节点
    },
  },
  /**
   * 组件的属性列表
   */
  properties: {
    active: {
      type: Number,
      value: 0,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    titles: [],
    currentIndex: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event) {
      let { currentIndex } = this.data;
      let { index } = event.currentTarget.dataset;

      if (currentIndex == index) {
        return;
      }
      currentIndex = index;
      let nodes = this.getRelationNodes(path);
      nodes.map((node, index) => {
        nodes[index]._setVisible(currentIndex == index);
      });
      currentIndex = index;

      this.setData({
        currentIndex: currentIndex,
      });

      this.triggerEvent('change', { currentIndex });
    },
    _getTabs: function () {
      const { active } = this.properties;
      let { currentIndex } = this.data;
      const nodes = this.getRelationNodes(path);
      const titles = [];

      nodes.forEach((node, index) => {
        if (index === active) {
          currentIndex = index;
          node._setVisible(true);
        }
        titles.push(node.data.title);
      });

      this.setData({
        titles: titles,
        currentIndex: currentIndex,
      });
    },
  },

  ready: function () {
    this._getTabs();
  },
});

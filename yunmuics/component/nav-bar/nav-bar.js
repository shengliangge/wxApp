// component/nav-bar/nav-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    statusBarColor: {
      type: String,
      value: '#fff'
    },
    navBarColor: {
      type: String,
      value: '#fff'
    },
    titleColor: {
      type: String,
      value: '#000'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarStyle: "",
    navBarStyle: "",
    topHeight: 50
  },

  lifetimes: {
    attached: function () {
      // console.log(this.data.navBarColor)
      console.log(123)
      let navBarStyle = `background-color:${this.data.navBarColor};
      height:${wx.db.navBarHeight}px;
      color:${this.data.titleColor};`


      let statusBarStyle = `background-color:${this.data.statusBarColor};
      height:${wx.db.statusBarHeight}px;`
      let topHeight = wx.db.navBarHeight + wx.db.statusBarHeight
      this.setData({
        navBarStyle,
        statusBarStyle,
        topHeight
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    back: function () {
      wx: wx.navigateBack({
        delta: 1
      });
    },

  }
})

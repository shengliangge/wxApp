//app.js
App({
  onLaunch: function (options) {
    // 获取手机系统信息
    wx.getSystemInfo({
      success: res => {
        //导航高度
        this.globalData.navHeight = res.statusBarHeight + 20;//  46是我为我的头部定义的一个高度，
        console.log(res,this.globalData.navHeight)
      }, fail(err) {
        console.log(err);
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
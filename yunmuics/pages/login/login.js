// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    pwd: '',
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  searchBox: function (e) {
    // console.log(e)
    const that = this;
    that.setData({
      username: e.detail.value.username,
      pwd: e.detail.value.pwd
    })
    wx.request({
      url: 'http://musicapi.leanapp.cn/login/cellphone', //登陆接口
      data: {
        phone: this.data.username,
        password: this.data.pwd
      },
      header: {
        "Content-Type": "application/json"
      },
      //成功回调函数 成功 200
      success: (res) => {
        console.log(res)
        app.globalData.userInfo = res;  //将用户信息传给全局用户信息中
        // 跳转页面
        wx.navigateTo({
          url: `../find/find`
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
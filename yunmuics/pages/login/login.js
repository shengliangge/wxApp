// pages/login/login.js
const $api = require('../../utils/api.js').API;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoFocus: true,
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
    const that = this;
    that.setData({
      username: e.detail.value.username,
      pwd: e.detail.value.pwd
    })
    this.login()
  },
  login() {
    let msg = '登陆错误'
    $api.login({
      phone: this.data.username,
      password: this.data.pwd
    }).then(res => {
      let code = res.data.code   //状态码
      msg = res.data.msg   //登陆信息
      if (code === 200) {    //如果登陆成功
        wx.setStorageSync("userId", res.data.account.id);
        app.globalData.userId = res.data.account.id;  //将用户id传给全局中
        // 保存cookie登陆信息到Storage
        this.saveUserLoginInfo(res.cookies)
        app.globalData.navId = 1
        wx.redirectTo({ // 跳转到首页
          url: `../mine/mine`
        })
      } else {   //出错，打印错误信息
        wx.showToast({
          title: msg,
          icon: 'none',
          mask: true,
          duration: 2000
        })
        //输入框获得焦点
        this.setData({
          pwdAutoFocus: true
        })
      }
    })
      .catch(err => {
        //请求失败
      })
  },
  // 保存用户登陆凭证方法
  saveUserLoginInfo: function (cookies) {
    // console.log(cookies)
    for (let i = 0; i < cookies.length; i++) {
      //判断当前项前缀是否是 "MUSIC_U="
      if (cookies[i].search("MUSIC_U=") != -1) {
        //找到了之后，保存到本地
        wx.setStorageSync("login_token", cookies[i]);
      console.log(wx.getStorageSync("login_token"));
        app.globalData.login_token = cookies[i];
      }
    }
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
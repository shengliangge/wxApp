// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoFocus:true,
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
        let code = res.data.code   //状态码
        let msg=res.data.msg   //登陆信息
        console.log(code)
        //登陆成功
        if (code === 200) {    //如果登陆
          app.globalData.userInfo = res;  //将用户信息传给全局用户信息中
          // console.log(res.cookies)
          // 保存cookie登陆信息到Storage
          this.saveUserLoginInfo(res.cookies) // 跳转到首页
          wx.navigateTo({
            url: `../find/find`
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
           pwdAutoFocus:true
          })
        } 
      }
    })
  },
  // 保存用户登陆凭证方法
  saveUserLoginInfo: function (cookies) {
    // console.log(cookies)
    for (let i = 0; i < cookies.length; i++) {
      //判断当前项前缀是否是 "MUSIC_U="
      if (cookies[i].search("MUSIC_U=") != -1) {
        //找到了之后，将其wx.setStorage，保存到本地
        // console.log(cookies[i])
        wx.setStorage({//存储到本地
          key: "login_token",
          data: cookies[i]
        })
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
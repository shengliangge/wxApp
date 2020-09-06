const $api = require('../../utils/api.js').API;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: false,  //加载是否隐藏
    userInfo: {},
    login_token: '',
    songs: [],
    month: 0,
    day: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = new Date();

    this.setData({
      month: date.getMonth() + 1,
      day: date.getDate()
    })
    // 从全局中取数据
    this.setData({
      userInfo: app.globalData.userInfo,
      login_token: app.globalData.login_token
    })
    this.getRecommendSongs()
  },
  getRecommendSongs() {
    console.log(this.data.login_token);
    $api.getRecommendSongs({
      cookie: this.data.login_token
    }).then(res => {
      //请求成功
      console.log("歌单推荐", res.data)
      this.setData({
        songs: res.data.recommend,
        hidden: true
      })
    })
  },
  //播放音乐
  playMusic: function (e) {
    console.log(e)
    // 获取音乐id
    let musicId = e.currentTarget.dataset.in.id
    // 跳转到播放页面
    wx.navigateTo({
      url: `../play/play?musicId=${musicId}`,
    })
  },
  playAll() {
    let songs = this.data.songs
    let musicId = songs[0].id
    for (let i = 1; i < songs.length; i++) {
      app.globalData.waitForPlaying.push(songs[i].id)
    }
    // 跳转到播放页面
    wx.navigateTo({
      url: `../play/play?musicId=${musicId}`,
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
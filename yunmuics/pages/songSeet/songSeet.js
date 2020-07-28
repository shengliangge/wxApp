// pages/songSeet/songSeet.js
const API = require('../../utils/api')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    songsheet: []
  },

  //获取歌单信息
  getsongsheet: function () {
    API.getsongsheet({
      type: 2
    }).then(res => {
      if (res.code === 200) { //更加严谨
        console.log(res)
        this.setData({
          songsheet: res.playlists
        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getsongsheet()
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
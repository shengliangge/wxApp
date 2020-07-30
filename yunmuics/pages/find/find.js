// pages/find/find.js
const API = require('../../utils/api')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: "true",
    indicatorActiveColor: "rgb(221,65,54)",
    indicatorColor: "rgba(0,0,0,.3)",
    autoplay: "true",
    interval: "5000",
    duration: "1000",
    circular: "true",
    banners: [],
    recommendList: [],
    blocks: [],
    songsheet: []
  },
  tosongSheet: function () {
    console.log("点击")
    wx.navigateTo({
      url: '../songSeet/songSeet'
    })
  },
  //获取轮播图
  getBanner: function () {
    API.getBanner({
      type: 2
    }).then(res => {
      if (res.code === 200) { //更加严谨
        // console.log(res)
        this.setData({
          banners: res.banners
        })
      }
    })
  },
  playMusic: function (e) {
    // console.log(e.currentTarget.dataset.in.id)
    let musicId = e.currentTarget.dataset.in.id
    wx.navigateTo({
      url: `../play/play?musicId=${musicId}`,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  // 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getsongsheet()//查看数据使用
    this.getBanner()
    wx.request({
      url: 'https://music.163.com/api/homepage/block/page', //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        "Content-Type": "application/json"
      },
      //成功回调函数 成功 200
      success: (res) => {
        // console.log(res)
        this.setData({
          blocks: res.data.data.blocks
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
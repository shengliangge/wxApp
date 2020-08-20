// pages/find/find-page/rankingList/rankingList.js
// const API = require('../../toplist/detail')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    officialList: [],
    moreList: [],

    list: [],
    rank: [
      {
        img: 'https://p2.music.126.net/c0iThrYPpnFVgFvU6JCVXQ==/109951164091703579.jpg',
        date: '每周四更新',
        listname: '云音乐欧美热歌榜',
      },
      {
        img: 'https://p2.music.126.net/WTpbsVfxeB6qDs_3_rnQtg==/109951163601178881.jpg',
        date: '每周一更新',
        listname: 'iTunes榜',
      },
      {
        img: 'https://p2.music.126.net/Zb8AL5xdl9-_7WIyAhRLbw==/109951164091690485.jpg',
        date: '每天更新',
        listname: '云音乐欧美新歌榜',
      }
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.request({
      url:'http://neteasecloudmusicapi.zhaoboy.com/toplist/detail',
      data: {
      },
      header: {
        "Content-Type": "application/json"
      },
      success: (res) => {
        const oList = res.data.list.filter(item => item.tracks.length
        )
        console.log(oList)
        const mList =  res.data.list.filter( item => !item.tracks.length
        )

        

        this.setData({
          officialList:oList,
          moreList:mList,
          list: res.data.list
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
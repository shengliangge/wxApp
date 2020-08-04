// pages/search/search.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hots: [],
    detail: [
      {
        hot: 'HOT'
      }
    ],
    // list: [
    //   {
    //     name: '爸爸妈妈',
    //     hot: 'HOT',
    //     num: '2258',
    //     des: '别忘了把爱留给爸妈一份'
    //   }
    // ],
    his: [
      {
        name:'del'
      },
      {
        name:'周杰伦'
      },
      {
        name:'天外来物'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.request({
    url: 'http://neteasecloudmusicapi.zhaoboy.com/search/hot/detail',
    data: {
    },
    header: {
      "Content-Type": "application/json"
    },
    success: (res) => {
      console.log(res)
      this.setData({
        hots: res.data.result.hots
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
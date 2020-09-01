const API = require('../../utils/req')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: false,  //加载是否隐藏
    songSheet: [],
    swiperIdx: 0
  },
  bindChange(e) {
    this.setData({
      swiperIdx: e.detail.current
    })
  },
  //获取歌单信息
  getSongSheet: function () {
    API.getSongSheet({
      type: 2
    }).then(res => {
      if (res.code === 200) { //更加严谨
        console.log(res)
        this.setData({
          songSheet: res.playlists,
          hidden:true
        })

      }
    })
  },
  gotoSongList(e) {
    //获取页面传递的歌单id
    let listId = e.currentTarget.dataset.id
    // console.log(listId)
    wx.navigateTo({
      url: `../songList/songList?listId=${listId}`,
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSongSheet()
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
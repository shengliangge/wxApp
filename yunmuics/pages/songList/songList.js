const $api = require('../../utils/api.js').API;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: false,  //加载是否隐藏
    detail: [
      {
        img: '../../image/songList_message.png',
        name: '19万',
      },
      {
        img: '../../image/songList_share.png',
        name: '8870',
      },
      {
        img: '../../image/songList_download.png',
        name: '下载',
      },
      {
        img: '../../image/songList_choose.png',
        name: '多选',
      }
    ],
    userInfo: {},
    login_token: '',
    songs: [],
    playlist: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    //接受其他页面传来的数据
    let listId = options.listId
    if (Object.keys(this.data.playlist).length == 0)
    this.getPlaylistDetail(listId)
  },
  getPlaylistDetail(listId) {
    $api.getPlaylistDetail({ id: listId }).then(res => {
      this.setData({
        playlist: res.data.playlist,
        hidden: true
      })
    })
  },
  //播放音乐
  playMusic(e) {
    console.log(e)
    // 获取音乐id
    let musicId = e.currentTarget.dataset.in.id
    // 跳转到播放页面
    wx.navigateTo({
      url: `../play/play?musicId=${musicId}`,
    })
  },
  playAll() {
    let playlist = this.data.playlist.tracks
    console.log(playlist);
    let musicId = playlist[0].id
    for (let i = 1; i < playlist.length; i++) {
      app.globalData.waitForPlaying.push(playlist[i].id)
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
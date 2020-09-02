const API = require('../../utils/req');
const $api = require('../../utils/api.js').API;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: false,  //加载是否隐藏
    songSheet: [],
    PlaylistAll: [],   //歌单分类
    category: [], //歌单大类别
    PlaylistHot: [],//热门歌单类别
    swiperIdx: 0,
    choiceIndex: 0
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    this.getPlaylistAll()
    this.getSongSheet()
    this.getPlaylistHot()   //获取热门分类
  },

  bindChange(e) {
    this.setData({
      swiperIdx: e.detail.current
    })
  },

  getSongSheet: function () {  //获取歌单信息
    API.getSongSheet({
      type: 2
    }).then(res => {
      if (res.code === 200) { //更加严谨
        console.log(res)
        this.setData({
          songSheet: res.playlists,
          hidden: true
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

  getPlaylistAll() {     //获取全部歌单分类
    $api.getPlaylistAll().then(res => {
      //请求成功
      // console.log(res);
      this.setData({
        PlaylistAll: res.data.sub,     //歌单分类
        category: res.data.categories    //大类别
      })
    })
      .catch(err => {
        // that.tips('服务器正忙~~', '确定', false)        //请求失败
      })
  },
  getPlaylistHot() {
    $api.getPlaylistHot().then(res => {
      console.log(res);
      let PlayListHot = res.data.tags;
      PlayListHot.unshift({ name: '推荐' })
      this.setData({
        PlaylistHot: PlayListHot
      })
    })
  },
  
  choice(e) {
    // console.log(e.currentTarget.dataset.index);
    this.setData({
      choiceIndex: e.currentTarget.dataset.index
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
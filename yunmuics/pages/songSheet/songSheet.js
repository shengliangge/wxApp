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
    choiceIndex: 0,
    categoryName: '全部',
    offset: 0    // offset偏移量，用于分页
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    if (this.data.PlaylistAll.length == 0) {
      this.getPlaylistAll()
    }
    if (this.data.songSheet.length == 0||this.data.category.length==0) {
      this.getPlaylist()
    }
    if (this.data.PlaylistHot.length == 0) {
      this.getPlaylistHot()   //获取热门分类
    }
  },

  bindChange(e) {
    this.setData({
      swiperIdx: e.detail.current
    })
  },

  getPlaylist: function () {  //获取歌单信息
    $api.getPlaylist({ limit: 27, cat: this.data.categoryName, offset: this.data.offset }).then(res => {
      this.setData({
        songSheet: res.data.playlists,
        hidden: true
      })
    })
  },
  gotoSongList(e) {
    //获取页面传递的歌单id
    let listId = e.currentTarget.dataset.id
    // console.log(listId)
    wx.navigateTo({
      url: `../songList/songList?listId=${listId}`
    })
  },

  getPlaylistAll() {     //获取全部歌单分类
    $api.getPlaylistAll().then(res => {
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
      // console.log(res);
      let PlayListHot = res.data.tags;
      PlayListHot.unshift({ name: '全部' })
      this.setData({
        PlaylistHot: PlayListHot
      })
    })
  },

  choice(e) {
    this.setData({
      offset: 0,//重置为0
      categoryName: e.currentTarget.dataset.category,//类别名
      choiceIndex: e.currentTarget.dataset.index    // 改变选中的类别样式
    })
    this.getPlaylist()
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
    console.log('刷新');
    this.setData({
      hidden: false,
      offset: this.data.offset + 27
    })
    this.getPlaylist()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      hidden: false,
      offset: this.data.offset + 27
    })
    $api.getPlaylist({ limit: 27, cat: this.data.categoryName, offset: this.data.offset }).then(res => {
      let playlists = this.data.songSheet
      playlists.push(...res.data.playlists);
      this.setData({
        songSheet: playlists,
        hidden: true
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
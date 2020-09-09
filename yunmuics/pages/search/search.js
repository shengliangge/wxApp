
const $api = require('../../utils/api.js').API;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: null,//输入框输入的值
    history: [], //搜索历史存放数组
    searchSuggest: [], //搜索建议
    showView: true,//组件的显示与隐藏
    showSongResult: true,
    searchResult: [],//搜索结果
    searchKey: [],
    showSearchResult: true,
    showClean: true,
    hots: [], //热门搜索
    detail: [
      {
        hot: 'HOT'
      }
    ],
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
        // console.log(res)
        this.setData({
          hots: res.data.result.hots
        })
      }
    })
  },

  // 点x将输入框的内容清空
  clearInput: function (e) {
    // console.log('a')
    this.setData({
      inputValue: '',
      showSongResult: false
    })
  },

  //实现直接返回返回上一页的功能，退出搜索界面
  back: function () {
    wx: wx.navigateBack({
      delta: 0
    });
  },

  // 跳转到歌手排行界面
  singerPage: function () {
    // console.log('a')
    wx.navigateTo({
      url: `../singer/singer`
    })
  },

  //获取input文本并且实时搜索
  getSearchKey: function (e) {
    if(e.detail.cursor === 0){
      this.setData({
        showSongResult: false
      })
      return
    }
    // console.log(e.detail) //打印出输入框的值
    if (e.detail.cursor != this.data.cursor) { //实时获取输入框的值
      this.setData({
        showSongResult: true,
        searchKey: e.detail.value
      })
      this.searchSuggest();
    }
    if (e.detail.value) { // 当input框有值时，才显示清除按钮'x'
      this.setData({
        showClean: false  // 出现清除按钮
      })
    }
  },

  // 搜索建议
  searchSuggest() {
    $api. getSearchSuggest({ keywords: this.data.searchKey, type: 'mobile' }).then(res => {
      //请求成功 
      // console.log(res);
      if(res.statusCode === 200){
        this.setData({
          searchSuggest: res.data.result.allMatch 
        })
       }
    })
    .catch(err => {
      //请求失败
      console.log('错误')
    })
  },

  // 搜索结果
  searchResult: function () {
    // console.log(this.data.searchKey)
    $api.getSearchResult({ keywords: this.data.searchKey, type: 1, limit: 100, offset: 2 }).then(res => {
      // 请求成功
      if (res.statusCode === 200) {
        this.setData({
          searchResult: res.data.result.songs,
          showSearchResult: false,
          showView: false,
        });
      }
    })
    .catch(ree => {
      //请求失败
    })
  },

  handlePlayAudio: function (e) { //event 对象，自带，点击事件后触发，event有type,target，timeStamp，currentTarget属性
    // console.log(e)
    const musicId = e.currentTarget.dataset.id; //获取到event里面的歌曲id赋值给musicId
    wx.navigateTo({                                 //获取到musicId带着完整url后跳转到play页面
      url: `../play/play?musicId=${musicId}`
    })
  },

  // input失去焦点函数
  routeSearchResPage: function (e) {
    if (this.data.searchKey.length > 0) {  // 当搜索框有值的情况下才把搜索值存放到历史中，避免将空值存入历史记录
      let history = wx.getStorageSync("history") || [];
      history = history.filter(item => item !== this.data.searchKey)  // 历史去重
      history.unshift(this.data.searchKey)
      wx.setStorageSync("history", history);
    }
  },

  // 清空page对象data的history数组 重置缓存为[]（空）
  clearHistory: function () {
    const that = this;
    wx.showModal({
      content: '确认清空全部历史记录',
      cancelColor: '#DE655C',
      confirmColor: '#DE655C',
      success(res) {
        if (res.confirm) {
          that.setData({
            history: []
          })
          wx.setStorageSync("history", []) //把空数组给history,即清空历史记录
        } else if (res.cancel) {
        }
      }
    })
  },

    // 搜索完成后(点击搜索建议的某一条即出搜索结果，搜索完成)
  searchOver: function () {
    this.setData({
      showSongResult: false  // 搜索建议这块容器消失
    })
    this.searchResult();  // 执行搜索结果
  },

  // 点击热门搜索值或搜索历史，填入搜索框
  fill_value: function (e) {
    this.setData({
      searchKey: e.currentTarget.dataset.value,//点击=把值给searchKey,让他去搜索
      inputValue: e.currentTarget.dataset.value,//在输入框显示内容
      showSongResult: false, //给false值，隐藏搜索建议页面
    })
    this.searchResult(); //执行搜索功能
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  //每次显示变动就去获取缓存，给history，并for出来。
  onShow: function () {
    // console.log('a')
    this.setData({
      history: wx.getStorageSync("history") || []
    })
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
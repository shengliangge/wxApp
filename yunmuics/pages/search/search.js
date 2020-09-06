// pages/search/search.js
const API = require('../../utils/api')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: null,//输入框输入的值
    history:[], //搜索历史存放数组
    searchSuggest:[], //搜索建议
    showView: true,//组件的显示与隐藏
    showSongResult:true,
    searchResult:[],//搜索结果
    searchKey:[],
    showSearchResult: true,
    showClean: true,
    hots: [],
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
        console.log(res)
        this.setData({
          hots: res.data.result.hots
        })
      }
    })
  },


 
  
  
  

 // 搜索建议
searchSuggest(){
  API.searchSuggest({ keywords: this.data.searchKey ,type:'mobile'}).then(res=>{
    if(res.code === 200){
      console.log(res)
      this.setData({
        searchSuggest:res.result.allMatch
      })
    }
  })
},


  //获取input文本并且实时搜索
  getSearchKey:function(e){
    console.log(e.detail.value) //打印出输入框的值
    let that = this;
    if(e.detail.cursor != that.data.cursor){ //实时获取输入框的值
      that.setData({
        searchKey: e.detail.value
      })
    }
    if(e.value!=""){ //组件的显示与隐藏
      that.setData({
        showView: false
      })
    } else{
      that.setData({
        showView: ""
      })
    }
    if(e.detail.value!=""){ //解决 如果输入框的值为空时，传值给搜索建议，会报错的bug
      that.searchSuggest();
    }  
    if(e.detail.value) {
      showClean: false
    }
  },
 
  // 实现点击输入框的×把输入的内容清空
  clearInput: function(e){
    console.log('a')
    this.setData({
      inputValue: ''
    })
  },
  
  
  //实现直接返回返回上一页的功能，退出搜索界面
  back: function () {
    wx: wx.navigateBack({
      delta: 0
    });
  },


  // 搜索结果
  searchResult: function(e) {
    console.log(this.data.searchKey)
    API.searchResult({ keywords: this.data.searchKey, type: 1, limit: 100, offset:2 }).then(res => {
      if (res.code === 200) {
        this.setData({
          searchResult: res.result.songs,
          showSearchResult: false
        })
      }
    })
  },

// 输入后确定进行搜索（回车或点击需要的那个搜索结果）
  searchOver:function(){
    let that = this;
    that.setData({
      showSongResult: false
    })
    that.searchResult();
  },

   // input失去焦点函数
   routeSearchResPage: function(e) {
    console.log(e.detail.value)
    let history = wx.getStorageSync("history") || [];
    history.push(this.data.searchKey)
    wx.setStorageSync("history", history);
  },

  // 清空page对象data的history数组 重置缓存为[]
  clearHistory: function() {
    const that = this;
    wx.showModal({
      content: '确认清空全部历史记录',
      cancelColor:'#DE655C',
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

  singerPage: function() {
    // console.log('a')
    wx.navigateTo({
      url: `../singer/singer`
    })
  },


  handlePlayAudio: function (event) { //event 对象，自带，点击事件后触发，event有type,target，timeStamp，currentTarget属性
    console.log(event)
    const musicId = event.currentTarget.dataset.id; //获取到event里面的歌曲id赋值给musicId
    wx.navigateTo({                                 //获取到musicId带着完整url后跳转到play页面
      url: `../play/play?musicId=${musicId}`
    })
  },


  // 点击热门搜索值或搜索历史，填入搜索框
  fill_value: function(e){
    console.log(e)
    let that = this;
    console.log(this.data.history)
    console.log(e.currentTarget.dataset.value)
    that.setData({
      searchKey: e.currentTarget.dataset.value,//点击吧=把值给searchKey,让他去搜索
      inputValue: e.currentTarget.dataset.value,//在输入框显示内容
      showView:false,//给false值，隐藏 热搜和历史 界面
      showSongResult: false, //给false值，隐藏搜索建议页面
    })
    that.searchResult(); //执行搜索功能
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
    console.log('a')
    this.setData({
      history: wx.getStorageSync("history") || [],
      showClean: false
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
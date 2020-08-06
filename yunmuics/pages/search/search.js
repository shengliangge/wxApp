// pages/search/search.js
const API = require('../../utils/api')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotsongs: [],//获取热门搜索
    inputValue: null,//输入框输入的值
    history:[], //搜索历史存放数组
    searchsuggest:[], //搜索建议
    showView: true,//组件的显示与隐藏
    showsongresult:true,
    searchresult:[],//搜索结果
    searchKey:[],
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
    // wx.request({
    //   url: 'http://neteasecloudmusicapi.zhaoboy.com/search/suggest?keywords= 海阔天空',
    //   data: {
    //   },
    //   header: {
    //     "Content-Type": "application/json"
    //   },
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })

  },

 
  
  
  

 // 搜索建议
searchSuggest(){
  API.searchSuggest({ keywords: this.data.searchKey ,type:'mobile'}).then(res=>{
    if(res.code === 200){
      console.log(res)
      this.setData({
        searchsuggest:res.result.allMatch
      })
    }
  })
},



  getsearchKey:function(e){
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
  },
  // 实现点击输入框的×把输入的内容清空
  clearInput:function(res){
    this.setData({
      inputValue: ''
    })
  },
  
  //实现直接返回返回上一页的功能，退出搜索界面
  cancel: function () {
    wx.switchTab({
      url: ''
    })
  },


  
  // 搜索建议
  // searchSuggest(){
  //   API.searchSuggest({ keywords: this.data.searchKey ,type:'mobile'}).then(res=>{
  //     console.log(res);
  //     if(res.code === 200){
  //       this.setData({
  //         searchsuggest:res.result.allMatch
  //       })
  //     }
  //   })
  // },

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
//find页面
const API = require('../../utils/api')
const app = getApp();
Page({
  // 页面的初始数据
  data: {
    //入口图标
    entryIcon: [
      {
        title: "每日推荐",
        imgUrl: "./img/每日推荐.png",
        gotoUrl: "../recommend/recommend"
      },
      {
        title: "歌单",
        imgUrl: "./img/歌单.png",
        gotoUrl: "../songSheet/songSheet"
      },
      {
        title: "排行榜",
        imgUrl: "./img/排行榜.png",
        gotoUrl: "../rankingList/rankingList"
      },
      {
        title: "电台",
        imgUrl: "./img/电台.png"
      },
      {
        title: "直播",
        imgUrl: "./img/直播.png"
      },
      {
        title: "火前留名",
        imgUrl: "./img/火前留名.png"
      },
      {
        title: "数字专辑",
        imgUrl: "./img/数字专辑.png"
      },
      {
        title: "唱聊",
        imgUrl: "./img/唱聊.png"
      },
      {
        title: "线上演出",
        imgUrl: "./img/线上演出.png"
      },
    ],
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
    songsheet: [],
    boll: [],
    userInfo: {},
    login_token: ""
  },
  //首页跳转到相应的入口页面
  toSongSheet: function (e) {
    // console.log(e)
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },
  findMore: function (e) {
    let index = e.currentTarget.dataset.index
    let urlStr = ''
    if (index == 0) {
      urlStr = '../songSheet/songSheet'
    }
    wx.navigateTo({
      url: urlStr
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
  //播放音乐
  playMusic: function (e) {
    // console.log(e.currentTarget.dataset.in.id)
    // 获取音乐id
    let musicId = e.currentTarget.dataset.in.id
    // 跳转到播放页面
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
    wx.getStorage({
      key: 'login_token',
      success: (result) => {
        // console.log("获取的login",result)
        this.setData({
          login_token: result.data
        })
      },
    });

    this.setData({
      userInfo: app.globalData.userInfo,
      login_token: app.globalData.login_token
    })
    console.log(this.data.userInfo)
    //获取轮播图
    this.getBanner()
    //获取首页数据
    wx.request({
      url: 'https://music.163.com/api/homepage/block/page',
      data: {
        refresh: true
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
    console.log("输出的token")
    console.log(this.data.login_token)

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
    let time_stamp = Date.parse(new Date());
    console.log('时间戳' + time_stamp)
    console.log("刷新")
    wx.request({
      url: 'https://music.163.com/api/homepage/block/page', //仅为示例，并非真实的接口地址
      data: {
        timestamp: time_stamp  //加上时间戳，更新请求
      },
      header: {
        "Content-Type": "application/json"
      },
      //成功回调函数 成功 200
      success: (res) => {
        console.log(res)
        this.setData({
          blocks: res.data.data.blocks
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("触底")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
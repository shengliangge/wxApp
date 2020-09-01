//find页面
const API = require('../../utils/req')
const app = getApp();
Page({
  // 页面的初始数据
  data: {
    hidden: false,  //加载是否隐藏
    //入口图标
    entryIcon: [
      {
        title: "每日推荐",
        imgUrl: "../../image/find_recommend.png",
        gotoUrl: "../recommend/recommend"
      },
      {
        title: "歌单",
        imgUrl: "../../image/find_songSheet.png",
        gotoUrl: "../songSheet/songSheet"
      },
      {
        title: "排行榜",
        imgUrl: "../../image/find_rankingList.png",
        gotoUrl: "../rankingList/rankingList"
      },
      {
        title: "电台",
        imgUrl: "../../image/find_radio.png"
      },
      {
        title: "直播",
        imgUrl: "../../image/find_broadcast.png"
      },
      {
        title: "火前留名",
        imgUrl: "../../image/find_fire.png"
      },
      {
        title: "数字专辑",
        imgUrl: "../../image/find_album.png"
      },
      {
        title: "唱聊",
        imgUrl: "../../image/find_sing.png"
      },
      {
        title: "线上演出",
        imgUrl: "../../image/find_show.png"
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
    songSheet: [],
    boll: [],
    userInfo: {},
    login_token: ""
  },
  //首页跳转到相应的入口页面
  toSongSheet: function (e) {
    let url = e.currentTarget.dataset.url//获取页面传来的url
    if (url == "../recommend/recommend" && app.globalData.login_token === '') { //每日推荐需要登陆才能使用
      wx.showToast({
        title: '未登录,请登陆后尝试！',
        icon: 'none',
        mask: true,
        duration: 2500
      })
    } else {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    }

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
    let musicId = e.currentTarget.dataset.in.id    // 获取音乐id
    // 跳转到播放页面
    wx.navigateTo({
      url: `../play/play?musicId=${musicId}`
    })
  },

  // 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
          blocks: res.data.data.blocks,
          hidden: true
        })
      }
    })
    // console.log("输出的token")
    // console.log(this.data.login_token)

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
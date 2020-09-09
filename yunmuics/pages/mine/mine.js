const $api = require('../../utils/api.js').API;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sheet: [
      {
        picture: '../../image/mine_s1.png',
        listname: '云音乐热歌榜',
        describe: '本周最热的歌曲',
      },
      {
        picture: '../../image/mine_s2.png',
        listname: '云音乐新歌榜',
        describe: '本周最火的新歌',
      },
      {
        picture: '../../image/mine_s3.png',
        listname: '甜甜的纯音乐❤❤',
        describe: '本周最热的歌曲',
      },
      {
        picture: '../../image/mine_s4.png',
        listname: '学习歌单~(超赞纯音乐!)',
        describe: '本周热门收藏',
      },
      {
        picture: '../../image/mine_s5.png',
        listname: '夏日浪漫旅行|电车沿途',
        describe: '本周热门收听',
      },
      {
        picture: '../../image/mine_s6.png',
        listname: '超好听的网络热歌❤',
        describe: '本周热门收听',
      }
    ],
    userId: {},
    login_token: '',
    playlist: [],
    user: {}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    app.globalData.userId= wx.getStorageSync("userId");
    this.verification()   //验证是否登陆
  },
  verification() {   //验证是否登陆
    let login_token = wx.getStorageSync("login_token")
    if (login_token == '') {
      this.tips('未登录,请登陆后尝试！', '去登陆', true, '/pages/login/login')
    } else {
      // 从全局中取数据
      this.setData({
        userId: app.globalData.userId,
        login_token
      })
      this.getUserDetail();
      this.getUserPlaylist();
    }

  },
  getUserDetail() {
    $api.getUserDetail({ uid: this.data.userId }).then(res => {
      //请求成功
      // console.log("用户信息详情", res.data)
      this.setData({
        user: res.data
      })
    }).catch(err => {
      //请求失败
      that.tips('服务器正忙~~', '返回', false, '/pages/find/find')
    })
  },
  getUserPlaylist() {
    $api.getUserPlaylist({
      uid: this.data.userId,
      cookie: this.data.login_token
    }).then(res => {
      //请求成功
      // console.log("用户歌单？", res.data)
      this.setData({
        playlist: res.data.playlist
      })
    }).catch(err => {
      //请求失败
      that.tips('服务器正忙~~', '返回', false, '/pages/find/find')
    })
  },
  gotoSongList(e) {   //跳转歌单页面
    let listId = e.currentTarget.dataset.id;
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
  // 提醒
  tips(content, confirmText, isShowCancel, url) {
    wx.showModal({
      content: content,
      confirmText: confirmText,
      cancelColor: '#DE655C',
      confirmColor: '#DE655C',
      showCancel: isShowCancel,
      cancelText: '取消',
      success(res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          wx.navigateTo({
            url: url
          })
        } else if (res.cancel) {
          // console.log('用户点击取消')
          wx.navigateTo({
            url: '/pages/find/find'
          })
          app.globalData.navId = 2;
        }
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
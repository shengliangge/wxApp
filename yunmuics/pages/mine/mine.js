const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    describe: [
      {
        mark: '推荐',
        pict: '../../image/mine_d1.png',
        info: '我喜欢的音乐',
        deta: '心动模式'
      },
      {
        mark: '推荐',
        pict: '../../image/mine_d2.png',
        info: '私人FM',
        deta: '超3亿人在听'
      },
      {
        mark: '推荐',
        pict: '../../image/mine_d3.png',
        info: '推歌精选',
        deta: '云贝助力好歌'
      },
      {
        mark: '推荐',
        pict: '../../image/mine_d4.png',
        info: '最嗨电台',
        deta: '专业电竞平台'
      },
      {
        mark: '推荐',
        pict: '../../image/mine_d5.png',
        info: '古典专区',
        deta: '专业古典大全'
      }
    ],
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
    userInfo: {},
    login_token: '',
    playlist: [],
    user: {}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.login_token)
    if (app.globalData.login_token == '') {
      wx.showModal({
        content: '未登录,请登陆后尝试！',
        cancelColor: '#DE655C',
        confirmColor: '#DE655C',
        showCancel: false,
        confirmText: '登陆',
        complete() {
          wx.navigateTo({
            url: '/pages/login/login'
          })
        }
      })
    } else {
      // 从全局中取数据
      this.setData({
        userInfo: app.globalData.userInfo,
        login_token: app.globalData.login_token
      })

      console.log(this.data.userInfo)

      // console.log("输出的token")
      console.log(this.data.login_token)
      console.log(this.data.userInfo.data.account.id)
      // 用户信息详情获取
      wx.request({
        url: 'http://neteasecloudmusicapi.zhaoboy.com/user/detail',
        data: {
          "uid": this.data.userInfo.data.account.id,
        },
        header: {
          "Content-Type": "application/json",
        },
        //成功回调函数 成功 200
        success: (res) => {
          console.log("mine用户信息详情成功吗？", res.data)
          this.setData({
            user: res.data
          })
        }
      })
      wx.request({
        url: 'http://neteasecloudmusicapi.zhaoboy.com/user/playlist',
        data: {
          "uid": this.data.userInfo.data.account.id,
          "cookie": this.data.login_token
        },
        header: {
          "Content-Type": "application/json",
          // "cookie": this.data.login_token
        },
        success: (res) => {
          console.log("mine用户歌单成功吗？", res.data)
          console.log(res.data.playlist)
          this.setData({
            playlist: res.data.playlist
          })
        }
      })
    }
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
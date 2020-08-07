
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: [
      {
        img: 'img/message.png',
        name: '19万',
      },
      {
        img: 'img/share.png',
        name: '8870',
      },
      {
        img: 'img/download.png',
        name: '下载',
      },
      {
        img: 'img/choose.png',
        name: '多选',
      }
    ],
    list: [
      {
        author: '薛之谦',
        name: '天外来我记那地方离开骄傲了会啊地方iOS阿Uio垃圾啊看到'
      }
    ],
    userInfo: {},
    login_token: '',
    songs: []
  },
  //播放音乐
  playMusic: function (e) {
    console.log(e)
    // 获取音乐id
    let musicId = e.currentTarget.dataset.in.id
    // 跳转到播放页面
    wx.navigateTo({
      url: `../../../play/play?musicId=${musicId}`,
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 每日推荐需要用户登陆，先判断用户是否登陆
    if (app.globalData.login_token === '') {  //用户未登录
      wx.showToast({
        title: '未登录,请登陆后尝试！',
        icon: 'none',
        mask: true,
        duration: 2500
      })
    } else {
      // 从全局中取数据
      this.setData({
        userInfo: app.globalData.userInfo,
        login_token: app.globalData.login_token
      })
      //获取推荐歌单
      wx.request({
        url: 'http://neteasecloudmusicapi.zhaoboy.com/recommend/songs',
        data: {
          "cookie": this.data.login_token
        },
        header: {
          "Content-Type": "application/json",
          "cookie": this.data.login_token
        },
        //成功回调函数 成功 200
        success: (res) => {
          console.log(res)
          console.log("find第二个歌单登陆成功吗？", res.data)
          this.setData({
            songs: res.data.recommend
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
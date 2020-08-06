// component/songList/songList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    userInfo: {},
    login_token: '',
    songs: []
  },
  lifetimes: {
    attached: function () {
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
   * 组件的方法列表
   */
  methods: {

  }
})

//app.js
App({
  onLaunch: function (options) {
    wx.db = {}
    let info = wx.getSystemInfoSync();
    wx.db.statusBarHeight = info.statusBarHeight
    // console.log(wx.db.statusBarHeight)
    if (info.platform === 'android') {
      wx.db.navBarHeight = 48
    } else {
      wx.db.navBarHeight = 44
    }
    // console.log(info.statusBarHeight)
  },

  globalData: {
    userId: 0,
    waitForPlaying: [],//等待播放歌单
    history_songId: [],//历史歌单
    songName: '',//歌名
    musicId: -1,//音乐id
    backgroundAudioManager: {},
    login_token: '',
    navId: 2
  }
})
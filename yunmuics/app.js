//app.js
App({
  onLaunch: function (options) {
    wx.db={}
    let info=wx.getSystemInfoSync();
    wx.db.statusBarHeight=info.statusBarHeight
    // console.log(wx.db.statusBarHeight)
    if(info.platform==='android'){
      wx.db.navBarHeight=48
    }else{
      wx.db.navBarHeight=44
    }
    // console.log(info.statusBarHeight)
  },
  
  globalData: {
    userInfo: {},
    songId:[],//全局传入歌曲id
    songImg:[],
    waitForPlaying:[],
    songName:[],
    backgroundAudioManager:{},
    login_token:''
  }
})
// pages/play/play.js
const API_BASE_URL = 'http://neteasecloudmusicapi.zhaoboy.com';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    innerAudioContext: {},  //小程序音乐播放api对象
    isPlay: false,   //是否播放
    song: [],
    show: true,
    showLyric: true,
    songId: [],
    history_songId: []
  },
  backPage: function () {
    wx: wx.navigateBack({
      delta: 1
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取到其他页面传来的musicId
    console.log(options)
    const musicId = options.musicId
    this.play(musicId)//调用play方法将id传给全局变量
  },
  play: function (id) {
    const musicId = id
    // console.log(app.globalData.songId)
    app.globalData.songId = musicId
    // console.log(app.globalData.songId)

    const innerAudioContext = wx.createInnerAudioContext()
    this.setData({
      innerAudioContext,
      isPlay: true
    })
    // http://neteasecloudmusicapi.zhaoboy.com/song/url?455653437
    // 通过音乐id获取音乐的地址
    // 请求歌曲音频的地址，失败则播放出错，成功则传值给createBgAudio(后台播放管理器，让其后台播放)
    wx.request({
      url: API_BASE_URL + '/song/url',
      data: {
        id: musicId
      },
      success: res => {
        console.log('歌曲音频url:', res)
        if (res.data.data[0].url === null) {  //如果是MV 电台 广告 之类的就提示播放出错，并返回首页
          // console.log('播放出错')
          wx.showModal({
            content: '服务器开了点小差~~',
            cancelColor: '#DE655C',
            confirmColor: '#DE655C',
            showCancel: false,
            confirmText: '返回',
            complete() {
              wx.switchTab({
                url: '/pages/find/find'
              })
            }
          })
        } else {
          this.createBgAudio(res.data.data[0]);
          // this.frontAudio(res.data.data[0])
        }
      }
    })

    //获取到歌曲音频，则显示出歌曲的名字，歌手的信息，即获取歌曲详情；如果失败，则播放出错。
    wx.request({
      url: API_BASE_URL + '/song/detail',
      data: {
        ids: musicId    //必选参数ids
      },
      success: res => {
        console.log('歌曲详情', res);
        if (res.data.songs.length === 0) {
          // console.log('无法获取到资源')
          wx.showModal({
            content: '服务器开了点小差~~',
            cancelColor: '#DE655C',
            confirmColor: '#DE655C',
            showCancel: false,
            confirmText: '返回',
            complete() {
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          })
        } else {
          this.setData({
            song: res.data.songs[0],  //获取到歌曲的详细内容，传给song
          })
          console.log(res.data.songs[0].name)
          // 歌名传给全局变量
          app.globalData.songName = res.data.songs[0].name;
        }

      },
    })
  },


  //createBgAudio
  createBgAudio(res) {
  console.log(res)
  //  后台音乐
    const backgroundAudioManager = wx.getBackgroundAudioManager(); //获取全局唯一的背景音频管理器。并把它给实例backgroundAudioManager 
  app.globalData.backgroundAudioManager = backgroundAudioManager ;         //把实例backgroundAudioManager (背景音频管理器) 给 全局
  backgroundAudioManager .title = 'title';                        //把title 音频标题 给实例
  // 设置src立即播放
  backgroundAudioManager .src = res.url;      // res.url 在createBgAudio 为 mp3音频  url为空，播放出错
  console.log(res)

  // const history_songId = this.data.history_songId
  // console.log(this.data.history_songId)
  // const historySong = {
  //   // id: res.id
  //   id: app.globalData.songId,
  //   songName:app.globalData.songName
  // }
  // history_songId.push(historySong)
  // backgroundAudioManager .onPlay(res => {                         // 监听背景音频播放事件
  //   this.setData({
  //     isPlay: true,
  //     history_songId
  //   })
  // });

  // backgroundAudioManager .onEnded(() => {                  //监听背景音乐自然结束事件，结束后自动播放下一首。自然结束，调用go_lastSong()函数，即歌曲结束自动播放下一首歌
  //   this.go_lastSong();

  // })
  // wx.setStorageSync('historyId', history_songId); //把historyId存入缓存
},
// 播放和暂停
handleToggleBGAudio() {
  console.log("点击")
  console.log(this.data.isPlay)
this.setData({
  isPlay:!this.data.isPlay
})
},

// // 点击切换歌词和封面
// showLyric(){
//   const {showLyric} = this.data;
//   this.setData({
//     showLyric: !showLyric
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
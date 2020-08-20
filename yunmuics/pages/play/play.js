// pages/play/play.js
const API_BASE_URL = 'http://neteasecloudmusicapi.zhaoboy.com';
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    hidden: false,  //加载动画是否隐藏
    isPlay: true,   //歌曲是否播放
    song: [],    //歌曲信息
    showLyric: true,    //显示歌词
    songId: [],     //待播放列表id
    history_songId: [],  //历史记录
    backgroundAudioManager: {},  //背景音频
    duration: '',             //总音乐时间（00:00格式）
    currentTime: '00:00',      //当前音乐时间（00:00格式）
    totalProcessNum: 0,         //总音乐时间 （秒）
    currentProcessNum: 0,       //当前音乐时间（秒）
    lrcDir: '', //歌词文稿内容
    storyContent: [],   //文稿数组，转化完成用来在页面中使用
    marginTop: 0,    //文稿滚动距离
    currentIndex: 0,    //当前正在第几行
    noLyric: false,  //是否有歌词
    slide: false
  },
  //返回上一页
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
    // console.log(options)
    const musicId = options.musicId
    this.play(musicId)//调用play方法
  },
  //播放音乐方法
  play(id) {
    const musicId = id
    // 将当前音乐id传到全局
    app.globalData.songId = musicId
    // 通过musicId发起接口请求，请求歌曲详细信息
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
            content: '服务器正忙~~',
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
        } else {   //获取成功
          this.setData({
            song: res.data.songs[0],  //获取到歌曲的详细内容，传给song
          })

          // 获取歌词
          wx.request({
            url: 'http://47.98.159.95/m-api/lyric',
            data: {
              id: musicId
            },
            success: res => {
              console.log('歌词:', res)
              if (res == null) {
                // console.log('歌词出错')
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
              } else if (res.data.nolyric) { //该歌无歌词
                console.log("无歌词")
                this.setData({
                  noLyric: true
                })
              }
              else {  //有歌词
                this.setData({
                  lrcDir: res.data.lrc.lyric
                })
              }
            }
          })
          // 例子：http://neteasecloudmusicapi.zhaoboy.com/song/url?455653437
          // 通过音乐id获取音乐的地址，请求歌曲音频的地址，失败则播放出错，成功则传值给createBackgroundAudioManager(后台播放管理器，让其后台播放)
          wx.request({
            url: API_BASE_URL + '/song/url',
            data: {
              id: musicId
            },
            success: res => {
              if (res.data.data[0].url === null) {  //获取出现错误出错
                // console.log('播放出错')
                wx.showModal({
                  content: '服务器出了点状况~~',
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
                // 调用createBackgroundAudioManager方法将歌曲url传入backgroundAudioManager
                this.createBackgroundAudioManager(res.data.data[0]);
              }
            }
          })
          // console.log(res.data.songs[0].name)
          // 歌名传给全局变量
          app.globalData.songName = res.data.songs[0].name;
        }
      },
    })
  },
  // 背景音频播放方法
  createBackgroundAudioManager(res) {

    const backgroundAudioManager = wx.getBackgroundAudioManager(); //调用官方API获取全局唯一的背景音频管理器。并把它给实例backgroundAudioManager 
    // app.globalData.backgroundAudioManager = backgroundAudioManager; //把实例backgroundAudioManager (背景音频管理器) 给全局
    // console.log(this.data.song.name)
    backgroundAudioManager.title = this.data.song.name;                        //把title音频标题给实例
    backgroundAudioManager.singer = this.data.song.ar[0].name;                 //音频歌手给实例
    backgroundAudioManager.coverImgUrl = this.data.song.al.picUrl;             //音频图片 给实例
    // 设置backgroundAudioManager的src属性，音频会立即播放
    if (res.url != null) {
      backgroundAudioManager.src = res.url;      // res.url 在createBgAudio 为 mp3音频  url为空，播放出错
      this.setData({
        isPlay: true,
        hidden: true,
        backgroundAudioManager
      })
    }
    //监听背景音乐进度更新事件
    backgroundAudioManager.onTimeUpdate(() => {
      this.setData({
        totalProcessNum: backgroundAudioManager.duration,
        currentTime: this.formatSecond(backgroundAudioManager.currentTime),
        duration: this.formatSecond(backgroundAudioManager.duration)
      })
      if (!this.data.slide) {
        this.setData({
          currentProcessNum: backgroundAudioManager.currentTime,
        })
      }
      if (!this.data.noLyric) {   //如果没有歌词，就不需要调整歌词位置
        this.lyricsRolling(backgroundAudioManager)
      } 
    })
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


  // 歌词滚动方法
  lyricsRolling(backgroundAudioManager) {
    // 歌词滚动
    // if (this.data.currentIndex >= 3) {//超过3行开始滚动
    // console.log('当前行数', this.data.currentIndex)
    this.setData({
      marginTop: (this.data.currentIndex - 3) * 39
    })
    // }
    // 当前歌词对应行颜色改变
    if (this.data.currentIndex != this.data.storyContent.length - 1) {//不是最后一行
      // var j = 0;
      for (let j = this.data.currentIndex; j < this.data.storyContent.length; j++) {
        // 当前时间与前一行，后一行时间作比较， j:代表当前行数
        if (this.data.currentIndex == this.data.storyContent.length - 2) {  //倒数第二行
          //最后一行只能与前一行时间比较
          if (parseFloat(backgroundAudioManager.currentTime) > parseFloat(this.data.storyContent[this.data.storyContent.length - 1][0])) {
            this.setData({
              currentIndex: this.data.storyContent.length - 1
            })
            return;
          }
        } else {
          if (parseFloat(backgroundAudioManager.currentTime) > parseFloat(this.data.storyContent[j][0]) && parseFloat(backgroundAudioManager.currentTime) < parseFloat(this.data.storyContent[j + 1][0])) {
            this.setData({
              currentIndex: j
            })
            return;
          }
        }
      }
    }
  },
  // 格式化时间
  formatSecond(second) {
    var secondType = typeof second;
    if (secondType === "number" || secondType === "string") {
      second = parseInt(second);
      var minute = Math.floor(second / 60);
      second = second - minute * 60;
      return ("0" + minute).slice(-2) + ":" + ("0" + second).slice(-2);
    } else {
      return "00:00";
    }
  },
  // 播放和暂停
  handleToggleBGAudio() {
    // console.log(this.data.isPlay)
    // let backgroundAudioManager = app.globalData.backgroundAudioManager
    const backgroundAudioManager = this.data.backgroundAudioManager
    console.log(backgroundAudioManager)
    //如果当前在播放的话
    if (this.data.isPlay) {
      backgroundAudioManager.pause();//暂停
      console.log("暂停")
    } else {      //如果当前处于暂停状态
      backgroundAudioManager.play();//播放
      console.log("播放")
    }
    this.setData({
      isPlay: !this.data.isPlay
    })
  },
  // 点击切换歌词和封面
  showLyric() {
    this.setData({
      showLyric: !this.data.showLyric
    })
    if (!this.data.noLyric) {
      this.setData({
        storyContent: this.sliceNull(this.parseLyric(this.data.lrcDir))
      })
    }
  },
  //格式化歌词
  parseLyric: function (text) {
    let result = [];
    let lines = text.split('\n'), //切割每一行
      pattern = /\[\d{2}:\d{2}.\d+\]/g;//用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
    // console.log(lines);
    //去掉不含时间的行
    while (!pattern.test(lines[0])) {
      lines = lines.slice(1);
    };
    //上面用'\n'生成数组时，结果中最后一个为空元素，这里将去掉
    lines[lines.length - 1].length === 0 && lines.pop();
    lines.forEach(function (v /*数组元素值*/, i /*元素索引*/, a /*数组本身*/) {
      //提取出时间[xx:xx.xx]
      var time = v.match(pattern),
        //提取歌词
        value = v.replace(pattern, '');
      // 因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
      time.forEach(function (v1, i1, a1) {
        //去掉时间里的中括号得到xx:xx.xx
        var t = v1.slice(1, -1).split(':');
        //将结果压入最终数组
        result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
      });
    });
    // 最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词
    result.sort(function (a, b) {
      return a[0] - b[0];
    });
    return result;
  },
  //去除空白
  sliceNull: function (lrc) {
    var result = []
    for (var i = 0; i < lrc.length; i++) {
      if (lrc[i][1] == "") {
      } else {
        result.push(lrc[i]);
      }
    }
    return result
  },
  //进度条开始滑动触发
  start: function (e) {
    console.log("开始")
    // console.log(e)
    this.setData({
      slide: true
    })
  },
  //触发滑动条
  changeSlide: function (e) {
    let backgroundAudioManager = this.data.backgroundAudioManager
    console.log("滑动")
    const position = e.detail.value
    // console.log(position)
    // backgroundAudioManager.seek(position)

  },
  //结束滑动触发
  end: function (e) {
    const position = e.detail.value
    let backgroundAudioManager = this.data.backgroundAudioManager
    console.log(position)
    backgroundAudioManager.seek(position)
    console.log(e)
    console.log("结束")
    this.setData({
      currentProcessNum: position,
    })
    this.setData({
      slide: false
    })
    // 判断当前是多少行
    for (let j = 0; j < this.data.storyContent.length; j++) {
      console.log('当前行数', this.data.currentIndex)
      console.log(parseFloat(backgroundAudioManager.currentTime))
      console.log(parseFloat(this.data.storyContent[j][0]))
      // 当前时间与前一行，后一行时间作比较， j:代表当前行数
      if (position < parseFloat(this.data.storyContent[j][0])) {
        this.setData({
          currentIndex: j - 1
        })
        return;
      }
    }
  },
  click() {
    console.log('点击')
  },
  //设置音频图片状态以及滚动条可播放状态函数
  setAudioType: function () {

  },
  //设置音频当前播放时间以及滚动条当前位置函数
  setCurrent: function () {

  },
  //设置音频总播放时间以及滚动条总位置函数
  setTotal: function () {

  },
  //设置滚动条是否滚动状态函数
  move: function () {

  },
  //设置音频时间点函数
  seek: function () {

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
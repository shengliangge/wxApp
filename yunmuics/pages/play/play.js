const $api = require('../../utils/api.js').API;
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    musicId: -1,//音乐id
    hidden: false,  //加载动画是否隐藏
    isPlay: true,   //歌曲是否播放
    song: [],    //歌曲信息
    hiddenLyric: true,    //是否隐藏歌词
    backgroundAudioManager: {},  //背景音频对象
    duration: '',             //总音乐时间（00:00格式）
    currentTime: '00:00',      //当前音乐时间（00:00格式）
    totalProcessNum: 0,         //总音乐时间 （秒）
    currentProcessNum: 0,       //当前音乐时间（秒）
    storyContent: [],   //歌词文稿数组，转化完成用来在页面中使用
    marginTop: 0,    //文稿滚动距离
    currentIndex: 0,    //当前正在第几行
    noLyric: false,  //是否有歌词
    slide: false   //进度条是否在滑动
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
    const musicId = options.musicId    //获取到其他页面传来的musicId
    if(this.data.musicId!=musicId){
      this.play(musicId)    //调用play方法
    }
  },
  //播放音乐方法
  play(musicId) {
    const that = this;//将this对象复制给that
    that.setData({
      hidden: false,
      musicId
    })
    app.globalData.musicId = musicId        // 将当前音乐id传到全局
    // 通过musicId发起接口请求，请求歌曲详细信息
    //获取到歌曲音频，则显示出歌曲的名字，歌手的信息，即获取歌曲详情；如果失败，则播放出错。
    $api.getSongDetail({ ids: musicId }).then(res => {
      if (res.data.songs.length === 0) {
        that.tips('服务器正忙~~', '确定', false)
      } else {   //获取成功
        app.globalData.songName = res.data.songs[0].name
        that.setData({
          song: res.data.songs[0],  //获取到歌曲的详细内容，传给song
        })
        wx.request({     // 获取歌词
          url: 'http://47.98.159.95/m-api/lyric',
          data: {
            id: musicId
          },
          success: res => {
            if (res.data.nolyric || res.data.uncollected) { //该歌无歌词,或者歌词未收集
              that.setData({
                noLyric: true
              })
            }
            else {  //有歌词
              that.setData({
                storyContent: that.sliceNull(that.parseLyric(res.data.lrc.lyric))
              })
            }
          }
        })
        // 通过音乐id获取音乐的地址，请求歌曲音频的地址，失败则播放出错，成功则传值给createBackgroundAudioManager(后台播放管理器，让其后台播放)
        $api.getSongUrl({ id: musicId }).then(res => {
          //请求成功
          if (res.data.data[0].url === null) {  //获取出现错误出错
            that.tips('音乐播放出了点状况~~', '确定', false)
          } else {
            // 调用createBackgroundAudioManager方法将歌曲url传入backgroundAudioManager
            that.createBackgroundAudioManager(res.data.data[0]);
          }
        })
          .catch(err => {
            //请求失败
            that.tips('服务器正忙~~', '确定', false)
          })
      }
    })
      .catch(err => {
        //请求失败
        that.tips('服务器正忙~~', '确定', false)
      })
  },
  // 背景音频播放方法
  createBackgroundAudioManager(res) {
    const that = this;//将this对象复制给that
    const backgroundAudioManager = wx.getBackgroundAudioManager(); //调用官方API获取全局唯一的背景音频管理器。
    if (res.url != null) {
      if (backgroundAudioManager.src != res.url) {    //首次放歌或者切歌
        that.setData({     //重设一下进度，避免切歌部分数据更新过慢
          currentTime: '00:00',      //当前音乐时间（00:00格式）
          currentProcessNum: 0,       //当前音乐时间（秒）
          marginTop: 0,    //文稿滚动距离
          currentIndex: 0,    //当前正在第几行
        })
        backgroundAudioManager.title = that.data.song.name;                //把title音频标题给实例
        backgroundAudioManager.singer = that.data.song.ar[0].name;             //音频歌手给实例
        backgroundAudioManager.coverImgUrl = that.data.song.al.picUrl;         //音频图片 给实例
        backgroundAudioManager.src = res.url;        // 设置backgroundAudioManager的src属性，音频会立即播放
        let musicId = that.data.musicId
        app.globalData.history_songId = that.unique(app.globalData.history_songId, musicId) //去除重复历史
      }
      that.setData({
        isPlay: true,  //是否播放设置为true
        hidden: true,  //隐藏加载动画
        backgroundAudioManager
      })

    }
    app.globalData.backgroundAudioManager = backgroundAudioManager
    //监听背景音乐进度更新事件
    backgroundAudioManager.onTimeUpdate(() => {
      that.setData({
        totalProcessNum: backgroundAudioManager.duration,
        currentTime: that.formatSecond(backgroundAudioManager.currentTime),
        duration: that.formatSecond(backgroundAudioManager.duration)
      })
      if (!that.data.slide) {    //如果进度条在滑动，就暂停更新进度条进度，否则会出现进度条进度来回闪动
        that.setData({
          currentProcessNum: backgroundAudioManager.currentTime,
        })
      }
      if (!that.data.noLyric) {   //如果没有歌词，就不需要调整歌词位置
        that.lyricsRolling(backgroundAudioManager)
      }
    })
    backgroundAudioManager.onEnded(() => {  //监听背景音乐自然结束事件，结束后自动播放下一首。自然结束，调用go_lastSong()函数，即歌曲结束自动播放下一首歌
      that.nextSong();
    })
    console.log('待放', app.globalData.waitForPlaying)
    console.log('历史', app.globalData.history_songId)
  },

  // 提醒
  tips(content, confirmText, isShowCancel) {
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
            url: '/pages/find/find'
          })
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },
  // 历史歌单去重
  unique(arr, musicId) {
    let index = arr.indexOf(musicId)  //使用indexOf方法，判断当前musicId是否已经存在，如果存在，得到其下标
    if (index != -1) {          //如果已经存在在历史播放中，则删除老记录，存入新记录
      arr.splice(index, 1)
      arr.push(musicId)
    } else {
      arr.push(musicId)       //如果不存在，则直接存入历史歌单
    }
    return arr  //返回新的数组
  },

  // 歌词滚动方法
  lyricsRolling(backgroundAudioManager) {
    const that = this
    // 歌词滚动
    that.setData({
      marginTop: (that.data.currentIndex - 3) * 39
    })
    // 当前歌词对应行颜色改变
    if (that.data.currentIndex != that.data.storyContent.length - 1) {//不是最后一行
      // var j = 0;
      for (let j = that.data.currentIndex; j < that.data.storyContent.length; j++) {
        // 当前时间与前一行，后一行时间作比较， j:代表当前行数
        if (that.data.currentIndex == that.data.storyContent.length - 2) {  //倒数第二行
          //最后一行只能与前一行时间比较
          if (parseFloat(backgroundAudioManager.currentTime) > parseFloat(that.data.storyContent[that.data.storyContent.length - 1][0])) {
            that.setData({
              currentIndex: that.data.storyContent.length - 1
            })
            return;
          }
        } else {
          if (parseFloat(backgroundAudioManager.currentTime) > parseFloat(that.data.storyContent[j][0]) && parseFloat(backgroundAudioManager.currentTime) < parseFloat(that.data.storyContent[j + 1][0])) {
            that.setData({
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
  // 播放上一首歌曲
  beforeSong() {
    if (app.globalData.history_songId.length > 1) {
      app.globalData.waitForPlaying.unshift(app.globalData.history_songId.pop())//将当前播放歌曲从前插入待放列表
      this.play(app.globalData.history_songId[app.globalData.history_songId.length - 1])  //播放历史歌单歌曲
    } else {
      this.tips('前面没有歌曲了哦', '去选歌', true)
    }
  },
  // 下一首歌曲
  nextSong() {
    if (app.globalData.waitForPlaying.length > 0) {
      this.play(app.globalData.waitForPlaying.shift())//删除待放列表第一个元素并返回播放
    } else {
      this.tips('后面没有歌曲了哦', '去选歌', true)
    }
  },
  // 播放和暂停
  handleToggleBGAudio() {
    const backgroundAudioManager = this.data.backgroundAudioManager
    //如果当前在播放的话
    if (this.data.isPlay) {
      backgroundAudioManager.pause();//暂停
    } else {      //如果当前处于暂停状态
      backgroundAudioManager.play();//播放
    }
    this.setData({
      isPlay: !this.data.isPlay
    })
  },
  // 点击切换歌词和封面
  showLyric() {
    this.setData({
      hiddenLyric: !this.data.hiddenLyric
    })
  },
    //去除空白行
    sliceNull: function (lrc) {
      var result = []
      for (var i = 0; i < lrc.length; i++) {
        if (lrc[i][1] !== "") {
          result.push(lrc[i]);
        }
      }
      return result
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

  //进度条开始滑动触发
  start: function (e) {
    // 控制进度条停，防止出现进度条抖动
    this.setData({
      slide: true
    })
  },
  //结束滑动触发
  end: function (e) {
    const position = e.detail.value   //移动值
    let backgroundAudioManager = this.data.backgroundAudioManager  //获取背景音频实例
    this.setData({
      currentProcessNum: position,
      slide: false
    })
    backgroundAudioManager.seek(position) //改变歌曲进度
    // 判断当前是多少行
    for (let j = 0; j < this.data.storyContent.length; j++) {
      // 当前时间与前一行，后一行时间作比较， j:代表当前行数
      if (position < parseFloat(this.data.storyContent[j][0])) {
        this.setData({
          currentIndex: j - 1
        })
        return;
      }
    }
  }
})
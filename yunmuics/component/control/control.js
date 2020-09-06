// component/control/control.js
const app = getApp();
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
    songName: '',
    musicId: -1
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      this.setData({
        songName: app.globalData.songName,
        musicId: app.globalData.musicId
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    goPlay() {
      wx.navigateTo({
        url: `/pages/play/play?musicId=${this.data.musicId}`,
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
    songList(){
      console.log('点击')
    }
  }
})

const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blocks: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
  //播放音乐
  playMusic: function (e) {
    let musicId = e.currentTarget.dataset.in.id    // 获取音乐id
    // 跳转到播放页面
    wx.navigateTo({
      url: `../play/play?musicId=${musicId}`
    })
  },
  playAll() {
    let playlist = this.data.blocks.creatives
    console.log(playlist);
    let musicId = playlist[0].resources[0].resourceId
    for (let i = 0; i < playlist.length; i++) {
      for(let j=0;j<playlist[i].resources.length;j++){
        app.globalData.waitForPlaying.push(playlist[i].resources[j].resourceId)
      }
    }
   let index= app.globalData.waitForPlaying.indexOf(musicId)
   app.globalData.waitForPlaying.splice(index,1)
    // 跳转到播放页面
    wx.navigateTo({
      url: `../play/play?musicId=${musicId}`
    })
  },
  }
})

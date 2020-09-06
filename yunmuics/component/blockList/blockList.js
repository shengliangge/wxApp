// component/blockList/blockList.js
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
  pageLifetimes: {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    findMore: function (e) {
      let urlStr = ''
      urlStr = '../songSheet/songSheet'
      wx.navigateTo({
        url: urlStr
      })
    },
    gotoSongList(e) {
      //获取页面传递的歌单id
      let listId = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `../songList/songList?listId=${listId}`,
      })
    },
  }
})

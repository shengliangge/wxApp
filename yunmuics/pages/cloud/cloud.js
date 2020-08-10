// pages/cloud/cloud.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLeft: true,
    detail: [
      {
        videoPict: 'https://p1.music.126.net/NvNqY6FKWvI0QPLdfL7uOA==/109951164583067600.jpg?param=300x300" alt="music',
        desc: '最棒的抖腿车载',
        headPic: '../../image/cloud_t1.jpg',
        writer: 'RM-Music',
        good: '3268赞',
        navigation: '../../image/cloud_dao.png'
      },
      {
        videoPict: 'https://p1.music.126.net/5qehxWSSDYYmhfRc9BHcxQ==/109951165125269160.jpg?param=300x300" alt="music',
        desc: '好听到可以单曲循环鸭',
        headPic: '../../image/cloud_t2.jpg',
        writer: 'THE上官李昂LYON3',
        good: '4960赞',
        navigation: '../../image/cloud_dao.png'
      },
      {
        videoPict: 'https://p1.music.126.net/fNadutk_u3NAaxsNhCjUCA==/109951164890583661.jpg?param=300x300" alt="music',
        desc: '网易云音乐过10w+评论的中文歌曲',
        headPic: '../../image/cloud_t3.jpg',
        writer: 'Rangsiz',
        good: '5858赞',
        navigation: '../../image/cloud_dao.png'
      },
      {
        videoPict: 'https://p1.music.126.net/5OEBqDp1aSVGktt-OxpsCg==/109951164978811959.jpg?param=300x300" alt="music',
        desc: '情迷春日|山花开满遍地，正式心动时分',
        headPic: '../../image/cloud_t4.jpg',
        writer: 'Z在此婷留',
        good: '980赞',
        navigation: '../../image/cloud_dao.png'
      },
      {
        videoPict: 'https://p1.music.126.net/uvJnSVQUWU6VM_F9bxWFHw==/109951165145592233.jpg?param=300x300" alt="music',
        desc: '你有时差症，总以为他还爱你',
        headPic: '../../image/cloud_t5.jpg',
        writer: 'QC队长',
        good: '6580赞',
        navigation: '../../image/cloud_dao.png'
      }
    ]
  },

  tabChangeHot(){
    this.setData({
      isLeft: true
    })
  },

  tabChangeWaiting(){
    //console.log('点击了即将上映')
    //错误写法: this.data.isLeft = false
    this.setData({
      isLeft: false
    })
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
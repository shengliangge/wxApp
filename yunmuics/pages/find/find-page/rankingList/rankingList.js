// pages/find/find-page/rankingList/rankingList.js
// const API = require('../../toplist/detail')
 const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    rank: [
      {
        img: 'https://p2.music.126.net/c0iThrYPpnFVgFvU6JCVXQ==/109951164091703579.jpg',
        date: '每周四更新',
        listname: '云音乐欧美热歌榜',
      },
      {
        img: 'https://p2.music.126.net/WTpbsVfxeB6qDs_3_rnQtg==/109951163601178881.jpg',
        date: '每周一更新',
        listname: 'iTunes榜',
      },
      {
        img: 'https://p2.music.126.net/Zb8AL5xdl9-_7WIyAhRLbw==/109951164091690485.jpg',
        date: '每天更新',
        listname: '云音乐都没新歌榜',
      }
    ],
    // officialrank: [
    //   {
    //     pic: 'https://p1.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg',
    //     time: '每天更新',
    //     test: [
    //       {
    //         song: '1.天外来物-薛之谦',
    //       },
    //       {
    //         song: '2.my future-Billie Eilish',
    //       },
    //       {
    //         song: '3.关于她（feat.Jony J）-Matzka特调',
    //       },
    //       // {
    //       //   song: '4.某年某月某天-颜中人',
    //       // },
    //       // {
    //       //   song: '5.晚来天欲雪-恋恋古人难/云泣',
    //       // }
    //     ]
    //   },
    //   {
    //     pic: 'https://p1.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg',
    //     time: '每天更新',
    //     test: [
    //       {
    //         song: '1.天外来物-薛之谦',
    //       },
    //       {
    //         song: '2.爱，存在-卢卢快闭嘴',
    //       },
    //       {
    //         song: '3.my future-Billie Eilish-my future',
    //       },
    //       // {
    //       //   song: '4.爱，存在（原唱：魏奇奇）-旺仔小乔',
    //       // },
    //       // {
    //       //   song: '5.麻雀-李荣浩',
    //       // }
    //     ]
    //   },
    //   {
    //     pic: 'https://p1.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg',
    //     time: '每周四更新',
    //     test: [
    //       {
    //         song: '1.爸爸妈妈-李荣浩',
    //       },
    //       {
    //         song: '2.海底-一支榴莲',
    //       },
    //       {
    //         song: '3.你走-松紧先生（李宗锦）',
    //       },
    //       // {
    //       //   song: '4.收敛-不够',
    //       // },
    //       // {
    //       //   song: '5.丢了你-井胧',
    //       // }
    //     ]
    //   },
    //   {
    //     pic: 'https://p1.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg',
    //     time: '每周四更新',
    //     test: [
    //       {
    //         song: '1.蚍蜉-花粥',
    //       },
    //       {
    //         song: '2.世界正中-陈粒',
    //       },
    //       {
    //         song: '3.往来无望-要不要买菜',
    //       },
    //       // {
    //       //   song: '4.杰克的酒窝（Jackie‘s Beer Nest）-沈已诚',
    //       // },
    //       // {
    //       //   song: '5.回忆录-宫阁',
    //       // }
    //     ]
    //   }
    // ],
    // otherrank: [
    //   {
    //     ranktitle: '特色榜',
    //     rankbox: [
    //       {
    //         image: 'https://p2.music.126.net/A61n94BjWAb-ql4xpwpYcg==/18613632348448741.jpg',
    //         renew: '每月更新',
    //         rankname: '硬地原创音乐榜'
    //       },
    //       {
    //         image: 'https://p2.music.126.net/oUxnXXvM33OUHxxukYnUjQ==/109951164174523461.jpg',
    //         renew: '每周五更新',
    //         rankname: '抖音排行榜'
    //       },
    //       {
    //         image: 'https://p2.music.126.net/5tgOCD4jiPKBGt7znJl-2g==/18822539557941307.jpg',
    //         renew: '每周四更新',
    //         rankname: '云音乐古典音乐榜'
    //       },
    //     ]
    //   },
    //   {
    //     ranktitle: '全球榜',
    //     rankbox: [
    //       {
    //         image: 'https://p2.music.126.net/EBRqPmY8k8qyVHyF8AyjdQ==/18641120139148117.jpg',
    //         renew: '每周三更新',
    //         rankname: '美国Billboard周榜'
    //       },
    //       {
    //         image: 'https://p2.music.126.net/VQOMRRix9_omZbg4t-pVpw==/18930291695438269.jpg',
    //         renew: '每周一更新',
    //         rankname: 'UK排行榜周榜'
    //       },
    //       {
    //         image: 'https://p2.music.126.net/WTpbsVfxeB6qDs_3_rnQtg==/109951163601178881.jpg',
    //         renew: '每周一更新',
    //         rankname: 'iTUNES榜'
    //       },
    //       {
    //         image: 'https://p2.music.126.net/Rgqbqsf4b3gNOzZKxOMxuw==/19029247741938160.jpg',
    //         renew: '每周三更新',
    //         rankname: '日本Oricon数字单曲榜'
    //       },
    //       {
    //         image: 'https://p2.music.126.net/6O0ZEnO-I_RADBylVypprg==/109951162873641556.jpg',
    //         renew: '每周五更新',
    //         rankname: '法国 NRJ Vos Hits 周榜'
    //       },
    //       {
    //         image: 'https://p2.music.126.net/0_6_Efe9m0D0NtghOxinUg==/109951163089272193.jpg',
    //         renew: '每周三更新',
    //         rankname: '英国Q杂志中文版周榜'
    //       },
    //     ]
    //   },
    //   {
    //     ranktitle: '曲风榜',
    //     rankbox: [
    //       {
    //         image: 'https://p2.music.126.net/5tgOCD4jiPKBGt7znJl-2g==/18822539557941307.jpg',
    //         renew: '每周五更新',
    //         rankname: '云音乐电音榜'
    //       },
    //       {
    //         image: 'https://p2.music.126.net/vttjtRjL75Q4DEnjRsO8-A==/18752170813539664.jpg',
    //         renew: '每周四更新',
    //         rankname: '云音乐ACG音乐榜'
    //       },
    //       {
    //         image: 'https://p2.music.126.net/J6x0W62ONLVsU93rXUhVXw==/109951165165693959.jpg',
    //         renew: '每周五更新',
    //         rankname: '云音乐民谣榜'
    //       },
    //     ]
    //   },
    // ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.request({
      url:'http://neteasecloudmusicapi.zhaoboy.com/toplist/detail',
      data: {
      },
      header: {
        "Content-Type": "application/json"
      },
      success: (res) => {
        console.log(res)
        this.setData({
          list: res.data.list
        })
      }
    })
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
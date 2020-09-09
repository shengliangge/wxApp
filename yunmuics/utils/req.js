//定义一个常量保存请求地址
const API_BASE_URL = 'http://neteasecloudmusicapi.zhaoboy.com';
// 定义一个request 函数，传入两个两个参数，第一个为具体接口地址，第二个为数据
const request = (url, data) => { 
  let _url = API_BASE_URL  + url;
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: "get",
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(request) {
        resolve(request.data)
        
      },
      fail(error) {
        reject(error)
      }
    })
  });
}

module.exports ={
  getPage:(data)=>{
    return request('/homepage/dragon/ball',data)//首页-发现
  },
  hotSongs:(data) =>{
    return request('/song/url',data)//热搜接口
  },
  searchSuggest:(data)=>{
    return request('/search/suggest',data)//搜索建议接口
  },
  searchResult:(data)=>{
    return request('/search',data)//搜索结果接口
  },
  getBanner:(data)=>{
    return request('/banner',data)//个性推荐轮播
  },
  getSongSheet:(data)=>{//歌单
    return request('/top/playlist',data)//热门歌单接口
  },
  getNewSong:(data)=>{
    return request('/personalized/newsong',data)//最新音乐接口
  },
  getDjRadios:(data)=>{
    return request('/dj/recommend',data)//电台推荐接口
  },
  getProgramRecommend:(data)=>{
    return request('/program/recommend',data)//推荐节目接口
  },
  getRecommendType:(data)=>{
    return request('/dj/recommend/type',data)//所有电台分类推荐
  },
  getRecommendMV:(data)=>{
    return request('/personalized/mv',data)//推荐MV
  },
  getNewMv:(data)=>{
    return request('/mv/first',data)//最新MV
  },
  getNewEst:(data)=>{
    return request('/album/newest',data)//最新专辑
  },
  getTopList:(data)=>{
    return request('/top/list',data)//排行榜
  },
  getDjList:(data)=>{
    return request('/dj/catelist',data) //电台分类
  },
  getPay:(data)=>{
    return request('/dj/paygift',data)//付费精品
  },
  getSonger:(data)=>{
    return request('/toplist/artist',data)//歌手排行
  },
}

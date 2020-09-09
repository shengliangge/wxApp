const app = getApp();
// method(HTTP 请求方法)，网易云API提供get和post两种请求方式
const GET = 'GET';
const POST = 'POST';
// 定义全局常量baseUrl用来存储前缀
const baseURL = 'http://neteasecloudmusicapi.zhaoboy.com';

function request(method, url, data) {
  return new Promise(function (resolve, reject) {
    let header = {
      'content-type': 'application/json',
      'cookie': app.globalData.login_token
    };
    wx.request({
      url: baseURL + url,
      method: method,
      data: method === POST ? JSON.stringify(data) : data,
      header: header,
      success(res) {
        //请求成功
        //判断状态码---errCode状态根据后端定义来判断
        if (res.data.code == 200) {  //请求成功
          resolve(res);
        } else {
          //其他异常
          reject('运行时错误,请稍后再试');
        }
      },
      fail(err) {
        //请求失败
        reject(err)
      }
    })
  })
}

const API = {
  login: (data) => request(GET, `/login/cellphone`, data),  //手机登录
  getSongDetail: (data) => request(GET, `/song/detail`, data),  //获取歌曲详情
  getSongUrl: (data) => request(GET, `/song/url`, data),  //获取歌曲路径
  getPlaylistAll: () => request(GET, `/playlist/catlist`),  //全部歌单分类,调用此接口,可获取歌单分类,包含 category 信息
  getPlaylistHot: () => request(GET, `/playlist/hot`),  //信息热门歌单分类 ,调用此接口,可获取歌单分类,包含 category 
  getPlaylist: (data) => request(GET, `/top/playlist`, data),  //信息热门歌单分类 ,调用此接口,可获取歌单分类,包含 category 
  getBanner: (data) => request(GET, `/Banner`, data),  //个性推荐轮播
  getUserDetail: (data) => request(GET, `/user/detail`, data),  //登陆后调用此接口 , 传入用户 id, 可以获取用户详情
  getUserPlaylist: (data) => request(GET, `/user/playlist`, data),  // 登陆后调用此接口 , 传入用户 id, 可以获取用户歌单
  getRecommendSongs: (data) => request(GET, `/recommend/songs`, data),  // 调用此接口 , 可获得每日推荐歌单 ( 需要登录 )
  getPlaylistDetail: (data) => request(GET, `/playlist/detail`, data),  // 获取歌单详情
  getHotSongs: (data) => request(GET, '/song/url', data),  // 热搜接口
  getSearchSuggest: (data) => request(GET, `/search/suggest`, data),  // 搜索建议接口
  getSearchResult: (data) => request(GET, `/search`, data),  // 搜索结果接口
};
module.exports = {
  API: API
}
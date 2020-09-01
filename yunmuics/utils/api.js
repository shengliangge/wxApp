// method(HTTP 请求方法)，网易云API提供get和post两种请求方式
const GET = 'GET';
const POST = 'POST';
// 定义全局常量baseUrl用来存储前缀
const baseURL = 'http://neteasecloudmusicapi.zhaoboy.com';

function request(method, url, data) {
  return new Promise(function (resolve, reject) {
    let header = {
      'content-type': 'application/json',
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
  getSongDetail: (data) => request(GET, `/song/detail`, data),  //获取歌曲详情
  getSongUrl:(data) => request(GET, `/song/url`, data),  //获取歌曲路径
};
module.exports = {
  API: API
}
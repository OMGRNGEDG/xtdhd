import utils from '../utils/util.js'; 
let requestTaskArray = []; //只允许一次显示加载框
const fetch = (params = {
  url: '',
  data: {},
  method: 'GET'
}) => {
  return new Promise((resolve, reject) => {
    showOrHideLoad();
    let requestTaskItem = wx.request({
      url: params.url,
      data: params.data,
      method: params.method,
      header: {
        'content-type': params.content?params.content:'application/x-www-form-urlencoded',
        'Authorization': wx.getStorageSync("TOKEN")? "Bearer "+ wx.getStorageSync("TOKEN"):null
      },
      success: res => {
        if (isReturnOk(res)){
          resolve(res.data)
        } else {
          reject(res.data)
        }
      },
      fail: (res) => {
        utils.showModal('网络异常，请稍后重试~~');
      },
      complete: (res) => {
        requestTaskArray.shift();
        showOrHideLoad(false);
      }
    })
    requestTaskArray.push(requestTaskItem);
  })
}

/**
 * 请求队列里面是没有请求 开始加载或者停止加载
 */
let showOrHideLoad = (show = true) => {
  const requestLength = requestTaskArray.length;
  if (show && requestLength === 0) {
    return utils.showLoading();
  } else if (!show && requestLength === 0) {
    return wx.hideLoading();
  }
  return;
}


/**
 * 接口是否返回正常
 */
const isReturnOk = res => {
  var resCode,resMessage;
  var successCode = 200
  if(res.data && res.data.result==3 || res != '') {
    resCode = res.data.result_text
    resMessage = res.data.message
  }else{
    utils.showModal('接口异常，请稍后重试~~');
    return;
  }
  if (typeof res.data == 'undefined' || res.data === null || res.data === '') {
    if(res.statusCode == 401){
      // token过期
      wx.removeStorage({
        key: 'TOKEN',
        success (res) {
          wx.removeStorage({
            key: 'USER',
            success (res) {
              wx.reLaunch({
                url: '/pages/login/index'
              });
            } 
          })
        } 
      })
     
      
    }
    console.log(res.statusCode)
    return;
  }
  return true
}
const POST = (data, url,content) => {
  return fetch({
    url,
    data,
    content,
    method: 'POST'
  })
}

const GET = (data, url) => {
  return fetch({
    url,
    data
  })
}

export default {
  POST,GET
}
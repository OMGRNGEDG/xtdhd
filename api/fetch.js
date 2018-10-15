import utils from '../utils/util.js';    
const APP = getApp();
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
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': APP.globalData.userInfo
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
  // console.log('fetch-res:', res)
  //适配多种接口返回体
  var resCode,resMessage;
  var successCode = 200
  if(res.data && res.data.result_text) {
    resCode = res.data.result_text
    successCode = '100'
    resMessage = res.data.message
  }else if(res.statusCode) {
    resCode = res.statusCode
    successCode = 200
    resMessage = res.errMsg
  }
  // if (resCode !== successCode) {
  //   if(resCode == '6005') {
  //     resMessage = '该商品已售罄~'
  //   }
  //   utils.showModal(resMessage)
  //   return;
  // }
  if (typeof res.data == 'undefined' || res.data === null || res.data === '') {
    utils.showModal(resMessage)
    return;
  }
  // if (res.data.msg == '' || res.data.msg == undefined || res.data.msg == null) {
  //   utils.showModal('接口异常，请稍后重试~~')
  //   return;
  // }
  // if (typeof res.data.data === 'undefined') {
  //   utils.showModal(res.data.msg)
  //   return;
  // }
  if (res.data.msgCode && res.data.msgCode !== 100) {
    utils.showModal(res.data.msg)
    return;
  }

  // 成功弹窗
  // utils.showModal(res.data)
  return true
}


export default fetch
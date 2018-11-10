const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 页面回退
 */
let back = (level) => {
  if (!level) {
    level = 1
  }
  wx.navigateBack({
    delta: level
  })
}

/**
 * 兼容性判断
 */
let wxVersion;
let wxApiCanUse = (wxApi) => {
  if (!wx.canIUse(wxApi)) {
    wxVersion ? '' : wxVersion = wx.getSystemInfoSync().version;
    wx.showModal({
      title: wxVersion ? `您的微信版本${wxVersion}` : '提示',
      content: '当前微信版本太低, 请升级到最新微信版本'
    })
    return false;
  }
  return true;
}
const loading = (title = '加载中') => {
  wx.showLoading({
    title,
    icon: none,
    mask: true
  })
}
const hideLoading = () => {
  wx.hideLoading()
}

//自定义弹窗
const modal = (title, content, showCancel, callBack) => {
  wx.showModal({
    title,
    content,
    showCancel,
    success: callBack
  })
}


//自定义加载
const toast = (title, data) => {
  wx.showToast({
    title,
    icon: 'none',
    mask: true,
    duration: data ? data : 2000
  })
}

const showLoading = (title = '加载中', mask = true) => {
  return wx.showLoading({
    title,
    mask
  })
}

const showModal = (res, title = '提示', showCancel = false) => {
  let content;
  typeof res === 'object' ? content = res.msg || `${res.statusCode} error` : content = res;
  return wx.showModal({
    // title,
    content,
    showCancel,
  })
}
const isPoneAvailable = (str) => {
  let myreg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
  if (!myreg.test(str)) {
    return false;
  } else {
    return true;
  }
}

const setStorage = (key, value) => {
  return wx.setStorage({
    key: key,
    data: value
  })
}

module.exports = {
  formatTime, showModal, showLoading, toast, modal, hideLoading, loading, wxApiCanUse, back, isPoneAvailable, setStorage
}

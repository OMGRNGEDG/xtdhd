// pages/authorize/index.js
const app = getApp();
const constant = app.globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFromCoupon: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if(options.isFromCoupon) {
      this.data.isFromCoupon = options.isFromCoupon
    }
  },

  /**
   * 用户登录
   * 
   */
  userLogin() {
    let _this = this
    let data = {
      code: '',
      channelType: constant.CHANNELTYPE,
      mobile: '',
      validCode: '',
    }
    wx.login({
      success: res => {
        console.log('微信jscode成功')
        console.log(res)
        data.code = res.code;
        console.log(data)
        app.api.LOGIN(data).then(res2 => {
          console.log('登陆结果')
          console.log(res2)
          if (res2.msgCode === 100) {
            if (typeof res2.data === 'undefined') {
              this.getRegister()
            } else {
              wx.setStorageSync('userInfo', res2.data)
              app.globalData.USERINFO = res2.data
              console.log(res2.data)


              // if(_this.data.isFromCoupon) {
              //   wx.navigateBack({
                  
              //   })
              //   return
              // }
              console.log('页面栈：', getCurrentPages())
              wx.navigateBack()
              
            }
          }
        }).catch(err => {
          console.log(err)
          this.getRegister()
        })
      },
      fail: function(res) {
        console.log('微信登陆失败')
        console.log(res)
      }
    })
  },

  // 注册
  getRegister() {
    let _this = this
    let data = {
      "channelType": "10007"
    }
    wx.login({
      success(res) {
        data.code = res.code
        app.api.REGISTER(data).then(res => {
          console.log('注册结果')
          console.log(res)
          if (res.msgCode === 100) {
            wx.setStorageSync('userInfo', res.data)
            app.globalData.USERINFO = res.data
            if (_this.data.isFromCoupon) {
              wx.navigateBack({

              })
              return
            }
            wx.switchTab({
              url: '/pages/index/index'
            })
          }
        })
      }
    })
  },

  getUserInfo(res) {
    console.log('点击了')
    wx.setStorageSync('wxUserinfo', res.detail.userInfo)
    this.userLogin()
  },

  /**
   * 已授权用户获得用户信息
   */
  // GetUserInfo() {
  //   let data = {
  //     code: '', 
  //     channelType: app.globalData.CHANNELTYPE,
  //     mobile: '',
  //     validCode: '',
  //   }
  //   // 查看是否授权
  //   wx.getSetting({
  //     success: res => {
  //       console.log('点击了++++')
  //       console.log(res)
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称

  //       } else {
  //         this.userLogin();
  //       }
  //     },
  //     fail: res => {
  //       console.log('auth fail')
  //     }
  //   })
  // },

  /**
   * 获取用户地理位置
   */
  getMyLocation() {
    wx.getLocation({
      success: (res) => {
        constant.LOCATIONINFO = res;
      },
      fail: () => {
        constant.LOCATIONINFO = 'fail';
      }
    })
  }
})
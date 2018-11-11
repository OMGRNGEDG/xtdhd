// pages/authorize/index.js
const app = getApp();
const config = require('../../api/index.js');
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
  onLoad: function (options) {
    if (options.isFromCoupon) {
      this.data.isFromCoupon = options.isFromCoupon
    }
  },

  /**
   * 用户登录
   * 
   */
  userLogin() {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          app.api.POST({ code: res.code }, config.OnLogin).then(msg => {
            console.log(msg);
            wx.setStorageSync('sessionId', msg.sessionId);
            if (msg.userinfo != null) {
              let o = msg.userinfo;
              o.hasUserInfo = true;
              wx.setStorageSync('userinfo', o);
            } else {
              wx.getUserInfo({
                lang: 'zh_CN',
                success: function (ui) {
                  //console.log(ui);
                  wx.request({
                    url: config.UserInfo,
                    method: 'POST',
                    data: {
                      sessionId: msg.sessionId,
                      rawData: ui.rawData,
                      signature: ui.signature,
                      encryptedData: ui.encryptedData,
                      iv: ui.iv
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function (mes) {
                      //console.log('用户解密状态信息', mes);
                      //设置userinfo缓存
                      let userInfo = mes.data.userinfo;
                      userInfo.hasUserInfo = true;
                      wx.setStorageSync('userinfo', userInfo);
                      wx.navigateBack({
                        delta: 1
                      })
                    },
                    fail: function (err) {
                      console.log('获取用户信息失败', err);
                      wx.showModal({
                        title: '提示',
                        content: '用户授权失败',
                        confirmText: '重新授权',
                        showCancel: false,
                        success: function (res) {
                          wx.removeStorageSync('userinfo');
                          console.log('用户授权失败' + res)
                        }
                      });
                    }
                  });
                },
                fail: function (err) {
                  //授权失败 
                  wx.removeStorageSync('userinfo');
                  console.log('登录失败！' + err)
                }
              });
            }
          }).catch(v => {
            console.warn(v);
          });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  /**
 *   点击授权
 */
  getUserInfo(res) {
    this.userLogin();
  },
  /**
   * 授权用户
   */
  goPositionEvent(e) {
    console.log(e);
    let auth = e.detail.authSetting;
    console.log(auth);
    if (!auth['scope.writePhotosAlbum']) {
      wx.authorize({
        scope: 'scope.writePhotosAlbum',
        success() {
          wx.setStorageSync('writePhotosAlbum', true);
        },
        fail() {
          wx.setStorageSync('writePhotosAlbum', false);
        }
      })
    }
    if (!auth['scope.userInfo']) {
      wx.authorize({
        scope: 'scope.userInfo',
        success() {
          console.log('设置用户信息OK')
        }
      })
    }
  }

})
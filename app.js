//app.js
import api from './api/fetch.js'
const config = require('./api/index.js');
App({
  onLaunch: function () {
    // 登录
    const that = this;
    that.login();
  },
  getUser() {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          api.POST({ code: res.code }, config.OnLogin).then(msg => {
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
                    },
                    fail: function (err) {
                      console.log('获取用户信息失败', err);
                      wx.showModal({
                        title: '提示',
                        content: '用户授权失败',
                        confirmText: '重新授权',
                        showCancel: false,
                        success: function (res) {
                          wx.navigateTo({
                            url: '/pages/authorize/index'
                          });
                        }
                      });
                    }
                  });
                },
                fail: function (err) {
                  //授权失败 跳转
                  wx.removeStorageSync('userinfo');
                  wx.navigateTo({
                    url: '/pages/authorize/index'
                  });
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
  login() {
    const that = this;
    let sessionId = wx.getStorageSync('sessionId');
    if (sessionId) {
      api.POST({ sessionId: sessionId }, config.CheckSessionId).then(res => {
        if (res.success == true && res.msg == "success") {
          let o = res.userinfo;
          o.hasUserInfo = true;
          wx.setStorageSync('userinfo', o);
        } else {
          that.getUser();
        }
      }).catch(v => {
        console.log(v);
      });
    } else {
      that.getUser();
    }

  },
  api: api,
  globalData: {
    userInfo: null
  }
})
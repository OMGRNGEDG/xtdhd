//index.js
//获取应用实例
var config = require('../../api/index.js');
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    console.log(app.globalData.userInfo);
    wx.request({
      url: config.Expense,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWI0MWNlN2QtZmYwNS00MGI4LTgxYjctYmQ1MjhjNjg2MDZkIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbW9iaWxlcGhvbmUiOiIxNTIxNjcyODIwOSIsIm5iZiI6IjE1Mzk1MDQ5ODEiLCJleHAiOiIxNTM5NTkxMzgxIn0.1vi4LKXC7Gd6E1yhed5LPhllDNzIosu90eVYD_MMwHk'
      },
      success: function (dt) {
        console.log(dt.data)
        /*
        var newitem = {
            id: item.id,
            src: item.mediaConverUrl
        }*/
        // that.setData({
        //   imgUrls: arr,
        //   voucher: _nam,
        //   fiexJpg: old
        // })

      },
      fail: function (err) {
        wx.hideNavigationBarLoading();
        wx.showModal({
          title: '提示',
          content: '请求数据失败',
          confirmText: '重新获取',
          cancelText: '稍后再试',
          success: function (res) {
            if (res.cancel) {
              wx.navigateBack({
                delta: 1
              });
            } else {
              that.requestBanner(sessionId);
            }

          }
        });
      }
    });
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

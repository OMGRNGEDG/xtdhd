//index.js
//获取应用实例
const config = require('../../api/index.js');
import util from '../../utils/util'
const app = getApp()

Page({
  data: {
    phoneNum: '',
    phoneCode: '',
    timeCountDownTop: "获取验证码",
    counting: false
  },
  onLoad: function () {
    let data = {

    }
    console.log(app)
    // app.api.GET(data,config.Expense).then(res=>{

    // });
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  writeCode(e) {
    // 写入验证码
    this.setData({
      phoneCode: e.detail.value
    })
  },
  getCode() {
    // 获取验证码
    const that = this;
    let phoneNum = that.data.phoneNum;
    let data = {
      phone: phoneNum,
      secret: config.CODE
    };
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!that.data.counting) {
      if (!myreg.test(phoneNum)) {
        wx.showToast({
          title: '请填写正确手机号',
          icon: 'none',
          duration: 500
        })
      } else {
        app.api.GET(data, config.Getlogincode).then(res => {
          if (res.result == 3 && res.result_text == 'success') {
            wx.showToast({
              title: '验证码发送成功！',
              icon: 'success',
              duration: 2000
            });
            //开始倒计时60秒
            that.countDown(that, 60);
          } else {
            wx.showToast({
              title: res.result_text,
              icon: 'none',
              duration: 500
            })
          }
        }).catch(v => {
          console.warn(v);
        });

      }
    } else {
      wx.showToast({
        title: that.data.timeCountDownTop,
        icon: 'none',
        duration: 2000
      });
    }
  },
  logIn() {
    // 登录
    const that = this;
    let phoneNum = that.data.phoneNum;
    let phoneCode = that.data.phoneCode;
    if (phoneNum && phoneCode) {
      let _data={
        username: phoneNum,
        vaildcode: phoneCode
      }
      app.api.POST(_data,config.Token).then(res => {
        console.log(res)
        if(res.result_text == "success"){
          wx.setStorage({
            key:"TOKEN",
            data: res.token
          });
          wx.reLaunch({
            url: '/pages/index/index'
          })
        }else{
          wx.showToast({
            title: res.result_text,
            icon: 'none',
            duration: 500
          });
        }
      }).catch(v => {
        console.warn(v);
      });
     
    } else {
      util.toast("请输入正确的手机号或验证码！")
    }

  },
  bindKeyInput(e) {
    this.setData({
      phoneNum: e.detail.value
    })
  },
  countDown(that, count) {
    if (count == 0) {
      that.setData({
        timeCountDownTop: '获取验证码',
        counting: false
      })
      return;
    }

    that.setData({
      counting: true,
      timeCountDownTop: count + '秒后重新获取',
    })

    setTimeout(function () {
      count--;
      that.countDown(that, count);
    }, 1000);
  }
})

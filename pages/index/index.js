//index.js
//获取应用实例
const config = require('../../api/index.js');
const app = getApp();
Page({
  data: {
    activeList: [],
    userInfo: {},
    showCOn: false,
    inputTxt: null,
    marginTop: "-140"
  },
  onLoad: function () {
    this.getUserInfo();
    // app.api.GET(data,config.Expense).then(res=>{

    // });
  },
  getUserInfo: function () {
    const that = this;
    try {
      var value = wx.getStorageSync('TOKEN')
      if (value) {
        let _data = {}
        // Do something with return value
        app.api.GET(_data, config.Info).then(res => {
          if (res.result == 3 && res.result_text == "success") {
            wx.setStorage({
              key: "USER",
              data: res.data,
              success: function () {
                that.getProjects(res.data)
              }
            })
          }
        }).catch(v => {
          console.warn(v);
        });
      } else {
        wx.reLaunch({
          url: '/pages/login/index'
        })
        console.warn('没有Tocken');
      }
    } catch (e) {
      // Do something when catch error
      console.log(e)
    }
    // this.setData({
    //   userInfo: e.detail.userInfo,
    //   hasUserInfo: true
    // })
  },
  getProjects(msg) {
    let _data = {};
    app.api.GET(_data, config.Projects).then(res => {
      if (res.data.length > 0 && res.result == 3) {
        // 这个接口返回值有问题
        this.setData({
          activeList: res.data,
          userInfo: msg
        });
      }
    }).catch(v => {
      console.warn(v);
    });
  },
  allMonery() {
    this.setData({
      inputTxt: this.data.userInfo.grandtotalmoney
    })
  },
  changeMonery(e){
    this.setData({
      inputTxt: e.detail.value
    })
  },
  withdrawal(){
    const that = this ;
    let _data = that.data.inputTxt,_msg = that.data.userInfo.grandtotalmoney
    if(parseInt(_data)>parseInt(_msg)){
      wx.showToast({
        title: "超出可提现余额！",
        icon: 'none',
        duration: 500
      });
    }else{
      let moner={
        money: _data
      };
      let contenttype = "application/json-patch+json";
      app.api.POST(moner,config.User+'withdrawal',contenttype).then(res => {
        this.setData({
          showCOn: false,
          marginTop: '-140'
        });
        if(res.result_text == "success"&& res.result==3){
          wx.showToast({
            title: '已提交！',
            icon: 'none',
            duration: 1000
          });
        }else{
          wx.showToast({
            title: res.result_text,
            icon: 'none',
            duration: 1000
          });
        }
        setTimeout(function (){
          that.getUserInfo();
         },1100); 
      }).catch(v => {
        console.warn(v);
      });
    }
  },
  putForward() {
    this.setData({
      showCOn: true
    })
  },
  bounce(e){
    console.log(e.detail.height);
    let msg = -100-e.detail.height;
    this.setData({
      marginTop: msg
    })
  },
  cancel() {
    this.setData({
      showCOn: false
    })
  }
})

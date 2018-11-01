// pages/putForward/index.js
const config = require('../../api/index.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    inputTxt : null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this ;
    wx.getStorage({
      key: 'USER',
      success: function (res) {
        console.log(res.data);
        that.setData({
          userInfo: res.data
        });
      }
    });
  },
  changeMonery(e){
    this.setData({
      inputTxt: e.detail.value
    })
  },
  allMonery() {
    this.setData({
      inputTxt: this.data.userInfo.balance
    })
  },
  withdrawal(){
    const that = this ;
    let _data = that.data.inputTxt,_msg = that.data.userInfo.balance;
    if(parseInt(_data)>parseInt(_msg)){
      wx.showToast({
        title: "超出可提现余额！",
        icon: 'none',
        duration: 500
      });
    }else{
      let moner={
        money: parseInt(_data)
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
  getUserInfo: function () {
    const that = this;
    try {
        let _data = {}
        app.api.GET(_data, config.Info).then(res => {
          if (res.result == 3 && res.result_text == "success") {
            wx.setStorage({
              key: "USER",
              data: res.data,
              success: function () {
                that.setData({
                  userInfo: res.data
                })
              }
            })
          }
        }).catch(v => {
          console.warn(v);
        });
    } catch (e) {
      console.log(e)
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
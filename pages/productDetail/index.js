// pages/productDetail/index.js
const config = require('../../api/index.js');
const app = getApp();
const WxParse= require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgList: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.getlist(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getlist(obj){
    var that= this; 
    app.api.GET({}, config.Project +obj+ '/info').then(res => {
      if (res.result_text == "success" && res.result == 3) {
        let item =[],arr=JSON.parse(res.data.imgs);
        arr.forEach(element => {
          item.push(element)
        });
        let article= res.data.descripton; 
        WxParse.wxParse('article', 'html', article,that, 0);
        that.setData({
          msgList: res.data,
          imgs: item
        });
      } else {
        console.warn(res);
        that.setData({
          msgList: 1
        });
      }

    }).catch(v => {
      console.warn(v);
      that.setData({
        msgList: 1
      });
    });
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
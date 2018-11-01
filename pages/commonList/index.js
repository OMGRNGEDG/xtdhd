// pages/commonList/index.js
const config = require('../../api/index.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fundinfo: [],
    userInfo: {},
    showComment: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let _data ={
      "name":options.name,
      "id": options.id,
      "path": options.path
    }
    this.getsomting(options.id,_data);
  },
  getsomting(_id,path){
    let url = path.path;
    if(url == app.path.BONUSLIST){
      app.api.GET({},config.User+_id+'/fundinfo').then(res=>{
        if(res.result_text == "success" && res.result == 3){
          this.setData({
            fundinfo :res.data,
            userInfo: path,
            showComment: 1
          });
          wx.setNavigationBarTitle({
            title: '股东分红'
          })
        }else{
          console.warn(res);
        }
  
      }).catch(v=>{
        console.warn(v);
      });
    }else if(url == app.path.FINANCELIST){
      app.api.GET({},config.Project+_id+'/projoperateinfo').then(res=>{
        if(res.result_text == "success" && res.result == 3){
          this.setData({
            fundinfo :res.data,
            userInfo: path,
            showComment: 2
          });
          wx.setNavigationBarTitle({
            title: '财务月报表'
          })
        }else{
          console.warn(res);
        }
  
      }).catch(v=>{
        console.warn(v);
      });
    }else if(url == app.path.STOREINCOME){
      app.api.GET({},config.Project+_id+'/storeoperateinfo').then(res=>{
        if(res.result_text == "success" && res.result == 3){
          this.setData({
            fundinfo :res.data,
            userInfo: path,
            showComment: 3
          });
          wx.setNavigationBarTitle({
            title: '日报表'
          })
        }else{
          console.warn(res);
        }
  
      }).catch(v=>{
        console.warn(v);
      });
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
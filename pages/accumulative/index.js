// pages/accumulative/index.js
const config = require('../../api/index.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgList:[],
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that =this;
    that.getFunds();
    wx.getStorage({
      key: 'USER',
      success: function (res) {
        console.log(res.data);
        that.setData({
          userInfo: res.data
        });
      }
    })
  },
  getFunds(){
    app.api.GET({},config.Funds).then(res=>{
      if(res.result_text == "success" && res.result == 3){
        this.setData({
          msgList: res.data
        })
      }else{
        console.warn(res);
      }

    }).catch(v=>{
      console.warn(v);
    });
  },
  gotoOnce(e){
    let _id = e.currentTarget.dataset.id,_name=e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '/'+app.path.COMMONLIST+'?id='+_id+'&&path='+'pages/bonuslist/index'+'&name='+_name
    });
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
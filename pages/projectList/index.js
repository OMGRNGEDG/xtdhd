// pages/projectList/index.js
const config = require('../../api/index.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgList:[],
    page: 1,
    loading: false,
    showLoad: false,
    totalRecord: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
  },
  getList(){
    const that = this ;
    let data =  {
      per_page: 10,
      page: that.data.page
    }
    app.api.GET(data, config.Project+'-1/list').then(res => {
      if (res.result == 3 && res.result_text == 'success') {
        let _page = that.data.page;
        if (_page * 10 < res.totalRecord) {
          _page++
        }
        let _msg = that.data.msgList;
        res.data.forEach(ele => {
          _msg.push(ele)
        });
        that.setData({
          msgList: _msg,
          totalRecord: res.totalRecord,
          page: _page,
          loading: false
        });
      } else {
        wx.showToast({
          title: res.result_text,
          icon: 'none',
          duration: 500
        });
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
  joinActive(e){
    console.log(e.target.dataset.id)
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
    const that = this;
    let total = that.data.totalRecord;
    let _data = that.data.msgList.length;
    if (total == _data) {
      that.setData({
        showLoad: true
      });
      setTimeout(function () {
        that.setData({
          showLoad: false
        });
      }, 1000);
    } else {
      that.setData({
        loading: true
      })
      that.getList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
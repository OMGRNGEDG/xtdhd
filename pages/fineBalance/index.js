// pages/accumulative/index.js
const config = require('../../api/index.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgList: [],
    page: 1,
    totalRecord: null,
    loadmore: null,
    loading: false,
    showLoad: false,
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载 usermoney toFixed(2)
   */
  onLoad: function (options) {
    this.getFunds();
    let that = this;
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
  getFunds() {
    let _data = {
      page: this.data.page,
      per_page: 20
    }
    app.api.GET(_data, config.User + 'usermoney').then(res => {
      if (res.result_text == "success" && res.result == 3) {
        let _msg = this.data.msgList;
        res.data.forEach(ele => {
          let date = ele.createdate;
          date.sub
          let obj = {
            "moneytype": ele.moneytype == 1 ? "利息收益" : ele.moneytype == 2 ? "提现" : "分红收益",
            "createdate": date.substring(0, date.indexOf(" ")),
            "money": ele.money.toFixed(2),
            "status": ele.status == 1 ? "已打款" : "审核中",
            "balance": ele.balance.toFixed(2)
          }
          _msg.push(obj)
        });
        let _page = this.data.page;
        if (_page * 20 < res.totalRecord) {
          _page++
        }
        this.setData({
          msgList: _msg,
          page: _page,
          totalRecord: res.totalRecord,
          loading: false
        })
      } else {
        console.warn(res);
      }

    }).catch(v => {
      console.warn(v);
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
      that.getFunds(that.data.loadmore);
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
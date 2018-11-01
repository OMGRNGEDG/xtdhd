// pages/financelist/index.js
const config = require('../../api/index.js');
const app = getApp();
import * as echarts from '../../ec-canvas/echarts';
var XList = [],YList=[] ,chart=null;
var option ={
  label: {
    normal: {
      show: true
    }
 },
  // tooltip: {
  //   showContent: true,
  //   position: 'top'
  // },
  tooltip: {
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'cross' ,       // 默认为直线，可选为：'line' | 'shadow' | 'cross'
      axis : "x",
    }
  },
  grid: {
    left: 8,
    right: 10,
    bottom: 10,
    top: 40,
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: XList
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: YList,
    type: 'bar',
    itemStyle:{
        normal:{
            color:'#ee8541'
        }
    }
  }]
}

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var option1=option;
  chart.setOption(option1);
  return chart;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    totalRecord: null,
    msgList: [],
    loadmore: null,
    loading: false,
    showLoad:false,
    ec: {
      onInit: initChart
    },
    userName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOperateChart(options.id);
    this.setData({
      loadmore: options.id,
      userName: options.projectname
    })
  },
  getOperateChart(token) {
    // 请求echarts
    app.api.GET({}, config.Project + token + '/OperateChart').then(res => {
      if (res.result_text == "success" && res.result == 3) {
        let _echarX = [], _echarY = [];
        res.data.forEach(ele => {
          XList.push(ele.month + '月');
          YList.push(ele.turnover);
        });
        this.getOperate(token);
        setTimeout(function (){
          // console.log(XList);
           chart.setOption(option);  //赋值后再设置一次option
         },10); 
      } else {
        console.warn(res);
      }

    }).catch(v => {
      console.warn(v);
    });

  },
  getOperate(options) {
    // 获取获取该项目财务月报表列表 Project
    let _data = {
      page: this.data.page,
      per_page: 20
    }
    app.api.GET(_data, config.Project + options + '/operate').then(res => {
      if (res.result_text == "success" && res.result == 3) {
        let msg = this.data.msgList;
        res.data.forEach(element => {
          msg.push(element);
        });
        let _page = this.data.page;
        if (_page * 20 < res.totalRecord) {
          _page++
        }
        this.setData({
          totalRecord: res.totalRecord,
          msgList: msg,
          page: _page,
          loading: false
        });
      } else {
        console.warn(res);
        this.setData({
          msgList: null
        });
      }

    }).catch(v => {
      console.warn(v);
    });

  },
  gotoOnce(e){
    let _id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/commonList/index?id='+_id+'&&path='+'pages/financelist/index'+'&name='+this.data.userName
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
    const that = this ;
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
      that.getOperate(that.data.loadmore);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
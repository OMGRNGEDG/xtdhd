// pages/formList/index.js
const utils = require('../../utils/util.js');
const config = require('../../api/index.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    constUser: {},
    countryIndex: "",
    countries: ['众筹', '债券'],
    userPhone: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      constUser: options
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let { value } = e.detail;
    let msg =  e.detail.value;
    if(!msg.name){
      utils.toast("请填写用户姓名", 2000);
      return
    }
    if(!utils.isPoneAvailable(msg.phone)){
      utils.toast("请输入正确的手机号！", 2000);
      return
    }
    if(!msg.cumcode){
      utils.toast("请填写验证码", 2000);
      return
    }
    if(!utils.checkEmail(msg.email)){
      utils.toast("请填写正确的邮箱账户！", 2000);
      return
    }
    if(!this.data.countryIndex){
      utils.toast("请选择众筹类型！", 2000);
      return
    }
    if(!msg.cfnumber){
      utils.toast("请填写预约股数！", 2000);
      return
    }
    let contenttype = "application/json-patch+json";
    let obj ={
      "projectid": this.data.constUser.id,
      "name": msg.name,
      "phone": msg.phone,
      "phonevalidcode": msg.cumcode,
      "email": msg.email,
      "cfnumber": msg.cfnumber,
      "cftype": msg.countryIndex == "众筹"?0:1
    }
    app.api.POST(obj,config.Predeter,contenttype).then(res => {
      if(res.result_text == "success"&& res.result==3){
        utils.toast('已提交！', 2000);
      }else{
        utils.toast(res.result_text, 2000);
      }
    }).catch(v => {
      console.warn(v);
    });
  },
  getCode() {
    const that = this;
    let _phone = that.data.userPhone;
    if (utils.isPoneAvailable(_phone)) {
      let data = {
        secret: config.CODE
      };
      app.api.GET(data, config.Predeter+'/'+_phone+'/getcode').then(res => {
        if (res.result == 3 && res.result_text == 'success') {
          utils.toast('验证码发送成功！', 2000);
          //开始倒计时60秒
          utils.toast('发送成功！');
        } else {
          utils.toast(res.result_text, 2000);
        }
      }).catch(v => {
        console.warn(v);
      });
    } else {
      utils.toast('请输入正确的手机号！');
    }
  },
  changePhone(e) {
    this.setData({
      userPhone: e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  bindCountryChange: function (e) {
    const that = this;
    let _data = that.data.countries, item = JSON.parse(e.detail.value);
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      countryIndex: _data[item]
    });
    console.log(that.data.countryIndex);
  },
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
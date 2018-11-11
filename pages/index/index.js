// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showText: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  goPositionEvent(e){
    console.log(e);
    let auth = e.detail.authSetting;
    console.log(auth);
    if (!auth['scope.writePhotosAlbum']) {
      wx.authorize({
        scope: 'scope.writePhotosAlbum',
        success () {
          // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
          console.log('设置OK')
        }
      })
    } 
  },
  saveVideo(){
    // wx.saveVideoToPhotosAlbum({
    //   filePath: 'https://wxapp01-1256037341.cos.ap-shanghai.myqcloud.com/video/027885d7-c04d-7ad5-b317-07df9254e584.mp4',
    //   success(res) {
    //     console.log(res.errMsg)
    //   },
    //   fail(msg) {
    //     console.log(msg)
    //   }
    // });
    wx.downloadFile({
      url: 'https://wxapp01-1256037341.cos.ap-shanghai.myqcloud.com/video/027885d7-c04d-7ad5-b317-07df9254e584.mp4', //仅为示例，并非真实的资源
      success(res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res) {
              wx.saveVideoToPhotosAlbum({
                filePath: res.tempFilePath,
                success(msg) {
                  console.log(msg)
                  wx.showLoading({
                    title: "视频已经下载系统相册！"
                  })
                },
                fail(msg) {
                  console.log(msg)
                }
              });
        }else{
          console.log(res)
        }
      }
    })
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
  signName(){
    this.setData({
      showText: !this.data.showText
    });
  },
  seeBook(){
    wx.navigateTo({
      url: '/pages/books/index'
    });
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
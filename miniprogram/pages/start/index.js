// pages/start/index.js
Page({
 
    /**
     * 页面的初始数据
     */
    data: {
      src:"../../images/topbj.jpg"
    },
    bindTapRouterHandle(routerType){
       
        wx.navigateTo({
            url: routerType == 1 ? '/pages/index/index':'/pages/qrCode/index',
            success: function(res) {
              // 通过eventChannel向被打开页面传送数据
              res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
            }
          })
    },
    getPhoneNumber(e) {
      let routerType = e.currentTarget.dataset.type
      
      let self = this;
      wx.cloud.callFunction({
        name: 'getPhoneNumber',
        data: {
          weRunData: wx.cloud.CloudID(e.detail.cloudID),
        }
      }).then(res => {
        console.log('获取用户手机号-开始')
        let phoneNumber = res.result.phoneNumber
        wx.setStorageSync('phoneNumber', phoneNumber);
        wx.setStorageSync('userInfo', res.result);
        self.bindTapRouterHandle(routerType)
      
      }).catch(err => {
        console.error(err);
      });
    },

    
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
 
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
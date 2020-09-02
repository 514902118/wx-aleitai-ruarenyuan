let QRCode = require("../../utils/qrcode.js").default;

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    src: "../../images/topbj.jpg",
    qrtext: '',
    src2:''
  },
  onLoad: function (options) {
    console.log(12);
    
    this.getAccessTokenHandle(options);
    // console.log(QRCode);
    this.getScanCodeHandle();
  },

  /**
   * 查询信息方法
   */
  getScanCodeHandle(e) {
    var phoneNumber = wx.getStorageSync('phoneNumber');
    let self = this;
    console.log(typeof phoneNumber);
    let parm = {
      phoneNumber: phoneNumber,
    }
    wx.cloud.callFunction({
      name: "ScanCodeHandle",
      data: parm
    }).then((res) => {
      console.log("获取详情=================>成功");
      console.log(res.result[0])
      let {
        arrivalTime, backup1, backup2, backup3, backup4, backup5, credentialsType, departure, destination, id, idCard, phoneNumber, registerTime, trafficType, userName } = res.result[0];

      self.setData({
        arrivalTime, backup1, backup2, backup3, backup4, backup5, credentialsType, departure, destination, id, idCard, phoneNumber, registerTime, trafficType, userName
      });
    });
  },

  getAccessTokenHandle(options){
 
   wx.cloud.callFunction({
      name: 'getWechartCode',
      data: { 
        phoneNumber:wx.getStorageSync('phoneNumber')
      }
    }).then(res => {
      console.log(res.result.data.image);
      
      var base64 = res.result.data.image;
      if (base64) {
        base64 = base64.replace(/[\r\n]/g, "")
        this.setData({
          src2: 'data:image/png;base64,'+base64
        })
      }
     
      // let {accessToken,expires_in} = res.result.data;
      // this.requestCode(accessToken,expires_in,options)
    }).catch(err => {
      console.error(err);
    });
  },

  /**
   * 返回首页
   */
  backHome() {
    wx.redirectTo({ url: '/pages/start/index' });
  }
})

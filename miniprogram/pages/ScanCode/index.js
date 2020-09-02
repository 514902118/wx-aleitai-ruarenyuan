// pages/ScanCode/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        src: "../../images/topbj.jpg",
        //证件类型
        credentialsType: 0,
        credentialsTypeIndex: ["身份证", "护照", "其他"],
        idCard: '', //证件号码
        userName: '', //姓名
        phoneNumber: '', //手机号
        //来乌方式/车次
        trafficType: ['火车', '飞机'],
        trafficTypeIndex: 0, //来乌方式/车次
        //出发地
        customItem: [],
        detailed: '请选择',
        departure: '请选择出发地', //出发地
        destination: '请选择目的地', //目的地
        arrivalTime: '请选择抵达日期',  //抵达日期
        registerTime: '请选择登记时间',//登记时间
        backupArry: 0,
        backup_1: ['北京', '上海', '天津'], //过去14天是否到过以下地区
        isAgree: true, //本人承诺
    },

    /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function (options) {
        console.log(options);
        
        var phoneNumber = options.phoneNumber;
        this.getScanCodeHandle(phoneNumber)
    },
    getScanCodeHandle(phoneNumber) {
        
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

  
})
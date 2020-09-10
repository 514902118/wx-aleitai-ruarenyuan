Component({

  ready: function (options) {

    this.setData({
      phoneNumber: wx.getStorageSync('phoneNumber'),
      [`formData.phoneNumber`]: wx.getStorageSync('phoneNumber')
    });

    console.log(this.data);
    //获取过去14天是否到过以下地区数据
    this.dangerAreaList();

    //获取出发地方法
    this.getPlaceHandle();
  },

  data: {
    src: "../../images/topbj.jpg",
    //证件类型
    credentialsType: 0,
    credentialsTypeIndex: ["身份证", "护照", "其他"],
    idCard: '', //证件号码
    userName: '', //姓名
    phoneNumber: '', //手机号
    //来乌方式/车次
    trafficType: ['火车', '飞机','乘车'],
    trafficTypeIndex: 0, //来乌方式/车次
    //出发地
    customItem: [],
    detailed: '请选择',
    departureArry: 0, //出发地数据
    departure: '请选择出发地', //出发地
    destinationArry: [0,0], //目的地
    destination: [], //目的地
    arrivalTime: '请选择抵达日期',  //抵达日期
    registerTime: '请选择登记时间',//登记时间
    backupArry: 0,
    backup1: ['无'], //过去14天是否到过以下地区
    backup3: '',//车次/航班/车牌号
    backup3title:"车次",
    backup4: '请输入座位号',//座位号
    backup5: ['回家', '办事', '旅游', '其他'],//来阿目的
    backup5Index: 0,//来阿目的索引
    isAgree: false, //本人承诺
    //验证规则
    rules: [
      {
        name: 'credentialsType',
        rules: { required: true, message: '请选择证件类型~' },
      }, {
        name: 'idCard',
        rules: {
          validator: (rule, value, param, models) => {
            let reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
            if (value) {
              if (!reg.test(value)) {
                return '请输入正确的证件号码~';
              }
            } else {
              return '请输入证件号码~';
            }
          }
        }
      }, {
        name: 'userName',
        rules: { required: true, message: '请输入姓名~' },
      }, {
        name: 'phoneNumber',
        rules: [{ required: true, message: '请输入联系电话' },
        { mobile: true, message: '手机号格式不正确' }],
      }, {
        name: 'trafficType',
        rules: [{ required: true, message: '请选择来乌方式' }],
      }, {
        name: 'backup3',
        rules: [{ required: true, message: '请输入车次/航班/车牌号' }],
      }, {
        name: 'backup4',
        rules: [{ required: true, message: '请输入座位号' }],
      }, {
        name: 'backup5',
        rules: { required: true, message: '请选择来阿目的' },
      }, {
        name: 'departure',
        rules: { required: true, message: '请选择出发地' },
      }, {
        name: 'destination',
        rules: { required: true, message: '请选择目的地' },
      }, {
        name: 'arrivalTime',
        rules: { required: true, message: '请选择抵达日期' },
      },
      {
        name: 'isAgree',
        rules: { required: true, message: '请选择本人承诺' },
      }],
    //提交数据
    formData: {
      credentialsType: '0',
      trafficType: '0',
      backup1: '北京',
      isAgree: true,
      registerTime: '2017-08-01',
      backup5:'回家'
      
    }
  },
  methods: {

    /**
    * 证件类型
    * @param {*} e 
    */
    bindAccountChange: function (e) {
      console.log('picker account 发生选择改变，携带值为', e.detail.value);
      this.setData({
        credentialsType: e.detail.value,
        [`formData.credentialsType`]: e.detail.value
      })
    },

    /**
     * 来乌方式
     * @param {*} e 
     */
    bindTrafficTypeChange: function (e) {
      console.log(e);
      var bakuparry = {
        '0':'车次',
        '1':'航班号',
        '2':'车牌号'
        }
      console.log(bakuparry[e.detail.value]);
      this.setData({
        trafficTypeIndex: e.detail.value,
        backup3title: bakuparry[e.detail.value],
        [`formData.trafficType`]: e.detail.value
      });
    },

    /**
     * 来阿目的
     * @param {*} e 
     */
    bindbackup5Change(e){
      console.log(e);
      var bakup5arry = {
        '0': '回家',
        '1': '办事',
        '2': '旅游',
        '3':'其他'
      }
     
      this.setData({
        backup5Index: e.detail.value,
        [`formData.backup5`]: bakup5arry[e.detail.value]
      });
      console.log(bakup5arry[e.detail.value]);
      console.log(this.data.formData.backup5);
    },

    /**
     * 抵达日期
     * @param {*} e 
     */
    bindDateChange: function (e) {
      this.setData({
        arrivalTime: e.detail.value,
        [`formData.arrivalTime`]: e.detail.value
      })
    },

    /**
     * 登记时间
     * @param {*} e 
     */
    bindRegisterTimeChange: function (e) {
      this.setData({
        registerTime: e.detail.value,
        [`formData.registerTime`]: e.detail.value
      })
    },

    /**
     * 输入框取值方法
     * @param {*} e 
     */
    formInputChange(e) {
      const { field } = e.currentTarget.dataset
      this.setData({
        [`formData.${field}`]: e.detail.value
      })
    },

   
    /**
     * 出发地
     * @param {*} e 
     */
    bindDepartureChange(e) {
     
      var res = e.detail.value[0] + e.detail.value[1] + e.detail.value[2]
      console.log(res);
      this.setData({
        departure: res,
        [`formData.departure`]: res
      });
    },

     /**
     * 目的地数据获取方法
     * @param {} e 
     */
    getPlaceHandle() {
      wx.cloud.callFunction({
        name: "placeHandle",
        data: {}
      }).then((res) => {
        console.log("出发地数据获取方法=================>成功");
        var arr2 = res.result.map(item => {
          return item.county
        });
        var arr0 = [];
         arr0[0] =  [res.result[0].city]
         arr0[1] = arr2;
        console.log(arr0)
        console.log(res.result)
        this.setData({  
          destination:arr0,
          [`formData.destination`]: arr0[0][0]+arr0[1][1]
         });
       

        destination:this.data.destination[0][0]+this.data.destination[1][1]
      });
    },

    /**
     * 目的地
     * @param {*} e 
     */
    bindRegionChange: function (e) {
      console.log(e);
     
      console.log([e.detail.value[0],e.detail.value[1]])
      this.setData({
        destinationArry: [e.detail.value[0],e.detail.value[1]],
        [`formData.destination`]: this.data.destination[0][e.detail.value[0]]+this.data.destination[1][e.detail.value[1]]
      })
      console.log(this.data.destination);
      console.log(this.data.destination[0][e.detail.value[0]]+this.data.destination[1][e.detail.value[1]]);
      
    },

    /**
     * 获取过去14天是否到过以下地区数据
     * @param {*} e 
     */
    dangerAreaList: function () {
      wx.cloud.callFunction({
        name: "dangerAreaList",
        data: {}
      }).then((res) => {
        console.log("获取过去14天是否到过以下地区数据=================>成功");
        console.log(res.result)
        var arr = res.result.map(item => item.province + item.city + item.county);
        
        this.setData({
          backup1:this.data.backup1.concat(arr)
        })
      });
    },

    /**
     * 过去14天是否到过以下地区
     * @param {*} e 
     */

    bindbackupChange: function (e) {
      console.log(e);
      var backup1 = e.detail.value !=0 ? this.data.backup1[e.detail.value]:''
      this.setData({
        backupArry: e.detail.value,
        [`formData.backup1`]:  backup1
      });
    },

    /**
     * 本人承诺
     * @param {*} e 
     */
    bindAgreeChange: function (e) {
      this.setData({
        isAgree: !!e.detail.value.length,
        [`formData.isAgree`]: !!e.detail.value.length
      });
    },

    /**
     * 数据提交
     */
    submitForm() {
      let self = this;
      console.log(self.data)

      this.selectComponent('#form').validate((valid, errors) => {
        console.log('valid', valid, errors)
        if (!valid) {
          const firstError = Object.keys(errors)
          if (firstError.length) {
            this.setData({
              error: errors[firstError[0]].message
            });
          }
        } else {
          wx.showToast({
            title: '校验通过'
          })
          self.submitHandle(self.data.formData)
        }
      })
    },

    /**
     * 提交远程方法
     */
    submitHandle(form) {
      console.log(form)
      wx.cloud.callFunction({
        name: "submitHandle",
        data: form
      }).then((res) => {
        if(res.result.code == 0){
            console.log("提交远程方法=================>成功");
            console.log(res.result)
            wx.navigateTo({
              url: '/pages/qrCode/index',
              success: function (res) { }
            })
        }
        
      });
    }

  }
});

// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
    var phoneNumber = event.weRunData.data.phoneNumber;
    var userInfo = event;
    return {
        phoneNumber,
        userInfo
    }
  }
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event) => {
    var rp = require('request-promise');
    let { arrivalTime, backup1, backup2, backup3, backup4, trafficType, credentialsType,registerTime, departure, destination, idCard, isAgree, phoneNumber, userName } = event;
    var options = {
        method: 'POST',
        uri: 'http://39.105.58.173:18082/system/info/addUserSave',
        body: {
            arrivalTime,
            backup1,
            backup2,
            backup3,
            backup4,
            credentialsType,
            departure,
            destination,
            idCard,
            isAgree,
            phoneNumber,
            userName,
            registerTime,
            trafficType
        },
        json: true
    };
    // const wxContext = cloud.getWXContext()

    return rp(options).then(function (parsedBody) {
        return parsedBody
    })
        .catch(function (err) {
            return err
        });

    // return {
    //     msg:"云函数调用成功",
    //     event,
    //     openid: wxContext.OPENID,
    //     appid: wxContext.APPID,
    //     unionid: wxContext.UNIONID,
    // }
}
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event) => {
    var rp = require('request-promise');
    let { phoneNumber } = event;
    var options = {
        method: 'POST',
        uri: 'http://39.105.58.173:18082/system/info/byPhone',
        body: {
            phoneNumber
        },
        json: true
    };
    // const wxContext = cloud.getWXContext()

    return rp(options).then(function (parsedBody) {
        return parsedBody
    }).catch(function (err) {
        return event
    });
}
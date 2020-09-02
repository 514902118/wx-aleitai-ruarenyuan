// 云函数入口文件
const cloud = require('./node_modules/wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event) => {
    var rp = require('./node_modules/request-promise');
    let {phoneNumber} = event;
    var options = {
        method: 'POST',
        uri: 'http://39.105.58.173:18082/system/wechat/getAccessToken',
        body: {
            phoneNumber
        },
        json: true
    };
    // const wxContext = cloud.getWXContext()
    console.log("base==================================>");
    console.log()
    
    return rp(options).then(function (parsedBody) {
        console.log(parsedBody)
        return parsedBody
    }).catch(function (err) {
        return {
            err
        }
    });
}
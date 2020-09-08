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
        uri: 'http://106.124.136.211:18082/system/area/dangerAreaList',
        body: {},
        json: true
    };
    return rp(options).then(function (parsedBody) {
        console.log(parsedBody)
        return parsedBody
    }).catch(function (err) {
        return {
            err
        }
    });
}
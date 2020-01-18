var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UvInfo = new Schema({
    clientID: {
        type: String,
        required: true
    },
    appID: {
        type: String,
        required: true
    },
    ipAddr: {
        type: String,
        required: true
    },
    country: {
        type: String,
    },
    province: {
        type: String,
    },
    city: {
        type: String,
    },
    isp: {
        type: String,
    },
    visitTime: {
        type: Date,
        required: true
    },
});

const saveUvInfo = (uvinfo) => {
    return new Promise((resolve, reject) => {
        uvinfo.save((err) => {
            if (err) {
                console.log(err);
                reject(false)
            }
            resolve(true);
        })
    })
}

// 创建一个model
var UvInfo = mongoose.model("uvInfo", UvInfo);

module.exports = { UvInfo,saveUvInfo};
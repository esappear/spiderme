/**
 * Created by qingcheng on 16/5/13.
 */

var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');

var requrl = 'http://cloud.qingchengfit.cn';
request(requrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // console.log(body);
        acquireData(body);
    }
});

function acquireData(data) {
    var $ = cheerio.load(data);

    var meizi = $('img').toArray();
    var len = meizi.length;
    for (var i = 0; i < len; i++) {
        var imgsrc = requrl + meizi[i].attribs.src;
        var filename = parseUrlForFileName(imgsrc);  //生成文件名
        downloadImg(imgsrc, filename, function () {
            console.log(filename + ' done');
        });
    }
}

function parseUrlForFileName(address) {
    return path.basename(address);
}

var downloadImg = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        // console.log('content-type:', res.headers['content-type']);  //这里返回图片的类型
        // console.log('content-length:', res.headers['content-length']);  //图片大小
        if (err) {
            console.log('err: ' + err);
            return false;
        }
        console.log('res: ' + res);
        request(uri).pipe(fs.createWriteStream('images/' + filename)).on('close', callback);
    });
};

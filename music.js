/**
 * Created by YXP on 16/7/17.
 */
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var reqUrl = 'http://music.163.com/song/';
var num = 100, base = 186000;
var datas = [];

while (num >= 0) {
    requestData(base + num);
    num--;
}


function requestData(id) {
    request(reqUrl + id, function (error, res, body) {
        if (!error && res.statusCode == 200) {
            datas.push(acquireData(body));
            console.log(reqUrl + id + ' request success!');
            fs.writeFile('info.json', JSON.stringify(datas));
        }
    }).pipe(fs.createWriteStream('html/'+ id + '.html'));
}

function acquireData(data) {
    var $ = cheerio.load(data);
    var title = $('.tit .f-ff2').text();
    var authorInfos = $('.cnt p .s-fc7');

    var data = {
        title: title,
        author: $(authorInfos[0]).text(),
        album: $(authorInfos[1]).text()
    };
    return data;
}

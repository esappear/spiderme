var request = require('request');
var cheerio = require('cheerio');

var reqUrl = 'http://www.lagou.com/jobs/1823303.html';
request(reqUrl, function (error, res, body) {
    console.log(body);
    // console.log(res);
});
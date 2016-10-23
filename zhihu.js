/**
 * Created by qingcheng on 16/5/14.
 */
var request = require('request');
var cheerio = require('cheerio');
var db = require('db');

var reqUrl = 'https://www.zhihu.com/question/40293994';
request(reqUrl, function (error, res, body) {
    if (!error && res.statusCode == 200) {
        acquireData(body);
    }
});

function acquireData(data) {
    var $ = cheerio.load(data);

    var title = $('.zm-item-title').text();
    var answersCount = $('#zh-question-answer-num').data('num');
    // console.log(title);
    // console.log(answersCount);

    var arr = [];
    $('.zm-item-answer').each(function (ele, key) {
        //回答内容,回答用户,点赞数
        var html = $(this).find('.zm-editable-content').html();
        var userId = $(this).data('aid');
        var voteCount = $(this).find('.zm-item-vote-info').data('votecount');
        // console.log(html);
        arr.push({
            html: html,
            userId: userId,
            voteCount: voteCount
        });
    });

    var question = {
        title: title,
        answerCount: answersCount,
        answer: arr
    };
    console.log(question);

}

function Question(id, title, answerCount, answer) {
    this.id = id;
    this.title = title;

}

function Answer(id, user) {

}
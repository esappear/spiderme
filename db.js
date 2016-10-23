/**
 * Created by qingcheng on 16/5/15.
 */
var settings = require('settings');
var mongodb = require('mongodb'),
    Db = mongodb.Db,
    server = mongodb.Server;

module.exports = new Db(settings.db, new Server(settings.host, settings.port),
 {safe: true});
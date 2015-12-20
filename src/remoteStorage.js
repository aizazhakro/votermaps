'use strict';

var windowObject = require('./window'),
    request = require('request'),
    Promise = require('promise');

function host() {
    return window.location.protocol + '//' + window.location.host + '/';
}

module.exports = {
    get : function(key) {
        var promise = new Promise(function (resolve, reject) {
            request(host() + key , {protocol:'http:'}, function (err, res, body) {
                if (res.statusCode !== 200) reject(res.statusCode + '\n' + res.statusMessage);
                else resolve(JSON.parse(body));
            });
        });
        return promise;
    }
};
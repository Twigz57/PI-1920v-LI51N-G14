'use strict'
var Request = require("request");
Request = Request.defaults(
    {
        qs: {
            'format': 'json',
           // 'client_id': 'RkUF0fTUqM'
        }
    }
)
/**
    * @module lastfm-data- This module contains the connection to the last.fm API Documentation
    * @var {JSONData}  - The Object that contians the methods to make http requests.
   */
module.exports.JSONData = {
    baseURL: "https://api.themoviedb.org/3/tv/",
    getTvShows: function (params, callback) {
        const options = {
            url: (this.baseURL + "popular?api_key=940c7ca5b74c11a1794d676f48f8494e&language=en-US&page=1"),
            method: 'GET'
        };
        Request(options, (err, res, body) => {
            return callback(res.statusCode, err, JSON.parse(body))
        });

    },
    getTvShow: function (params, callback) {
        const options = {
            url: (this.baseURL + `search/tv?api_key=940c7ca5b74c11a1794d676f48f8494e&language=en-US&page=1&query=${params.name}`),
            method: 'GET',
        };
        Request(options, (err, res, body) => {
            return callback(res.statusCode, err, JSON.parse(body))
        });

    },
}         
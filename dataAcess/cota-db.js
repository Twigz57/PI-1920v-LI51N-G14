'use strict'
var Request = require("request");
Request = Request.defaults(
    {
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }
    }
)
/**
     * @module cota-db - This module contains the connection to the ElasticSearch Database
     * @var {DBAaccess}  - The Object that contians the methods to make http requests to the DataBase.
    */

module.exports.DBAaccess = {
    baseURL: "http://localhost:9200/cota",
    createGroup: function (id, body, callback) {
        body = JSON.stringify(body);
        const options = {
            url: (this.baseURL + `/groups/${id}`),
            method: 'POST',
            body: body
        };
        Request(options, (err, res, body) => {
            return callback({ "statusCode": res.statusCode, "body": JSON.parse(res.body) });
        });

    },
    getAllGroups: function (callback) {
        const options = {
            url: (this.baseURL + '/groups/_search'),
            method: 'GET',
        };
        Request(options, (err, res, body) => {
            return callback(res.statusCode, err, JSON.parse(body))
        });

    },
    getGroupsByID: function (id, callback) {
        const options = {
            url: (this.baseURL + `/groups/${id}`),
            method: 'GET',
        };
        Request(options, (err, res, body) => {
            return callback(res.statusCode, err, JSON.parse(body))
        });

    },
    updateGroups: function (id, body, callback) {
        body = JSON.stringify(body);
        const options = {
            url: (this.baseURL + `/groups/${id}`),
            method: 'PUT',
            body: body
        };
        Request(options, (err, res, body) => {
            return callback({ "statusCode": res.statusCode, "body": JSON.parse(res.body) });
        });

    }
}


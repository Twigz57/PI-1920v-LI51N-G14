'use strict'
var Request = require("request");
const fetch = require('node-fetch')
var URL = require('url').URL;

Request = Request.defaults(
    {
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }
    }
)
/**
     * @module auth-db- This module contains the connection to the ElasticSearch Database
     * @var {DBAaccess}  - The Object that contians the methods to make http requests to the DataBase.
    */

module.exports.DBAaccess = {
    baseURL: "http://localhost:9200/users/user",
    postUser: async function (username, password) {
        let body = JSON.stringify({ "username": username, "password": password });
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body
        };
        var url = new URL(this.baseURL);
        // Return new promise
        return fetch(url, options)
            .then(requestAux)
    },
    getAllUsers: async function () {
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        var url = new URL(this.baseURL + '/_search');
        // Return new promise
        return fetch(url, options)
            .then(requestAux)
    },
    getUserByID: async function (id) {
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        var url = new URL(this.baseURL + `/${id}`);
        // Return new promise
        return fetch(url, options)
            .then(requestAux)
    },
    deleteUser: async function (id) {
        const options = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        var url = new URL(this.baseURL + `${id}`);
        // Return new promise
        return fetch(url, options)
            .then(requestAux)
    },
}

//aux fucntion to make requests
async function requestAux(res) {
    let jsonObj = await res.json();
    return new Promise(function (resolve, reject) {
        resolve({ statusCode: res.status, body: jsonObj });
    })
}


var UrlMaker = {
    url: {},
    new(uri) {
        UrlMaker.url = new URL(uri)
        UrlMaker.url.searchParams.append('format', 'json')
        UrlMaker.url.searchParams.append('api_key', "56bb17cf0d9c392dbb7e24ca955c8cb7")
        return UrlMaker
    },
    add: function (obj) {
        UrlMaker.url.searchParams.append(obj.param, obj.value);
        return UrlMaker;
    },
    get: function () {
        return UrlMaker.url;
    }

}

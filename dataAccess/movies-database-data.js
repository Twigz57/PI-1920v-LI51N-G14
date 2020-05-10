'use strict'
const fetch = require('node-fetch')
var URL = require('url').URL;

/**
    * @module movies-databse-data - This module contains the connection to the last.fm API Documentation
    * @var {JSONData}  - The Object that contians the methods to make http requests.
   */

module.exports.JSONData = {
    baseURL: "https://api.themoviedb.org/3/",
    getTvShows: async function (params) {
        const options = {method: 'GET'}
    let url =new URL(this.baseURL +"tv/popular?api_key=940c7ca5b74c11a1794d676f48f8494e&language=en-US&page=1")

    return fetch(url,options)
    .then(requestAux)

    },
    getTvShow: async function (params) {
        const options = { method: 'GET'};
        let url  = new URL (this.baseURL + `search/tv?api_key=940c7ca5b74c11a1794d676f48f8494e&language=en-US&page=1&query=${params.query}`)
       
        return fetch(url,options)
        .then(requestAux)
    }
}         


async function requestAux(res) {
    let jsonObj = await res.json();
        return new Promise(function (resolve, reject) {
            resolve({ statusCode: res.status, body: jsonObj });
        })
}
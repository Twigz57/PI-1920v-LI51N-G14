'use strict'
const fetch = require('node-fetch')
var URL = require('url').URL;
/**
     * @module cota-db - This module contains the connection to the ElasticSearch Database
     * @var {DBAaccess}  - The Object that contians the methods to make http requests to the DataBase.
    */

module.exports.DBAaccess = {

    baseURL: "http://localhost:9200/cota",
    createGroup: async function (id, body) {
        console.log('\n'+"DBAaccess-body.owner"+'\n'+body.owner+'\n')
        body.owner= body.owner == 2 ? getCookie("user_cookie") : ""
        console.log('\n'+"DBAaccess-body.owner"+'\n'+body.owner+'\n')
        body = JSON.stringify(body);
        const options = {
            method: 'POST',
            body: body,
            headers: { 'Content-Type': 'application/json' }
        };
        var url = new URL(this.baseURL+`/groups/${id}`);
        
        return fetch(url,options)
        .then(requestAux)

    },

    getAllGroups: async function (callback) {
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        var url = new URL(this.baseURL+'/groups/_search');
        // Return new promise
        return fetch(url,options)
        .then(requestAux)

    },

    getGroupsByID: function (id, callback) {
         const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        var url = new URL(this.baseURL+`/groups/${id}`);

        // Return new promise
        return fetch(url,options)
        .then(requestAux)
    },
    updateGroups: function (id, body, callback) {
        body = JSON.stringify(body);
        const options = {
            method: 'PUT',
            body: body,
            headers: { 'Content-Type': 'application/json' }
        };
        
        var url = new URL(this.baseURL+`/groups/${id}`);
        // Return new promise
        return fetch(url,options)
        .then(requestAux)

    },
    getCookie: function(cname) { //user_name
        return getCookie(cname);
    }
    
}

//window.addEventListener('DOMContentLoaded', yourFunction, false);

function getCookie(cname) { //user_name
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
    //return localStorage.getItem("user_name")
}

async function requestAux(res) {
    let jsonObj = await res.json();
        return new Promise(function (resolve, reject) {
            resolve({ statusCode: res.status, body: jsonObj });
        })
}


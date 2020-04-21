'use strict'
/**
     * @module foca-server - This module is the entry poit of the YAMA APP it takes the requests
     *  and sends responses to the client it uses the Router execute a specific command
*/

console.log("hullo");
const http = require('http');
const cota_data = require('./dataAccess/movies-database-data.js').JSONData;
const db_connection = require('./dataAccess/cota-db.js').DBAaccess;
const services = require('./cota-services.js')(cota_data,db_connection);
const Router = require('./api/cota-web-api.js')(services);

http://localhost:3000
Router.addRoutes();

const server = http.createServer((request, response) => {
  var params = setParams(request.url);
  var url = request.url.split('?');
  var cmd = Router.checkRoutes(request.method, url[0]);
  var ids = url[0].match(/\d+/g);      //get all ids
  //console.log(cmd);a
  //if (cmd != null) {
    Router.execute(ids, cmd, params, function (obj) {
      response.statusCode = obj.statusCode;
      response.setHeader('Content-Type', 'application/json');
      response.write(JSON.stringify(obj.body));
      response.end();
    });

  /*} else {
    response.statusCode = 404;
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify("404 PAGE NOT FOUND"));
    response.end();
  }*/
}).listen(3000);

var setParams = function (url) {
  var params = [];
  var arr = url.split('?');
  if (arr[1] === undefined) return;
  var arr = arr[1].split('&');
  for (var value of arr) {
    value = value.split('=');
     //to replace the &20 with 'SPACE'
    params[(value[0])] = value[1].replace(/%20/g, " "); 
  }
  var toRet = Object.assign({}, params);
  return toRet;
}
'use strict'
/**
     * @module foca-server - This module is the entry poit of the YAMA APP it takes the requests
     *  and sends responses to the client it uses the Router execute a specific command
*/

class Routers {
  constructor() {
    this.global = express.Router()
    this.specific = express.Router()
  }
}

const express = require('express')
const cota_data = require('./dataAccess/movies-database-data.js').JSONData;
const db_connection = require('./dataAccess/cota-db.js').DBAaccess;
const services = require('./cota-services.js')(cota_data,db_connection);
const routes = require('./api/cota-web-api.js')(services, new Routers());

const PORT = 3000;
const HOST = "localhost"

var app = express()
//rsvar routes = require('./api/yama-web-api.js')()

app.use(express.json())
app.use('/', routes.specific)

app.listen(PORT, HOST, onListen)

function onListen(err) {
  if (err) {
    console.log(err)
  }
  console.log(`Server listening on port ${PORT}. Entry point is http://${HOST}:${PORT}/`)
}

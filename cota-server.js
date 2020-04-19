'use strict'
/**
     * @module cota-server - This module is the entry poit of the YAMA APP it takes the requests
     *  and sends responses to the client it uses the Router execute a specific command
*/
console.log("hullo");


class Routers {
  constructor() {
    this.global = express.Router()
    this.specific = express.Router()
  }
}

var path = require('path')

//dependency injection

const movies_database_data = require('./dataAccess/cota-database-data.js').JSONData;
const db_connection = require('./dataAccess/cota-db.js').DBAaccess;
const services = require('./cota-services.js')(movies_database_data, db_connection);
const expressSession = require('express-session');

var express = require('express')

var app = express()
const routes = require('./api/cota-web-api.js')(services, new Routers());///index.js

const PORT = 3000;
const HOST = "localhost"

app.use(cookieParser())
app.use(express.json())
app.use(expressSession({secret: 'keyboard cat', resave: false, saveUninitialized: true }))
app.use('/', express.static(path.join(__dirname, "dist")))
app.use('/', routes.specific)


app.listen(PORT, HOST, onListen)

function onListen(err) {
  if (err) {
    console.log(err)
  }
  console.log(`Server listening on port ${PORT}. Entry point is http://${HOST}:${PORT}/`)
}
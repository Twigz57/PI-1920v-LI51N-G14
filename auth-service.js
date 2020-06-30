'use strict'
var db_connection  = require('./dataAccess/auth-db.js').DBAaccess;

module.exports.authenticate = async function(username, pass) {
  return new Promise(async function(resolve, reject) {
    await db_connection.getAllUsers()
    .then(({statusCode:statusCode, body:body}) => {
      for(var usr of body.hits.hits) {
        if(usr._source.username==username && usr._source.password==pass ){
          resolve({_id: usr._id, user: usr._source.username});
          //setCookie("user_cookie",usr._source.username)
        }
      }
      return reject({statusCode:400,body: "No login"});
    })
    .catch((err) => {
      reject(err)
    });  
  })
}

module.exports.createUser = async function(fullname, username, pass) {
  return new Promise(async function(resolve, reject) {
    await db_connection.postUser(username, pass)
    .then(({statusCode:statusCode, body:body}) => {
      resolve({_id: body._id, user: username});
    })
    .catch((err) => {
      reject(err)
    });  
  })
}


module.exports.getUser = async function(userId) {
  return new Promise(async function(resolve, reject) {
    await db_connection.getUserByID(userId)
    .then(({statusCode:statusCode, body:body}) => {
      resolve({_id: body._id, user: body._source.username});
    })
    .catch((err) => {
      reject(err)
    });  
  })
}


module.exports.logput = async function(userId) {
  {
    return new Promise(async function(resolve, reject) {
      await db_connection.deleteUser(userId)
      .then(({statusCode:statusCode, body:body}) => {
        resolve({_id: body._id, user: username});
      })
      .catch((err) => {
        reject(err)
      });  
    })
  }
}

"use strict";
let movies_database_data;
let db_connection;

module.exports = function (data, connection) {
  movies_database_data = data;
  db_connection = connection;
  return module.exports;
};

module.exports.getTvShows = async function (params) {
  return new Promise(async function (resolve, reject) {
    await movies_database_data
      .getTvShows(params)
      .then(({ statusCode: statusCode, body: body }) => {
        var jsonObj = body.results;
        var toRet = {};
        var key = "TV Shows";
        toRet[key] = [];
        for (var item of jsonObj) {
          toRet[key].push({
            Name: item.name,
            Vote_Average: item.vote_average,
            Vote_Count: item.vote_count,
            Overview: item.overview,
            Id: item.id,
            First_Air_Date: item.first_air_date,
            Genre_Ids: item.genre_ids,
          });
        }
        resolve(toRet);
      })
      .catch((err) => {
        console.log(err);
        reject({ statusCode: 400, body: "No Artists With this name" });
      });
  });
};

module.exports.getTvShow = async function (params) {
  return new Promise(async function (resolve, reject) {
    await movies_database_data
      .getTvShow(params)
      .then(({ statusCode: statusCode, body: body }) => {
        if (statusCode === 400)
          return { statusCode: 400, body: "No TvShow(s) with this name" };
        var jsonObj = body.results;
        console.log(jsonObj);
        var toRet = {};
        var key = "TV Show";
        toRet[key] = [];
        for (var item of jsonObj) {
          toRet[key].push({
            Name: item.name,
            Vote_Average: item.vote_average,
            Vote_Count: item.vote_count,
            Overview: item.overview,
            Id: item.id,
            First_Air_Date: item.first_air_date,
            Genre_Ids: item.genre_ids,
          });
        }
        resolve(toRet);
      })
      .catch((err) => {
        reject({ statusCode: 500, body: "WebApiError" });
      });
  });
};

module.exports.getGroups = async function () {
  return new Promise(async function (resolve, reject) {
    await db_connection
      .getAllGroups()
      .then(({ statusCode: statusCode, body: body }) => {
        if (statusCode === 404)
          return { statusCode: 404, body: "No groups yet!" };
        var toRet = {};
        var key = "Groups: ";
        toRet[key] = [];
        for (var item of body.hits.hits) {
          let aux = item._source;
          aux = {
            name: aux.name,
            description: aux.description,
            id: aux.id,
            TV_Shows: aux.TV_Shows,
          };
          toRet[key].push(aux);
        }
        resolve(toRet);
      })
      .catch((err) => {
        console.log(err);
        reject({ statusCode: 500, body: "WebApiError" });
      });
  });
};

module.exports.getGroupsByID = async function (ids) {
  return new Promise(async function (resolve, reject) {
    await db_connection
      .getGroupsByID(ids)
      .then(({ statusCode: statusCode, body: body }) => {
        if (statusCode === 404)
          return { statusCode: 404, body: "No Group with this id" };
        var toRet = {};
        var key = body._source.name + " group";
        toRet[key] = [];
        let aux = body._source;
        console.log(body._source);
        aux = {
          name: aux.name,
          description: aux.description,
          id: aux.id,
          TV_Shows: aux.TV_Shows,
        };
        toRet[key].push(aux);
        resolve(toRet);
      })
      .catch((err) => {
        console.log(err);
        reject({ statusCode: 500, body: "WebApiError" });
      });
  });
};

module.exports.postGroup = async function (params) {
  return new Promise(async function (resolve, reject) {
    await db_connection
      .getAllGroups()
      .then(async function ({ statusCode: statusCode, body: body }) {
        var nextID = 0;
        if (statusCode != 404) {
          nextID = body.hits.hits.reduce(function (p, v) {
            return Number(p._id) > Number(v._id) ? p : v;
          })._id;
        }
        nextID++;
        var toRet = {};
        var toRet = {
          id: nextID,
          name: params.name,
          description: params.description,
          TV_Shows: [],
        };
        var db_output = await db_connection.createGroup(nextID, toRet);
        return resolve(db_output.body);
      })
      .catch((err) => {
        console.log(err);
        reject({ statusCode: 500, body: "WebApiError" });
      });
  });
};

module.exports.putGroups = async function (ids, params) {
  return new Promise(async function (resolve, reject) {
    //gets the pl. by id
    await db_connection
      .getGroupsByID(ids)
      .then(async function ({ statusCode: statusCode, body: body }) {
        console.log(ids);
        if (statusCode === 404) {
          return reject({ statusCode: 404, body: "No group with this id" });
        }
        //change the name and description if available
        body._source.name = params.name || body._source.name;
        body._source.description =
          params.description || body._source.description;
        console.log(body)
        console.log(body.source)
        var db_output = await db_connection.updateGroups(
          body._id,
          body._source
        );
        return resolve(db_output.body);
      })
      .catch((err) => {
        console.log(err);
        return reject({ statusCode: 500, body: "WebApiError" });
      });
  });
};

module.exports.putRating = async function (ids, params) {
  
  return new Promise(async function (resolve, reject) {
    //gets the pl. by id
    await db_connection
      .getGroupsByID(ids.gid)
      .then(async function ({ statusCode: statusCode, body: body }) {
        if (statusCode === 404) {
          return reject({ statusCode: 404, body: "No group with this id" });
        }
        
        body._source.TV_Shows.forEach(element => {
          if(element.TV_Show == params.nameTV)
            element.rating = params.rating 
            
       });
    
        var db_output = await db_connection.updateGroups(
          body._id,
          body._source
        );
        return resolve(db_output.body);
      })
      .catch((err) => {
        console.log(err);
        return reject({ statusCode: 500, body: "WebApiError" });
      });
  });
};



module.exports.postTvShowsInGroup = async function (ids, params) {
  return new Promise(async function (resolve, reject) {
    await movies_database_data
      .getTvShow(params)
      .then(async function ({ statusCode: statusCode, body: t_body }) {
        if (t_body.error != undefined)
          return reject({ statusCode: 404, body: "TvShow(s) not found" });

        var {
          statusCode: statusCode,
          body: g_body,
        } = await db_connection.getGroupsByID(ids);
        if (statusCode === 404)
          return reject({ statusCode: 404, body: "No group with this id" });

        var index = g_body._source.TV_Shows.findIndex(
          (x) => x.id > g_body._source.TV_Shows.length
        );

        if (index == -1) {
          nextID = g_body._source.TV_Shows.length + 1;
        } else {
          var nextID = g_body._source.TV_Shows[index].id;
          nextID++;
        }
        var toAdd = {
          TV_Show: t_body.results[0].name,
          Description: t_body.results[0].description,
          id: nextID,
          score: t_body.results[0].vote_average,
          vote_cunt: t_body.results[0].vote_count,
          rating:0
        };

        var index = g_body._source.TV_Shows.findIndex(
          (x) => x.TV_Show == toAdd.TV_Show
        );
        if (index != -1)
          return reject({ statusCode: 400, body: "TvShow(s) already in Group!" });

        g_body._source.TV_Shows.push(toAdd);

        var db_output = await db_connection.updateGroups(ids, g_body._source);
        return resolve(db_output.body);
      })
      .catch((err) => {
        console.log(err);
        return reject({ statusCode: 500, body: "WebApiError" });
      });
  });
};

module.exports.deleteTvShowsByID = async function (tid,pid) {
  return new Promise(async function (resolve, reject) {
    await db_connection
      .getGroupsByID(pid)
      .then(async function ({ statusCode: statusCode, body: body }) {
        if (statusCode === 404)
          return reject({ statusCode: 404, body: "No group with this id" });

        var obj = body._source.TV_Shows.find(function (element) {
          return element.id == tid;
        });
        if (obj === undefined)
          return reject({ "statusCode": 404, "body": "No Tv Show with this id" });
        body._source.TV_Shows = body._source.TV_Shows.filter(x => x.id != tid);

        var db_output = await db_connection.updateGroups(
          body._id,
          body._source
        );
        return resolve(db_output.body);
      })
      .catch((err) => {
        console.log(err);
        return reject({ statusCode: 500, body: "WebApiError" });
      });
  });
};

module.exports.getGroupsTvShows = async function (ids, params) {
  return new Promise(async function (resolve, reject) {
    await db_connection
      .getGroupsByID(ids[0])
      .then(({ statusCode: statusCode, body: body }) => {
        if (statusCode === 404)
          return reject({ statusCode: 404, body: "No Group with this id" });

        /* var obj = body._source.TV_Shows.find(function (element) {
            return (element.id == ids[1]);
        });*/
        var toRet = {};
        var key = "Tv Shows filter"
        var TV_Shows = body._source.TV_Shows
        var min = params.min ; 
        var max = params.max ; 
        toRet[key] = [];
        let aux = body._source;
        for (var i of TV_Shows) {
          if (i.score >= min && i.score <= max) {
            aux = {
              Name: i.TV_Show,
              Score: i.score,
              Id: i.id
            };
            toRet[key].push(aux);
          }
        }
        resolve(toRet);
      })
      .catch((err) => {
        console.log(err);
        reject({ statusCode: 500, body: "WebApiError" });
      });
  });
};

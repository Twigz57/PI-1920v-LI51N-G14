'use strict'
let movies_database_data;
let db_connection;

module.exports = function (data, connection) {
    movies_database_data = data;
    db_connection = connection
    return module.exports
}

module.exports.getTvShows = function (params, callback) {
    movies_database_data.getTvShows(params, function (statusCode, err, body) {
        var jsonObj = body.results;
        var toRet = {}
        var key = 'TV Shows';
        toRet[key] = [];
        for (var item of jsonObj) {
            toRet[key].push({
                Name: item.name,
                Vote_Average: item.vote_average,
                Vote_Count: item.vote_count,
                Overview: item.overview,
                Id: item.id,
                First_Air_Date: item.first_air_date,
                Genre_Ids: item.genre_ids
            });
        }
        return callback({ "statusCode": 200, "body": toRet });
    });
}

module.exports.getTvShow = function (params, callback) {
    movies_database_data.getTvShow(params, function (statusCode, err, body) {
        if (statusCode === 400)
            return callback({ "statusCode": 400, "body": "No TV Show with this name" });
        var jsonObj = body.results;
        console.log(jsonObj);
        var toRet = {}
        var key = 'TV Show'
        toRet[key] = [];
        for (var item of jsonObj) {
            toRet[key].push({
                Name: item.name,
                Vote_Average: item.vote_average,
                Vote_Count: item.vote_count,
                Overview: item.overview,
                Id: item.id,
                First_Air_Date: item.first_air_date,
                Genre_Ids: item.genre_ids
            });
        }
        console.log(toRet.name)
        return callback({ "statusCode": 200, "body": toRet });

    });
}

module.exports.getGroups = function (params, callback) {
    //gets the group by id
    db_connection.getAllGroups(function (statusCode, err, body) {
        if (statusCode === 404)
            return callback({ "statusCode": 404, "body": "No groups yet!" });
        var toRet = {};
        var key = 'Groups: ';
        toRet[key] = [];
        for (var item of body.hits.hits) {
            let aux = item._source;
            aux = {
                name: aux.name,
                description: aux.description,
                id: aux.id,
                games:aux.games
            }
            toRet[key].push(aux)
        }
        return callback({ "statusCode": 200, "body": toRet });
    });
}

module.exports.getGroupsByID = function (ids, callback) {
    //gets the group by id
    db_connection.getGroupsByID(ids, function (statusCode, err, body) {
        if (statusCode === 404)
            return callback({ "statusCode": 404, "body": "No Group with this id" });
        var toRet = {};
        var key = body._source.name + ' group';
        toRet[key] = [];
        let aux = body._source;
        aux = {
            name: aux.name,
            description: aux.description,
            id: aux.id,
            games:aux.games
            
        }
        toRet[key].push(aux)
        return callback({ "statusCode": 200, "body": toRet });
    });
}

module.exports.postGroup = function (params, callback) {
    //gets the added Groups By this point
    db_connection.getAllGroups(function (statusCode, err, body) {
        //gets the biggest index
        var nextID = 0;
        if (statusCode != 404) {
            nextID = body.hits.hits.reduce(function (p, v) {
                return (Number(p._id) > Number(v._id) ? p : v);
            })._id;
        }
        nextID++;
        var toRet = {}
        var toRet = {
            id: nextID,
            name: params.name,
            description: params.description,
            games:[]
        }
        return db_connection.createGroup(nextID, toRet, callback);
    });
}

module.exports.putGroups = function (ids, params, callback) {

    db_connection.getGroupsByID(ids, function (statusCode, err, body) {
        if (statusCode === 404)
            return callback({ "statusCode": 404, "body": "No Group with this id" });

        //change the name and description if available
        body._source.name = (params.name || body._source.name);
        body._source.description = (params.description || body._source.description);

        return db_connection.updateGroups(body._id, body._source, callback);
    });
}

module.exports.postGameInGroup = function (ids, params, callback) {
    //gets the track
    movies_database_data.getGame(params, function (statusCode, err, t_body) {
        if (t_body.error != undefined)
            return callback({ "statusCode": 404, "body": "Game not found" });

        //gets the group by id
        db_connection.getGroupsByID(ids, function (statusCode, err, g_body) {
            if (statusCode === 404)
                return callback({ "statusCode": 404, "body": "No Group with this id" });

            //gets the biggest index
            var index = g_body._source.games.findIndex(x => (x.id > g_body._source.games.length));
            if (index == -1) {
                nextID = g_body._source.games.length + 1;
            } else {
                var nextID = (g_body._source.games[index].id);
                nextID++;
            }
            var toAdd = {
                Game: t_body.games[0].name,
                Description: t_body.games[0].description,
                Time_Max:t_body.games[0].max_playtime,
                id: nextID
            }
    
            var index = g_body._source.games.findIndex(x => (x.Game == toAdd.Game));
            if (index != -1)
                return callback({ "statusCode": 400, "body": "Game already in Group!" });
            //push if absent!
            g_body._source.games.push(toAdd);
            return db_connection.updateGroups(ids, g_body._source, callback);
        });
    });
}


module.exports.deleteGameByID = function (ids, callback) {
    
    db_connection.getGroupsByID(ids[0], function (statusCode, err, body) {
        if (statusCode === 404)
            return callback({ "statusCode": 404, "body": "No Group with this id" });

        var obj = body._source.games.find(function (element) {
            return (element.id == ids[1]);
        });
        if (obj === undefined)
            return callback({ "statusCode": 404, "body": "No Game with this id" });

         body._source.games = body._source.games.filter(x => x.id != ids[1]);

        return db_connection.updateGroups(body._id, body._source, callback);
    });
}
module.exports.getGroupsGames = function(ids, params,callback){
    
    db_connection.getGroupsByID(ids[0], function (statusCode, err, body) {
        if (statusCode === 404)
            return callback({ "statusCode": 404, "body": "No Group with this id" });

        var obj = body._source.games.find(function (element) {
            return (element.id == ids[1]);
        });
        var toRet = {}
        var key = "Games filter"
        var games = body._source.games
        var min = params.min
        var max = params.max
        toRet[key] = [];
        let aux = body._source;
        for(var i of games){
           if(i.Time_Max >= min && i.Time_Max <= max){
                aux = {
                    Name: i.Game,
                    Description: i.Description,
                    Id: i.id,
                    Time_Max : i.Time_Max
                }
            toRet[key].push(aux)
            }
        }
        return callback({ "statusCode": 200, "body": toRet });

    });   

}

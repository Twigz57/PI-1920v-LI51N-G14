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
                TV_Shows:aux.TV_Shows
            }
            toRet[key].push(aux)
        }
        return callback({ "statusCode": 200, "body": toRet });
    });
}

module.exports.getGroupByID = function (ids, callback) {
    //gets the group by id
    db_connection.getGroupsByID(ids, function (statusCode, err, body) {
        if (statusCode === 404)
            return callback({ "statusCode": 404, "body": "No Group with this id" });
        var toRet = {};
        var key = body._source.name + ' group';
        toRet[key] = [];
        let aux = body._source;
        console.log(body._source)
        aux = {
            name: aux.name,
            description: aux.description,
            id: aux.id,
            TV_Shows:aux.TV_Shows
            
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
            TV_Shows:[]
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

module.exports.postTvShowsInGroup = function (ids, params, callback) {
    //gets the track
    movies_database_data.getTvShow(params, function (statusCode, err, t_body) {
        if (t_body.error != undefined)
            return callback({ "statusCode": 404, "body": "TV Show not found" });
            //console.log(t_body)
        //gets the group by id
        db_connection.getGroupsByID(ids, function (statusCode, err, g_body) {
            if (statusCode === 404)
                return callback({ "statusCode": 404, "body": "No Group with this id" });
            //gets the biggest index
            var index = g_body._source.TV_Shows.findIndex(x => (x.id > g_body._source.TV_Shows.length));
            
            if (index == -1) {
                nextID = g_body._source.TV_Shows.length + 1;
            } else {
                var nextID = (g_body._source.TV_Shows[index].id);
                nextID++;
            }
            var toAdd = {
                TV_Show: t_body.results[0].name,
                Description: t_body.results[0].description,
                //Time_Max:t_body.results[0].max_playtime,
                score: t_body.results[0].vote_average,
                vote_cunt: t_body.results[0].vote_count,
                id: nextID
            }
    
            var index = g_body._source.TV_Shows.findIndex(x => (x.TV_Show == toAdd.TV_Show));
            if (index != -1)
                return callback({ "statusCode": 400, "body": "Tv show already in Group!" });
            //push if absent!
            g_body._source.TV_Shows.push(toAdd);
            return db_connection.updateGroups(ids, g_body._source, callback);
        });
    });
}


module.exports.deleteTvShowsByID = function (ids, callback) {
    
    db_connection.getGroupsByID(ids[0], function (statusCode, err, body) {
        if (statusCode === 404)
            return callback({ "statusCode": 404, "body": "No Group with this id" });

        var obj = body._source.TV_Shows.find(function (element) {
            return (element.id == ids[1]);
        });
        if (obj === undefined)
            return callback({ "statusCode": 404, "body": "No Tv Show with this id" });

         body._source.TV_Shows = body._source.TV_Shows.filter(x => x.id != ids[1]);

        return db_connection.updateGroups(body._id, body._source, callback);
    });
}
module.exports.getGroupsTvShows = function(ids, params,callback){
    
    db_connection.getGroupsByID(ids[0], function (statusCode, err, body) {
        if (statusCode === 404)
            return callback({ "statusCode": 404, "body": "No Group with this id" });

        var obj = body._source.TV_Shows.find(function (element) {
            return (element.id == ids[1]);
        });
        var toRet = {}
        var key = "Tv Shows filter"
        var TV_Shows = body._source.TV_Shows
        console.log(body._source.TV_Shows)
        var min = params.min
        var max = params.max
        toRet[key] = [];
        let aux = body._source;
        for(var i of TV_Shows){
           if(i.score >= min && i.score <= max){
                aux = {
                    Name: i.TV_Show,
                    Score: i.score,
                    Id: i.id
                }
            toRet[key].push(aux)
            }
        }
        return callback({ "statusCode": 200, "body": toRet });

    });   

}

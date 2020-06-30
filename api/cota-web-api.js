'use strict'
let services

module.exports = function (serv, router) {
    services = serv;
    let { global, specific } = router;
    specific.get('/tvshows/', getTvShows)
    specific.get('/tvshow/', getTvShow)
    specific.post('/groups/', postGroup)
    specific.put('/groups/:gid/', putGroups)
    specific.get('/groups/', getGroups)
    specific.get('/group/:gid/', getGroupsByID)
    specific.post('/groups/:gid/tvshow/', postTvShowsInGroup)
    specific.delete('/groups/:gid/tvshow/:id/', deleteTvShowsByID)
    specific.get('/groups/:gid/tvshows/', getGroupsTvShows)

    return router

    async function getTvShows(req, res) {
        await services.getTvShows(req.query)
            .then((output) => {
                res.send(output);
            })
            .catch((err) => {
                console.log(err)
            });
    }
    async function getTvShow(req, res) {
        await services.getTvShow(req.query)
            .then((output) => {
                res.send(output);
            })
            .catch((err) => {
                res.status(err.statusCode)
                res.send(err.body)
            });
    }
    async function getGroups(req, res) {
        await services.getGroups(req.query)
            .then((output) => {
                res.send(output);
            })
            .catch((err) => {
                res.status(err.statusCode)
                res.send(err.body)
            });
    }

    async function getGroupsByID(req, res) {
        await services.getGroupsByID(req.params.gid)
            .then((output) => {
                res.send(output);
            })
            .catch((err) => {
                res.status(err.statusCode)
                res.send(err.body)
            });
    }

    async function putGroups(req, res) {
        await services.putGroups(req.params.gid, req.query)
            .then((output) => {
                res.send(output);
            })
            .catch((err) => {
                res.status(err.statusCode)
                res.send(err.body)
            });
    }

    async function postGroup(req, res) {
        console.log(res)
        await services.postGroup(req.query)
            .then((output) => {
                res.send(output);
            })
            .catch((err) => {
                res.status(err.statusCode)
                res.send(err.body)
            });
    }
    async function postTvShowsInGroup(req, res) {
        await services.postTvShowsInGroup(req.params.gid, req.query)
            .then((output) => {
                res.send(output);
            })
            .catch((err) => {
                res.status(err.statusCode)
                res.send(err.body)
            });
    }

    async function deleteTvShowsByID(req, res) {
        await services.deleteTvShowsByID(req.params.id,req.params.gid)
            .then((output) => {
                res.send(output);
            })
            .catch((err) => {
                res.status(err.statusCode)
                res.send(err.body)
            });
    }
    async function getGroupsTvShows(req, res) {
        await services.getGroupsTvShows(req.params.gid, req.query)
            .then((output) => {
                res.send(output);
            })
            .catch((err) => {
                res.status(err.statusCode)
                res.send(err.body)
            });
    }
}
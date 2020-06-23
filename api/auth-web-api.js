'use strict'

const passport = require('passport')

module.exports = function ( authService, routers) {
    let { global, specific } = routers
   
    passport.serializeUser(serializeUser)
    passport.deserializeUser(deserializeUser)
   global.use(passport.initialize())
    global.use(passport.session())

    specific.get('/session', getSession)
    specific.post('/login', login)
    specific.post('/logout', logout)
    specific.post('/signup', signup)

    return routers

    function getSession(req, resp, next) {
        const username = req.isAuthenticated() ? req.user.username : undefined
        resp.json({
            'auth': req.isAuthenticated(),
            'username': username
        })
    }
    function login(req, resp, next) {
        authService
            .authenticate(req.body.username, req.body.password)
            .then(user => {
                req.login(user, (err) => {
                    if (err) next(err)
                    else {
                        resp.json(req.user)
                        setCookie("user_cookie", req.body.username)
                    }
                })
            })
            .catch(err => next(err))
    }
    function logout(req, resp, next) {
        req.logout()
        getSession(req, resp, next)
        removeCookie("user_cookie")
    }
    function signup(req, resp, next) {
        authService
            .createUser(req.body.fullname, req.body.username, req.body.password)
            .then(user => {
                req.login(user, (err) => {
                    if (err) next(err)
                    else resp.json(user)
                })
            })
    }

    function serializeUser(user, done) {
        console.log('serializeUser')
        done(null, user._id)
    }


    function deserializeUser(userId, done) {
        console.log('deserializeUser')
        authService
            .getUser(userId)
            .then(user => done(null, user))
            .catch(err => done(err))
    }

    function changeCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    function setCookie(cname, cvalue) {
        changeCookie(cname, cvalue,1)
    }
    function removeCookie(cname) {
        changeCookie(cname, "" ,-1)
    }
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
    }

}
const userR = require('./user.r')
function route(app) {

   // app.use(`/home`,homeR);
   app.use(`/user`,userR);

}

module.exports = route;
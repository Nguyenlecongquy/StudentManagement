const loginR = require('./login.r')
const registerR = require('./register.r')
const homeR = require('./home.r')
function route(app) {

   // app.use(`/home`,homeR);
   app.use(`/register`,registerR);

   app.use(`/login`,loginR);
}

module.exports = route;
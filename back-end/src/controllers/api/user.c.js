const userM = require('../../models/user.m')
const passport = require('passport');
class UserC {
   handleRegister(req, res, next) {
      const response = {};
      passport.authenticate('local-register', function (err, user, option) {
         if (err) {
            return next(err);
         }
         if (!user) {
            response.status = false;
            response.message = option.message;
            console.log(response)
            return res.status(200).json(response);
         }
         req.logIn(user, function (err) {
            if (err) {
               return next(err);
            }
            response.status = true;
            response.message = option.message;
            console.log(response)
            return res.status(200).json(response);
         });
      })(req, res);
   }
   handleLogin(req, res, next) {
      //login controller
      const response = {  };
      passport.authenticate('local-login', function (err, user, option) {
         if (err) {
            return next(err);
         }
         if (!user) {
            response.status = false;
            response.message = option.message;
            console.log(response)
            return res.status(200).json(response);
         }
         req.logIn(user, function (err) {
            if (err) {
               return next(err);
            }
            response.status = true;
            response.message = option.message;
            console.log(response)
            return res.status(200).json(response);
         });
      })(req, res);
   }
}

module.exports = new UserC;
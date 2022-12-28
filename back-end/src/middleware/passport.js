const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require("express-session");
const userM = require('../models/user.m');
const saltRounds = 10;

module.exports = (app) => {
   app.use(session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
   }))
   app.use(passport.initialize());
   app.use(passport.session());

   //checklogIn
   passport.use('local-login',new LocalStrategy(   {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback : true
   },
      async (req,username, password, done) => {
         const category = JSON.parse(req.body.category);
         let user;
         try {
            if(category){
               user = await userM.findUserGVByUsername(username);
            }else{
               user = await userM.findUserHSByUsername(username);
            }
            if (!user) {
               return done(null, false, { message: 'Tên đăng nhập không tồn tại!' });
            }
            const isTruePassword = await bcrypt.compare(password, user.password);
            if (!isTruePassword) {
               return done(null, false, { message: 'Sai mật khẩu!' });
            }
            return done(null, { username: user.username, password: user.password }, { message: 'Đăng nhập thành công!' });
         } catch (err) {
            return done(err);
         }
      }
   ));

   passport.use('local-register',new LocalStrategy(   {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback : true
   },
      async (req,username, password, done) => {
         const category = JSON.parse(req.body.category);
         const id = req.body.id;
         let user,isIdExist;
         try {
            if(category){
               isIdExist = await userM.findGVById(id);
               user = await userM.findUserGVByUsername(username);
            }else{
               isIdExist = await userM.findHSById(id);
               user = await userM.findUserHSByUsername(username);
            }
            if(!isIdExist){
               return done(null, false, { message: 'Không tồn tại ID này!' });
            }else{
               if(user != false){
                  return done(null, false, { message: 'Trùng tên đăng nhập!' });
               }else {
                  const myPlaintextPassword = password;
                  const hash = await bcrypt.hash(myPlaintextPassword, saltRounds);
                  const data = {
                     id: id,
                     username: username,
                     password: hash,
                  }
                  if(category){
                     const rs = await userM.addUserGV(data);
                  }else{
                     const rs = await userM.addUserHS(data);
                  }
                  return done(null, data, { message: 'Đăng ký thành công' });
               }
            }
         } catch (err) {
            return done(err);
         }
      }
   ));
   passport.serializeUser(async function (user, done) {
      done(null, user);
   });

   passport.deserializeUser(async function (user, done) {
      done(null, user);
   });

}



const express = require('express');
const path = require('path');
const morgan = require('morgan');
const exhbs = require('express-handlebars');
const session = require("express-session");
const cors = require('cors')
const pp = require('./passport')
function middleware(app) {
   //set public
   app.use(express.static(path.join(__dirname, 'public')));

   //http logger
   app.use(morgan('dev'));

   //body parser
   app.use(express.urlencoded({ extended: false }))

   //xu li du lieu request post json
   app.use(express.json())

   //engine
   app.engine('hbs', exhbs.engine({
      extname: '.hbs'
   }));
   app.set('view engine', 'hbs');
   app.set('views', path.join(__dirname, 'resources', 'views'));

   // Dung session
   app.use(
      session({
         secret: "tritranmn2",
         resave: false,
         saveUninitialized: true,
         cookie: { secure: false },
      })
   );

   //Dùng cors
   app.use(cors({
      origin: "http://127.0.0.1:5173",
      credentials: true
   }))

   pp(app);

}

module.exports = middleware;
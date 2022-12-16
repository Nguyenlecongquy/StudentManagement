const express = require('express');
const exhbs = require('express-handlebars');
const session = require("express-session");
const morgan = require('morgan');
const path = require('path');
const route = require('./routes/index');
const cors = require('cors')

const app = express();

app.use(cors({
   origin: "http://127.0.0.1:5173",
   credentials: true
}))


app.use(express.static(path.join(__dirname,'public')));

//http logger
app.use(morgan('dev'));

//body parser
app.use(express.urlencoded({ extended: false }))

//xu li du lieu request post json
app.use(express.json())


// Dung session
app.use(
   session({
       secret: "tritranmn2",
       resave: false,
       saveUninitialized: true,
       cookie: { secure: false },
   })
);


//engine
app.engine('hbs', exhbs.engine({
   extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname,'resources','views'));

route(app);

app.use((err,req,res,next)=>{
   const statusCode= err.statusCode | 500;
   res.status(statusCode).send(err.message);
})

const port = 3000;
app.listen(port,()=>console.log(`Server listening at http://localhost:${port}`))


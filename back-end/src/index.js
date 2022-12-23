const express = require('express');
const route = require('./routes/index');
const useMiddleware = require('./middleware/index');
const app = express();

useMiddleware(app);

route(app);

//send message error to browser
app.use((err,req,res,next)=>{
   const statusCode= err.statusCode | 500;
   res.status(statusCode).send(err.message);
})

const port = 3000;
app.listen(port,()=>console.log(`Server listening at http://localhost:${port}`))


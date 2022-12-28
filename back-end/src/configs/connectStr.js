const {DB,PORT} = require('./const')
module.exports = {
    host: DB.DB_HOST, 
    port: PORT.PORT_DB ,
    database: DB.DB_NAME,
    user: DB.DB_USER ,
    password: DB.DB_PASSWORD, 
    max: 30 
};


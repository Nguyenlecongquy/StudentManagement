
const DB = require('../connect/db')
var db;
try {
    db = DB.connect;
    console.log("summary model connect database successfully!")
} catch (error) {
    console.log("summary model connect database fail!")
}

const summaryModel = {

    

};

module.exports = summaryModel;
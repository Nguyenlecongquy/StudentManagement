
const DB = require('../connect/db')
try {
   const db = DB.connect;
   console.log("Connect database success!")
} catch (error) {
   console.log("Connect database failure!")
}

const teacherModel= {
   /**
    * Tìm kiếm(mã số,họ tên)
    * Tìm kiếm tất cả 
    * Reset
    * 
    */
};

module.exports = teacherModel;
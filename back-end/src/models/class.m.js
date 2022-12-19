
const DB = require('../connect/db')
var db;
try {
   db = DB.connect;
   console.log("Connect database success!")
} catch (error) {
   console.log("Connect database failure!")
}

const classModel = {

   fieldId:(id) => (id == undefined) ? true : "ma_lop ='" + id + "'",
   fieldGrade:(grade) => (grade == undefined) ? true : "khoi ='" + grade + "'",
   fieldNumber:(number) => (number == undefined) ? true : "si_so_lop =" + number ,
   findEmpty: async () => {
      return true;
   },

   findLops: async (id, grade) => {
      const result = await db.any(
         `select * from lop 
         where ${classModel.fieldId(id)} 
         and ${classModel.fieldGrade(grade)};`);
      return result;

   },
   addLopIntoDatabaseReturnLop: async (id, number, grade, facultyId) => {
      try {
         const result = await db.one(`insert into lop(ma_lop,khoi,si_so_lop,ma_khoa) 
            values($1,$2,$3,$4) returning *`,
            [id, number, grade,facultyId]);
         return result;
      } catch (error) {
         return false;
      }
   },
   updateLopIntoDatabase: async (id, number, grade) => {
      try {
         const result = await db.one(`update lop 
                                 set  si_so_lop=$1, khoi=$2 
                                 where ma_lop=$3 returning *`, [number, grade, id]);
         return result;
      } catch (error) {
         return false;
      }
   },
   removeLopFromDatabase: async (id) => {
      try {
         const result = await db.any('delete from lop where ma_lop=$1 returning *;', [id]);
         return result;
      } catch (error) {
         return false;
      }
   },

};

module.exports = classModel;
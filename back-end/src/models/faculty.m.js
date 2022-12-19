
const DB = require('../connect/db')
var db;
try {
   db = DB.connect;
   console.log("Connect database success!")
} catch (error) {
   console.log("Connect database failure!")
}

const facultyModel = {

   fieldId:(id) => (id == undefined) ? true : "ma_khoa ='" + id + "'",
   fieldFacultyName:(FacultyName) => (FacultyName == undefined) ? true : "ten_khoa = '" + FacultyName + "'",
   fieldShortFacultyName:(ShortFacultyName) => (ShortFacultyName == undefined) ? true : "ten_tat ='" + ShortFacultyName + "'",
   findEmpty: async () => {
      return true;
   },

   findKhoas: async (id, facultyName,shortFacultyName) => {
      if(id != undefined || facultyName != undefined || shortFacultyName != undefined) {
         const result = await db.any(
            `select * from khoa 
            where ${facultyModel.fieldId(id)} 
            and ${facultyModel.fieldFacultyName(facultyName)} 
            and ${facultyModel.fieldShortFacultyName(shortFacultyName)};`);
         return result;
      }else {
         const result = await db.any(`select * from khoa ;`);
         return result;
      }

   },
   addKhoaIntoDatabaseReturnKhoa: async (id, facultyName, shortFacultyName) => {
      try {
         const result = await db.one(`insert into khoa(ma_khoa,ten_khoa,ten_tat) 
            values($1,$2,$3) returning *`,
            [id, facultyName, shortFacultyName]);
         return result;
      } catch (error) {
         return false;
      }
   },
   updateKhoaIntoDatabase: async (id, facultyName, shortFacultyName) => {
      try {
         const result = await db.one(`update khoa 
                                 set  ten_khoa=$1, ten_tat=$2 
                                 where ma_khoa=$3 returning *`, [facultyName, shortFacultyName, id]);
         return result;
      } catch (error) {
         return id + ' notExist';
      }
   },
   removeKhoaFromDatabase: async (id) => {
      try {
         const result = await db.any('delete from khoa where ma_khoa=$1 returning *;', [id]);
         return result;
      } catch (error) {
         return false;
      }
   },

};

module.exports = facultyModel;
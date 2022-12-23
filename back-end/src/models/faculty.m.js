
const DB = require('../connect/db')
var db;
try {
   db = DB.connect;
   console.log("Faculty model connect database successfully!")
} catch (error) {
   console.log("Faculty model connect database fail!")
}

const facultyModel = {

   fieldId:(id) => (id == '') ? true : "ma_khoa ='" + id + "'",
   fieldFacultyName:(FacultyName) => (FacultyName == '') ? true : "ten_khoa = '" + FacultyName + "'",
   fieldShortFacultyName:(ShortFacultyName) => (ShortFacultyName == '') ? true : "ten_tat ='" + ShortFacultyName + "'",

   findKhoas: async (id, facultyName,shortFacultyName) => {
      const result = await db.any(
         `select * from khoa 
         where ${facultyModel.fieldId(id)} 
         and ${facultyModel.fieldFacultyName(facultyName)} 
         and ${facultyModel.fieldShortFacultyName(shortFacultyName)};`);
      return result;
   },
   addKhoaIntoDatabaseReturnKhoa: async (id, facultyName, shortFacultyName) => {
      try {
         const result = await db.any(`insert into khoa(ma_khoa,ten_khoa,ten_tat) 
            values($1,$2,$3) returning *`,
            [id, facultyName, shortFacultyName]);
         return result;
      } catch (error) {
         return false;
      }
   },
   updateKhoaIntoDatabase: async (id, facultyName, shortFacultyName) => {
      try {
         const result = await db.any(`update khoa 
                                 set  ten_khoa=$1, ten_tat=$2 
                                 where ma_khoa=$3 returning *`, [facultyName, shortFacultyName, id]);
         return result;
      } catch (error) {
         return false;
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
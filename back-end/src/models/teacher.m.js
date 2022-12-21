
const DB = require('../connect/db')
var db;
try {
   db = DB.connect;
   console.log("Teacher model connect database successfully!")
} catch (error) {
   console.log("Teacher model connect database fail!")
}

const teacherModel = {
   fieldId:(id) => (id == undefined) ? true : "ma_gv ='" + id + "'",
   fieldFullName:(fullName) => (fullName == undefined) ? true : "ten_gv ='" + fullName + "'",

   findGVs: async (id, fullName) => {
      const result = await db.any(
         `select * from giao_vien 
         where ${teacherModel.fieldId(id)} 
         and ${teacherModel.fieldFullName(fullName)};`);
      return result;
   },
   addGVIntoDatabaseReturnGV: async (id, fullName, birthDay,idFaculty) => {
      try {
         const result = await db.any(`insert into giao_vien(ma_gv,ten_gv,ngay_sinh_gv,ma_khoa) 
            values($1,$2,$3,$4) returning *`,
            [id, fullName, birthDay,idFaculty]);
         return result;
      } catch (error) {
         return false;
      }
   },
   addGVIntoDatabaseReturnAll: async (id, fullName, birthDay) => {
      teacherModel.addGVIntoDatabase(id, fullName, birthDay);
      return teacherModel.findAllGVs();
   },
   updateGVIntoDatabase: async (id, fullName, birthDay, idFaculty) => {
      try {
         const result = await db.any(`update giao_vien 
                                 set  ten_gv=$1, ngay_sinh_gv=$2 ,ma_khoa=$3
                                 where ma_gv=$4 returning *`, [fullName, birthDay, idFaculty, id]);
         return result;
      } catch (error) {
         return false;
      }
   },
   removeGVfromDatabase: async (id) => {
      try {
         const result =await db.any('delete from giao_vien where ma_gv=$1 returning *;', [id]);
         return result;
      } catch (error) {
         return false;
      }
   },




};

module.exports = teacherModel;
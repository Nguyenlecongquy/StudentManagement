
const DB = require('../connect/db')
var db;
try {
   db = DB.connect;
   console.log("Class model connect database successfully!")
} catch (error) {
   console.log("Class model Connect database fail!")
}

const classModel = {

   fieldId: (id) => (id == '') ? true : "ma_lop ='" + id + "'",
   fieldGrade: (grade) => (grade == '') ? true : "khoi ='" + grade + "'",
   fieldNumber: (number) => (number == '') ? true : "si_so_lop =" + number,
   findEmpty: async () => {
      return true;
   },

   findLops: async (id, grade) => {
      const result = await db.any(
         `select * from lop 
         where (ma_lop like '%${id}%' and ${classModel.fieldGrade(grade)}) or
         (
            ${classModel.fieldId(id)} 
            and ${classModel.fieldGrade(grade)}
         )`);
      return result;

   },
   addLopIntoDatabaseReturnLop: async (id, number, grade, facultyId) => {
         
      try {
         const result = await db.any(`insert into lop(ma_lop,si_so_lop,khoi,ma_khoa) 
            values($1,$2,$3,$4) returning *`,
            [id, number, grade, facultyId]);
         return result;
      } catch (error) {
         console.log('loi')
         return false;
      }
   },
   updateLopIntoDatabase: async (idOld, idNew, number, grade, facultyId) => {
      try {
         if (idNew != '') {
            await db.any(`update hoc_sinh 
            set  ma_lop=null 
            where ma_lop=$1`, [idOld]);
            await classModel.removeLopFromDatabase(idOld);
            const result=await classModel.addLopIntoDatabaseReturnLop(idNew, number, grade, facultyId);
            await db.any(`update hoc_sinh 
               set  ma_lop=$1
               where ma_lop is null`, [idNew]);
            return result;
         }
         else {
            console.log(grade)
            const result = await db.any(`update lop 
               set  si_so_lop=$1, khoi=$2 
               where ma_lop=$3 returning *`, [number, grade, idOld]);
            return result;
         }
      } catch (error) {
         return false;
      }
   },
   
   removeLopFromDatabase: async (id) => {
      try {
         await db.any(`update hoc_sinh 
               set  ma_lop=null 
               where ma_lop=$1`, [id]);
         const result = await db.any('delete from lop where ma_lop=$1 returning *;', [id]);
         return result;
      } catch (error) {
         return false;
      }
   },

};

module.exports = classModel;

const DB = require('../connect/db')
var db;
try {
   db = DB.connect;
   console.log("Role model connect database successfully!")
} catch (error) {
   console.log("Role model Connect database fail!")
}

const roleModel = {
   findAllRole: async () => {
      try {
         const result = await db.one('select * from qui_dinh where id = 1');
         return result;
      } catch (error) {
         return false;
      }
   },
   findRoleNumberStudentOfClass: async () => {
      try {
         const result = await db.one('select si_so_toi_da from qui_dinh where id = 1');
         return result;
      } catch (error) {
         return false;
      }
   },
   // findRoleNumberClassOfGrades: async () => {
   //    try {
   //       const result = await db.one('select so_luong_lop_10,so_luong_lop_11, so_luong_lop_12 from qui_dinh where id = 1');
   //       return result;
   //    } catch (error) {
   //       return false;
   //    }
   // },
   findRoleNumberClassOfGrade: async (grade) => {
      try {
         const result = await db.one(`select so_luong_lop_${grade} from qui_dinh where id = 1`);
         return result;
      } catch (error) {
         return false;
      }
   },
   countClassesByGrade: async (grade) => {
      try {
         const result = await db.one(`select khoi,count(ma_lop) SL
                                       from lop where khoi =$1 
                                       group by khoi;`,[grade]);
         return result;
      } catch (error) {
         return false;
      }
   },
   updateRoleNumberStudentOfClass: async (maxNumber) => {
      try {
         if(maxNumber =='')maxNumber=40;
         const result = await db.one(`update qui_dinh 
               set  si_so_toi_da=$1
               where id=1 returning si_so_toi_da`, [maxNumber]);
         return result;
      } catch (error) {
         return false;
      }
   },
   updateRoleNumberClassOfGrade: async (grade,numberClass) => {
      try {
         const result = await db.one(`update qui_dinh 
               set  so_luong_lop_${grade}=$1
               where id=1 returning so_luong_lop_${grade}`, [numberClass]);
         return result;
      } catch (error) {
         return false;
      }
   },


};

module.exports = roleModel ;
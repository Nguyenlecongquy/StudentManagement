
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
   findMaxNumberClass: async () => {
      try {
         const result = await db.one('select si_so_toi_da from qui_dinh where id = 1');
         return result;
      } catch (error) {
         return false;
      }
   },
   updateMaxNumberClass: async (maxNumber) => {
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


};

module.exports = roleModel ;
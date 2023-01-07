
const { json } = require('express');
const bcrypt = require('bcrypt');

const DB = require('../connect/db')
var db;
try {
   db = DB.connect;
   console.log("Infor model connect database successfully!")
} catch (error) {
   console.log("Infor model Connect database fail!")
}

const inforModel = {
   findInfors: async (email,category) => {
      console.log(email)

      try {
         let result;
         if(JSON.parse(category)==true){
            result = await db.one(`
            select ma_gv,ten_gv,email,password
            from user_giaovien join giao_vien on ma_gv=magv
            where email = $1`,[email]);
         }else{
            result = await db.one(`
            select ma_hs,ten_hs,email,password
            from user_hocsinh join hoc_sinh on ma_hs=magv
            where email = $1`,[email]);
         }
         return result;
      } catch (error) {
         return false;
      }
   },

   
   updateInfors: async (fullName,email,password,category) => {
      try {
         let result;
         const hash = await bcrypt.hash(password, 10);

         if(JSON.parse(category)==true){
            const user = await db.one(`update user_giaovien 
            set  username=$1, email=$1,password=$2
            where username=$1 returning *`, [email,hash]);
            const fullNameObj = await db.one(`update giao_vien 
            set  ten_gv =$1
            where ma_gv=$2 returning ten_gv`, [fullName,user.magv]);
            result = {...user,...fullNameObj};
         }else{
            const user = await db.one(`update user_hocsinh 
            set  username=$1, email=$1,password=$2
            where username=$1 returning *`, [email,hash]);
            const fullNameObj = await db.one(`update hoc_sinh
            set  ten_hs =$1
            where ma_hs=$2 returning ten_gv`, [fullName,user.mahs]);
            result = {...user,...fullNameObj};
         }
         return result;
      } catch (error) {
         return false;
      }
   }
};

module.exports = inforModel ;

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
   findInfors: async (id,category) => {
      try {
         let result;
         if(JSON.parse(category)==true){
            result = await db.one('select * from user_giaovien where magv = $1',id);
         }else{
            result = await db.one('select * from user_hocsinh where mahs = $1',id);
         }
         return result;
      } catch (error) {
         return false;
      }
   },

   
   updateInfors: async (id,email,password,category) => {
      try {
         let result;
         const hash = await bcrypt.hash(password, 10);

         if(JSON.parse(category)==true){
            result = await db.one(`update user_giaovien 
            set  username=$2, email=$2,password=$3
            where magv=$1 returning *`, [id,email,hash]);
         }else{

            result = await db.one(`update user_hocsinh 
            set  username=$2, email=$2,password=$3
            where mahs=$1 returning *`, [id,email,hash]);
         }
         return result;
      } catch (error) {
         return false;
      }
   }
};

module.exports = inforModel ;
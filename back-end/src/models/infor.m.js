
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
      try {
         let result;
         if(JSON.parse(category)==true){
            result = await db.one('select * from user_giaovien where email = $1',email);
         }else{
            result = await db.one('select * from user_hocsinh where email = $1',email);
         }
         return result;
      } catch (error) {
         return false;
      }
   },

   
   updateInfors: async (email,password,category) => {
      try {
         let result;
         const hash = await bcrypt.hash(password, 10);

         if(JSON.parse(category)==true){
            result = await db.one(`update user_giaovien 
            set  username=$1, email=$1,password=$2
            where username=$1 returning *`, [email,hash]);
         }else{

            result = await db.one(`update user_hocsinh 
            set  username=$1, email=$1,password=$2
            where username=$1 returning *`, [email,hash]);
         }
         return result;
      } catch (error) {
         return false;
      }
   }
};

module.exports = inforModel ;
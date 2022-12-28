const CryptoJS = require('crypto-js');
const hashLength = 64;

const DB = require('../connect/db')
var db;
try {
   db = DB.connect;
   console.log("User model connect database successfully!")
} catch (error) {
   console.log("User model connect database fail!")
}


const pgUser= {
   fieldId:(id) => (id == undefined) ? true : "magv ='" + id + "'",
   fieldUsername:(username) => (username == undefined) ? true : "username ='" + username + "'",

   addUserGV: async user => {
      try {
         const rs = await db.one('INSERT INTO user_giaovien(magv,username,email,password) VALUES($1,$2,$3,$4) RETURNING *',
         [user.id, user.username, user.username, user.password]);//username = email
         return rs;
      } catch (error) {
         return false;
      }
   },
   addUserHS: async user => {
      try {
         const rs = await db.one('INSERT INTO user_hocsinh(mahs,username,email,password) VALUES($1,$2,$3,$4) RETURNING *',
         [user.id, user.username, user.username, user.password]);//username = email
         return rs;
      } catch (error) {
         return false;
      }
   },
   findUserGVByUsername: async username => {
      try {
         const rs = await db.one('SELECT * FROM user_giaovien WHERE username=$1', [username]);
         return rs;
      } catch (error) {
         return false;
      }
   },
   findUserHSByUsername: async username => {
      try {
         const rs = await db.one('SELECT * FROM user_hocsinh WHERE username=$1', [username]);
         return rs;
      } catch (error) {
         return false;
      }
   },
   findUserGVById: async magv => {
      try {
         const rs = await db.one('SELECT * FROM user_giaovien WHERE magv=$1', [magv]);
         return rs;
      } catch (error) {
         return false;
      }
   },
   findUserHSById: async mahs => {
      try {
         const rs = await db.one('SELECT * FROM user_hocsinh WHERE mahs=$1', [mahs]);
         return rs;
      } catch (error) {
         return false;
      }
   },
   findGVById: async ma_gv => {
      try {
         const rs = await db.one('SELECT * FROM giao_vien WHERE ma_gv=$1', [ma_gv]);
         return rs;
      } catch (error) {
         return false;
      }
   },
   findHSById: async ma_hs => {
      try {
         const rs = await db.one('SELECT * FROM hoc_sinh WHERE ma_hs=$1', [ma_hs]);
         return rs;
      } catch (error) {
         return false;
      }
   },
   

};

module.exports = pgUser;
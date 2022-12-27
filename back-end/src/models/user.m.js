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
   

   checkLogin: async(data) =>{
      const un = data.username; 
      const pw = data.password;
      const cg = JSON.parse(data.category);
      
      let userDb;
      if(cg === true){
         userDb = await pgUser.findUserGVByUsername(un);
      }
      else {
         userDb = await pgUser.findUserHSByUsername(un);
      }

      console.log("userDb:", userDb)
      if(userDb == false){
         return "not_exist";
      }
      const pwDb = userDb.password;
      const salt = pwDb.slice(hashLength); 
      const pwSalt = pw + salt;
      const pwHashed = CryptoJS.SHA3 (pwSalt, { outputLength: hashLength* 4 }).toString(CryptoJS.enc. Hex);
      if (pwDb === (pwHashed + salt)) {
         return true;
      }else{
         return false;
      }
   },
   checkRegister: async(data)=> {
      const un = data.username; //username = email
      const id = data.id;
      const cg = data.category;

      // console.log(un,id,cg)
      if(cg=== true ){
         const userGV = await pgUser.findUserGVById(id);
         const giaoVien = await pgUser.findGVById(id);
         // console.log(userGV)
         if(userGV.username == un){
            return "exist_username"; //ok
         }
         if(userGV.magv == id){
            return "exist_id";
         }
         if(giaoVien == false){//id đky không tồn tại trong bảng giáo viên
            return "NotExist_id";
         }
      }
      else {
         console.log("vao roi")
         const userHS = await pgUser.findUserHSById(id);
         const hocSinh = await pgUser.findHSById(id);
         // console.lof(userHS)
         if(userHS.username == un){
            return "exist_username";
         }
         if(userHS.mahs == id){
            return "exist_id";//da dky r
         }
         if(hocSinh == false){//id đky không tồn tại trong bảng học sinh
            return "NotExist_id";
         }
      }
      try {
         const pw = data.password;
         const salt = Date.now().toString(16);
         const pwSalt = pw + salt;
         const pwHashed = CryptoJS.SHA3(pwSalt, { outputLength: hashLength * 4 }).toString
         (CryptoJS.enc.Hex);
         const userSave = {
            'username': un,
            'password': pwHashed + salt,
            'id': id
         };
         let uNew;
         if(cg === true){
            uNew = await pgUser.addUserGV(userSave);
            console.log("Da luu vao database", uNew);
         }
         else {
            uNew = await pgUser.addUserHS(userSave);
            console.log("Da luu vao database", uNew);
         }
         return uNew;
      } catch (error) {
         return false;
      }
   }
};

module.exports = pgUser;
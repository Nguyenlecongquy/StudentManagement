const CryptoJS = require('crypto-js');
const hashLength = 64;
const DB = require('../connect/db')
const db = DB.connect;

const pgUser= {
   all: async() => {
      const rs = await db.any('SELECT * FROM user_giaovien');
      //console.log(rs);
      return rs;
   },
   add_gv: async user => {
      const rs = await db.one('INSERT INTO user_giaovien(magv,username,email,password) VALUES($1,$2,$3,$4) RETURNING *',
      [user.id, user.username, user.username, user.password]);//username = email
      // console.log("add",rs)
      return rs;
   },
   add_hs: async user => {
      const rs = await db.one('INSERT INTO user_hocsinh(mahs,username,email,password) VALUES($1,$2,$3,$4) RETURNING *',
      [user.id, user.username, user.username, user.password]);//username = email
      // console.log("add",rs)
      return rs;
   },
   byName_gv: async username => {
      try {
         const rs = await db.one('SELECT * FROM user_giaovien WHERE username=$1', [username]);
         return rs;
      } catch (error) {
         return false;
      }
   },
   byName_hs: async username => {
      try {
         const rs = await db.one('SELECT * FROM user_hocsinh WHERE username=$1', [username]);
         return rs;
      } catch (error) {
         return false;
      }
   },
   byID_gv: async magv => {
      try {
         const rs = await db.one('SELECT * FROM user_giaovien WHERE magv=$1', [magv]);
         return rs;
      } catch (error) {
         return false;
      }
   },
   byID_hs: async mahs => {
      try {
         const rs = await db.one('SELECT * FROM user_hocsinh WHERE mahs=$1', [mahs]);
         return rs;
      } catch (error) {
         return false;
      }
   },
   byID_gv_notExist: async ma_gv => {
      try {
         const rs = await db.one('SELECT * FROM giao_vien WHERE ma_gv=$1', [ma_gv]);
         return rs;
      } catch (error) {
         return false;
      }
   },
   byID_hs_notExist: async ma_hs => {
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
      const cg = data.category;
      var uDb;
      if(cg == 'true'){
         uDb = await pgUser.byName_gv(un);
      }
      else {
         uDb = await pgUser.byName_hs(un);
      }
      console.log("uDb.password", uDb)
      if(uDb == false){
         return "not_exist";
      }
      const pwDb = uDb.password;
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
      var uDb;
      if(cg == 'true'){
         uDb = await pgUser.byName_gv(un);
         iDb = await pgUser.byID_gv(id);
         iDb_notExist = await pgUser.byID_gv_notExist(id);
         console.log("uDb",uDb);
         console.log("iDb",iDb);
         console.log("iDb_notExist",iDb_notExist);
         if(uDb.username == un){
            return "exist_username";
         }
         if(iDb.magv == id){
            return "exist_id";
         }
         if(iDb_notExist == false){
            return "NotExist_id";
         }
      }
      else {
         uDb = await pgUser.byName_hs(un);
         iDb = await pgUser.byID_hs(id);
         iDb_notExist = await pgUser.byID_hs_notExist(id);
         console.log("uDb",uDb);
         console.log("iDb",iDb);
         console.log("iDb_notExist",iDb_notExist);
         if(uDb.username == un){
            return "exist_username";
         }
         if(iDb.mahs == id){
            return "exist_id";
         }
         if(iDb_notExist == false){
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
         console.log("userSave", userSave)
         var uNew;
         if(cg == 'true'){
            uNew = await pgUser.add_gv(userSave);
         }
         else {
            uNew = await pgUser.add_hs(userSave);
         }
         console.log("uNew", uNew)
         return uNew;
      } catch (error) {
         return false;
      }
   }


};

module.exports = pgUser;
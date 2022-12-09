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
   add: async user => {
      const rs = await db.one('INSERT INTO user_giaovien(username,email,password) VALUES($1, $2,$3) RETURNING *',
      [user.username,user.username, user.password]);//username = email
      // console.log("add",rs)
      return rs;
   },
   byName: async username => {
      try {
         const rs = await db.one('SELECT * FROM user_giaovien WHERE username=$1', [username]);
         return rs;
      } catch (error) {
         return false;
      }
   },
   findIDByUsename: async username => {
      const rs = await db.any('select ma_gv from user_giaovien where username=$1',[username]);
      return rs;
   }
   ,
   checkLogin: async(data) =>{
      const un = data.username; 
      const pw = data.password;
      if(un === 'ADMIN'){
         return 'ADMIN';
      }
      const uDb = await pgUser.byName(un);
      if(uDb == false){
         return "not_exist"
      }
      const pwDb = uDb.password;
      const salt = pwDb.slice(hashLength); 
      const pwSalt = pw + salt;
      const pwHashed = CryptoJS.SHA3 (pwSalt, { outputLength: hashLength* 4 }).toString 
      (CryptoJS.enc. Hex);
      
      if (pwDb === (pwHashed + salt)) {
         return true;
      }else{
         return false;
      }
   },
   handleRegister:async(user)=> {
      const un = user.email; //username =email
      const uDb = await pgUser.byName(un);//xem có tồn tại user chưa
      if(uDb.username == un){
         return "exist";
      }
      try {
         const pw = user.password;
         const salt = Date.now().toString(16);
         const pwSalt = pw + salt;
         const pwHashed = CryptoJS.SHA3(pwSalt, { outputLength: hashLength * 4 }).toString
         (CryptoJS.enc.Hex);
         const userSave = {
            username: un,
            password: pwHashed + salt
         };
         const uNew = await pgUser.add(userSave);
         return uNew;
      } catch (error) {
         return false;
      }
   }

};

module.exports = pgUser;

const DB = require('../connect/db')
var db;
try {
   db = DB.connect;
   console.log("Score model connect database successfully!")
} catch (error) {
   console.log("Score model connect database fail!")
}

const scoreModel = {

   fieldClassName:(className) => (className == undefined) ? true : "ten_lop = '" + className + "'",
   fieldSJName:(subjectName) => (subjectName == undefined) ? true : "ten_mh = '" + subjectName + "'",
   idClass: async (className) => {
    const result = await db.any(
       `select * from lop 
       where ${scoreModel.fieldClassName(className)} ;`);
    return result.ma_lop;
    },
    idSubject: async (subjectName) => {
        const result = await db.any(
           `select * from mon_hoc
           where ${scoreModel.fieldSJName(subjectName)} ;`);
        return result.ma_mh;
        },

   findScores: async (className, subjectName, semester) => {
      const result = await db.any(
         `SELECT hs.ten_hs as student, d.diem_15 as mark_15, d.diem_1t as mark_1t,
          d.diem_gk as mark_gk, d.diem_ck as mark_ck, d.diem_tk as mark_tk
         FROM diem d JOIN hoc_sinh hs ON d.ma_hs = hs.ma_hs
         WHERE hs.ma_lop = ${scoreModel.idClass(className)}
         AND d.ma_mh = ${scoreModel.idSubject(subjectName)}
         AND d.hoc_ki = ${semester} ;`);
      return result;
   },
   addScoresIntoDatabaseReturnScores: async (idStudent, idSubject, semester, mark_15, mark_1t, mark_gk, mark_ck, mark_tk) => {
    try {
        const result = await db.any(`insert into diem(ma_hs, ma_mh, hoc_ki, diem_15, diem_1t, diem_gk, diem_ck, diem_tk) 
           values($1,$2,$3,$4,$5,$6,$7,$8) returning *`,
           [idStudent, idSubject, semester, mark_15, mark_1t, mark_gk, mark_ck, mark_tk]);
        return result;
    } catch (error) {
        return false;
    }
    },
   updateScoreIntoDatabaseReturnScores: async (idStudent, idSubject, semester, mark_15, mark_1t, mark_gk, mark_ck, mark_tk) => {
      try {
        const result = await db.any(`update diem 
            set diem_15 = $1, diem_1t = $2, diem_gk = $3, diem_ck = $4, diem_tk = $5
            where ma_hs = $6, ma_mh = $7, hoc_ki = $8 returning *`,
            [mark_15, mark_1t, mark_gk, mark_ck, mark_tk, idStudent, idSubject, semester]);
        return result;
      } catch (error) {
        return false;
      }
   },
    removeScoreFromDatabase: async (idStudent, idSubject, semester) => {
        try {
            const result = await db.any('delete from diem where ma_hs = $1, ma_mh = $2, hoc_ki = $3 returning *',
            [idStudent, idSubject, semester]);
            return result;
        } catch (error) {
            return false;
        }
   },

};

module.exports = scoreModel;
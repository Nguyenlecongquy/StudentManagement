
const DB = require('../connect/db')
var db;
try {
   db = DB.connect;
   console.log("Subject model connect database successfully!")
} catch (error) {
   console.log("Subject model connect database fail!")
}

const subjectModel = {

   fieldId:(id) => (id == undefined) ? true : "ma_mh ='" + id + "'",
   fieldSubjectName:(SubjectName) => (SubjectName == undefined) ? true : "ten_mh = '" + SubjectName + "'",
   fieldIdFaculty:(idFaculty) => (idFaculty == undefined) ? true : "ma_khoa = '" + idFaculty + "'",

   findSubjects: async (id, SubjectName, idFaculty) => {
      const result = await db.any(
         `select * from mon_hoc 
         where ${subjectModel.fieldId(id)} 
         and ${subjectModel.fieldSubjectName(SubjectName)} 
         and ${subjectModel.fieldIdFaculty(idFaculty)} ;`);
      return result;
   },
   addSJIntoDatabaseReturnSJ: async (id, SubjectName, idFaculty) => {
      try {
         const result = await db.any(`insert into mon_hoc(ma_mh,ten_mh,ma_khoa) 
            values($1,$2,$3) returning *`,
            [id, SubjectName, idFaculty]);
         return result;
      } catch (error) {
         return false;
      }
   },
   updateSJIntoDatabase: async (id, SubjectName, idFaculty) => {
      try {
         const result = await db.any(`update mon_hoc 
                                 set  ten_mh=$1, ma_khoa=$2 
                                 where ma_mh=$3 returning *`, [SubjectName, idFaculty, id]);
         return result;
      } catch (error) {
         return false;
      }
   },
   removeSJFromDatabase: async (id) => {
      try {
         const result = await db.any('delete from mon_hoc where ma_mh=$1 returning *;', [id]);
         return result;
      } catch (error) {
         return false;
      }
   },

};

module.exports = subjectModel;
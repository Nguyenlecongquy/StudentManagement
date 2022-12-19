const teacherM = require('../models/teacher.m')

class TeacherC {
   async search(req, res) {
      const response = { teachers: [] };
      const teacher = req.query;
      console.log(teacher);
      response.teachers = await teacherM.findGVs(teacher.id, teacher.fullName);
      res.status(200).json(response);
   }
   reset(req, res) {
      const response = { teachers: [] };
      res.status(200).json(response);
   }
   async add(req, res) {
      //xu li trung
      const response = { teachers: [] };
      const teacher = req.body;
      const result = await teacherM.addGVIntoDatabaseReturnGV(teacher.id,teacher.fullName,teacher.birthday);
      response.teachers = result;
      res.status(200).json(response);
   }
   async modify(req, res) {
      const response = { teachers: [] };
      const teacher = req.body;
      const result = await teacherM.updateGVIntoDatabase(teacher.id,teacher.fullName,teacher.birthday,teacher.idFaculty);
      response.teachers = result;
      res.status(200).json(response);
   }
   async remove(req, res) {
      const response = { remove: false};
      const teacher = req.body;
      const result = await teacherM.removeGVfromDatabase(teacher.id);
      response.remove = result;
      res.status(200).json(response);
   }
}

module.exports = new TeacherC;
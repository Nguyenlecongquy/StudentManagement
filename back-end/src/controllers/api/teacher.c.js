const teacherM = require('../../models/teacher.m')

class TeacherC {
   async search(req, res) {
      const response = {status:true, teachers: [] };
      const teacher = req.query;
      const result = await teacherM.findGVs(teacher.id, teacher.fullName);
      if(result!= [] && result!= false ) response.teachers = result;
      else response.status = false; // khi tìm sai id 
      res.status(200).json(response);
   }
   reset(req, res) {
      const response = {status:true, teachers: [] };
      res.status(200).json(response);
   }
   async add(req, res) {
      const response = {status:true, teachers: [] };
      const teacher = req.body;
      const result = await teacherM.addGVIntoDatabaseReturnGV(teacher.id,teacher.fullName,teacher.birthday,teacher.idFaculty) ;
      if(result!= [] && result!= false ) response.teachers = result;
      else response.status = false;//trùng id, sai mã khoa
      res.status(200).json(response);
   }
   async modify(req, res) {
      const response = {status:true, teachers: [] };
      const teacher = req.body;
      const result = await teacherM.updateGVIntoDatabase(teacher.id,teacher.fullName,teacher.birthday,teacher.idFaculty);
      if(result!= [] && result!= false ) response.teachers = result;
      else response.status = false;//không tìm thấy id
      res.status(200).json(response);
   }
   async remove(req, res) {
      const response = {status:true, teachers: []};
      const teacher = req.body;
      console.log(teacher.id);
      const result = await teacherM.removeGVfromDatabase(teacher.id);
      if(result!= [] && result!= false ) response.teachers = result;
      else response.status = false;
      res.status(200).json(response);
   }
}

module.exports = new TeacherC;
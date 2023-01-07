const studentM = require('../../models/student.m')

class studentC {
   async search(req, res) {
      const response = {status:true, students: [] };
      const student = req.query;
      console.log(student);
      const result = await studentM.findHSs(student.id, student.fullName);
      if(result!= [] && result!= false ) response.students = result;
      else response.status = false; // khi tìm sai id 
      res.status(200).json(response);
   }
   reset(req, res) {
      const response = {status:true, students: [] };
      res.status(200).json(response);
   }
   async add(req, res) {
      const response = {status:true, students: [] };
      const student = req.body;
      const result = await studentM.addHSIntoDatabaseReturnHS(
        student.id, student.fullName, student.sex, student.birthDay, student.address, student.idClass) ;
      if(result!= [] && result!= false ) response.students = result;
      else response.status = false;//trùng id, sai mã lớp
      res.status(200).json(response);
   }
   async modify(req, res) {
      const response = {status:true, students: [] };
      const student = req.body;
      const result = await studentM.updateHSIntoDatabase(
        student.id, student.fullName, student.sex, student.birthDay, student.address, student.idClass, student.oldIdClass) ;
      if(result!= [] && result!= false ) response.students = result;
      else response.status = false;//không tìm thấy id || thông tin điền không chính xác
      res.status(200).json(response);
   }
   async remove(req, res) {
      const response = {status:true, students: []};
      const student = req.body;
      const result = await studentM.removeHSfromDatabase(student.id);
      if(result!= [] && result!= false ) response.students = result;
      else response.status = false;
      res.status(200).json(response);
   }
}

module.exports = new studentC;
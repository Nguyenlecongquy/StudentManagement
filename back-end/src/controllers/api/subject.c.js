const subjectM = require('../../models/subject.m')

class subjectC {
   async search(req, res) {
      const response = {status:true, subjects: [] };
      const subject = req.query;
      const result = await subjectM.findSubjects(subject.id, subject.subjectName,subject.idFaculty);
      if(result!= [] && result!= false ) response.subjects = result;
      else response.status = false; // khi tìm sai id 
      res.status(200).json(response);
   }
   reset(req, res) {
      const response = {status:true, subjects: [] };
      res.status(200).json(response);
   }
   async add(req, res) {
      const response = {status:true, subjects: [] };
      const subject = req.body;
      const result = await subjectM.addSJIntoDatabaseReturnSJ(subject.id,subject.subjectName,subject.idFaculty);
      if(result!= [] && result!= false ) response.subjects = result;
      else response.status = false; // lỗi ID hoặc mã khoa
      res.status(200).json(response);
   }
   async modify(req, res) {
      const response = {status:true, subjects: [] };
      const subject = req.body;
      const result = await subjectM.updateSJIntoDatabase(subject.id,subject.subjectName,subject.idFaculty);
      if(result!= [] && result!= false ) response.subjects = result;
      else response.status = false; // lỗi ID hoặc mã khoa
      res.status(200).json(response);
   }
   async remove(req, res) {
      const response = {status:true, subjects: [] };
      const subject = req.body;
      const result = await subjectM.removeSJFromDatabase(subject.id);
      if(result!= [] && result!= false ) response.subjects = result;
      else response.status = false; // khi nhập sai ID
      res.status(200).json(response);
   }
}

module.exports = new subjectC;
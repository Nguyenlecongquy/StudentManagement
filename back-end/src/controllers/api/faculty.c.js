const facultyM = require('../../models/faculty.m')

class FacultyC {
   async search(req, res) {
      const response = {status:true, facultys: [] };
      const faculty = req.query;
      const result = await facultyM.findKhoas(faculty.id, faculty.facultyName, faculty.shortFacultyName);
      if(result!= [] && result!= false ) response.facultys = result;
      else response.status = false; // khi tìm sai id 
      res.status(200).json(response);
   }
   reset(req, res) {
      const response = {status:true, facultys: [] };
      res.status(200).json(response);
   }
   async add(req, res) {
      const response = {status:true, facultys: [] };
      const faculty = req.body;
      const result = await facultyM.addKhoaIntoDatabaseReturnKhoa(faculty.id,faculty.facultyName,faculty.shortFacultyName);
      if(result!= [] && result!= false ) response.facultys = result;
      else response.status = false; // khi tìm sai id 
      res.status(200).json(response);
   }
   async modify(req, res) {
      const response = {status:true, facultys: [] };
      const faculty = req.body;
      const result = await facultyM.updateKhoaIntoDatabase(faculty.id,faculty.facultyName,faculty.shortFacultyName);
      if(result!= [] && result!= false ) response.facultys = result;
      else response.status = false; // khi tìm sai id 
      res.status(200).json(response);
   }
   async remove(req, res) {
      const response = {status:true, facultys: [] };
      const faculty = req.body;
      const result = await facultyM.removeKhoaFromDatabase(faculty.id);
      if(result!= [] && result!= false ) response.facultys = result;
      else response.status = false; // khi tìm sai id 
      res.status(200).json(response);
   }
}

module.exports = new FacultyC;
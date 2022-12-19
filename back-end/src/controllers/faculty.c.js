const facultyM = require('../models/faculty.m')

class FacultyC {
   async search(req, res) {
      const response = { facultys: [] };
      const faculty = req.query;
      response.facultys = await facultyM.findKhoas(faculty.id, faculty.facultyName, faculty.shortFacultyName);
      res.status(200).json(response);
   }
   reset(req, res) {
      const response = { facultys: [] };
      res.status(200).json(response);
   }
   async add(req, res) {
      const response = { facultys: [] };
      const faculty = req.body;
      const result = await facultyM.addKhoaIntoDatabaseReturnKhoa(faculty.id,faculty.facultyName,faculty.shortFacultyName);
      response.facultys = result;
      res.status(200).json(response);
   }
   async modify(req, res) {
      const response = { facultys: [] };
      const faculty = req.body;
      const result = await facultyM.updateKhoaIntoDatabase(faculty.id,faculty.facultyName,faculty.shortFacultyName);
      response.facultys = result;
      res.status(200).json(response);
   }
   async remove(req, res) {
      const response = { facultys: [] };
      const faculty = req.body;
      const result = await facultyM.removeKhoaFromDatabase(faculty.id);
      response.facultys = result;
      res.status(200).json(response);
   }
}

module.exports = new FacultyC;
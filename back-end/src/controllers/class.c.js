const classM = require('../models/class.m')

class ClassC {
   async search(req, res) {
      const response = { classes: [] };
      const lop = req.query;
      response.classes = await classM.findLops(lop.id, lop.grade);
      res.status(200).json(response);
   }
   reset(req, res) {
      const response = { classes: [] };
      res.status(200).json(response);
   }
   async add(req, res) {
      const response = { classes: [] };
      const lop = req.body;
      const result = await classM.addLopIntoDatabaseReturnLop(lop.id, lop.number, lop.grade, lop.facultyId);
      response.classes = result;
      res.status(200).json(response);
   }
   async modify(req, res) {
      const response = { classes: [] };
      const lop = req.body;
      const result = await classM.updateLopIntoDatabase(lop.id, lop.number, lop.grade,);
      response.classes = result;
      res.status(200).json(response);
   }
   async remove(req, res) {
      const response = { classes: [] };
      const lop = req.body;
      const result = await classM.removeLopFromDatabase(lop.id);
      response.classes = result;
      res.status(200).json(response);
   }
}

module.exports = new ClassC;
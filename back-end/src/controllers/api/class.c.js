const classM = require('../../models/class.m')

class ClassC {
   async search(req, res) {
      const response = {status:true, classes: [] };
      const lop = req.query;
      const result= await classM.findLops(lop.id, lop.grade);
      if(result!= [] && result!= false ) response.classes = result.sort(function(a, b){
         if (a.ma_lop < b.ma_lop) {
            return -1;
          }
          if (a.ma_lop > b.ma_lop) {
            return 1;
          }
          return 0;
      });
      else response.status =false; // khi không thấy id (không bao giờ xảy ra)
      res.status(200).json(response);
   }
   reset(req, res) {
      const response = {status:true, classes: [] };
      res.status(200).json(response);
   }
   async add(req, res) {
      const response = {status:true, classes: [] };
      const lop = req.body;
      const result = await classM.addLopIntoDatabaseReturnLop(lop.id, lop.number, lop.grade, lop.facultyId);
      if(result!= [] && result!= false ) response.classes = result;
      else response.status =false;//thêm trùng id
      res.status(200).json(response);
   }
   async modify(req, res) {
      const response = {status:true, classes: [] };
      const lop = req.body;
      console.log(lop);
      const result = await classM.updateLopIntoDatabase(lop.idOld,lop.idNew, lop.number, lop.grade,lop.facultyId);
      if(result!= [] && result!= false ) response.classes = result;
      else response.status =false; // khi không thấy id (không bao giờ xảy ra)
      res.status(200).json(response);
   }
   async remove(req, res) {
      const response = {status:true, classes: [] };
      const lop = req.body;
      const result = await classM.removeLopFromDatabase(lop.id);
      if(result!= [] && result!= false ) response.classes = result;
      else response.status =false; // khi không thấy id (không bao giờ xảy ra)
      res.status(200).json(response);
   }
}

module.exports = new ClassC;
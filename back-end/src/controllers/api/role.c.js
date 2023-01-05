const roleM = require('../../models/role.m')

class RoleC {
      
   async searchAll(req,res){
      const response = {status:true, roles: {} };
      const result = await roleM.findAllRole();
      if(result!= [] && result!= false ) response.roles = result;
      else response.status =false; // khi không thấy id (không bao giờ xảy ra)
      res.status(200).json(response);
   }
   async searchRoleNumberStudentOfClass(req,res){
      const response = {status:true, roles: {} };
      const role = req.query;
      const result = await roleM.findRoleNumberStudentOfClass();
      if(result!= [] && result!= false ) response.roles = result;
      else response.status =false; // khi không thấy id (không bao giờ xảy ra)
      res.status(200).json(response);
   }
   async searchRoleNumberClassOfGrade(req,res){
      const response = {status:true, roles: {} };
      const role = req.query;
      const result = await roleM.findRoleNumberClassOfGrade(role.grade);
      if(result!= [] && result!= false ) response.roles = result;
      else response.status =false; // khi không thấy id (không bao giờ xảy ra)
      res.status(200).json(response);
   }
   async countClassesByGrade(req,res){
      const response = {status:true, roles: {} };
      const role = req.query;
      const result = await roleM.countClassesByGrade(role.grade);
      if(result!= [] && result!= false ) response.roles = result;
      else response.status =false; // khi không thấy id (không bao giờ xảy ra)
      res.status(200).json(response);
   }
   async modifyRoleNumberStudentOfClass(req, res) {
      const response = {status:true, roles: {} };
      const role = req.body;
      const result = await roleM.updateRoleNumberStudentOfClass(role.maxNumber);
      if(result!= [] && result!= false ) response.roles = result;
      else response.status =false; // khi không thấy id (không bao giờ xảy ra)
      res.status(200).json(response);
   }

   async modifyRoleNumberClassOfGrade(req, res) {
      const response = {status:true, roles: {} };
      const role = req.body;
      const result = await roleM.updateRoleNumberClassOfGrade(role.grade,role.numberClass);
      if(result!= [] && result!= false ) response.roles = result;
      else response.status =false; // khi không thấy id (không bao giờ xảy ra)
      res.status(200).json(response);
   }

   async modifyPassScore(req, res) {
      const response = {status: true, roles: {}};
      const role = req.body;
      const result = await roleM.updatePassScore(role.score);

      if(result != [] && result != false) response.roles = result;
      else response.status =false; 
      res.status(200).json(response);
   }
   async modifyRangeOfAgeStudent(req, res) {
      const response = {status: true, roles: {}};
      const age = req.body;

      const result = await roleM.updateRangOfAgeStudent(age.minAge, age.maxAge);

      if(result != [] && result != false) response.roles = result;
      else response.status =false; 
      res.status(200).json(response);
   }

}

module.exports = new RoleC;
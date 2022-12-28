const roleM = require('../../models/role.m')

class RoleC {
      
   async searchAll(req,res){
      const response = {status:true, roles: {} };
      const role = req.query;
      const result = await roleM.findAllRole();
      if(result!= [] && result!= false ) response.roles = result;
      else response.status =false; // khi không thấy id (không bao giờ xảy ra)
      res.status(200).json(response);
   }
   async searchMaxNumberClass(req,res){
      const response = {status:true, roles: {} };
      const role = req.query;
      const result = await roleM.findMaxNumberClass();
      if(result!= [] && result!= false ) response.roles = result;
      else response.status =false; // khi không thấy id (không bao giờ xảy ra)
      res.status(200).json(response);
   }

   async modifyMaxNumberClass(req, res) {
      const response = {status:true, roles: {} };
      const role = req.body;
      const result = await roleM.updateMaxNumberClass(role.maxNumber);
      if(result!= [] && result!= false ) response.roles = result;
      else response.status =false; // khi không thấy id (không bao giờ xảy ra)
      res.status(200).json(response);
   }

}

module.exports = new RoleC;
const inforM = require('../../models/infor.m')

class InforC {
      
   async search(req,res){
      const response = {status:true, infors: {} };
      const infor = req.query;
      const result = await inforM.findInfors(infor.id,infor.category);
      if(result!= [] && result!= false ) response.infors = result;
      else response.status =false; 
      res.status(200).json(response);
   }
   
   async modify(req, res) {
      const response = {status:true, infors: {} };
      const infor = req.body;

      const result = await inforM.updateInfors(infor.id,infor.email,infor.password,infor.category);
      if(result!= [] && result!= false ) response.infors = result;
      else response.status =false;
      res.status(200).json(response);
   }

   

}

module.exports = new InforC;
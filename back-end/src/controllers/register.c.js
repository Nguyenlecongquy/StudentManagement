const userM = require('../modules/user.m')
const {PORT} = require('../configs/const')

class RegisterC {
   index(req, res) {
      res.render('register');
   }
   async handleRegister(req, res, next) {
      const user = req.body;
      let response = {code:'200'};
      const uNew = await userM.handleRegister(user);
      if(uNew == "exists"){
         response.code = 409;
         response.status = false;
         response.result = 'exist';
         response.url = `http://localhost:${PORT.PORT_CLIENT}/register`;
         response.messege = 'Email đã tồn tại';
      } else if(uNew == false){
         response.code = 400;
         response.status = false;
         response.result = 'fail';
         response.url = `http://localhost:${PORT.PORT_CLIENT}/register`;
         response.messege = 'Đăng ký thất bại, lỗi databse';
      } else {
         response.code = 200;
         response.status = true;
         response.result = 'success';
         response.url = `http://localhost:${PORT.PORT_CLIENT}/login`;
         response.messege = 'Đăng ký thành công';
         response.user = uNew;
      }
      return res.status(response.code).json(response);

   }
}
module.exports = new RegisterC;
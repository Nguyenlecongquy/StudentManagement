const userM = require('../models/user.m')
const {PORT} = require('../configs/const')

class RegisterC {
   index(req, res) {
      res.render('register');
   }
   async handleRegister(req, res, next) {
      const user = req.body;
      // console.log("register infor", user)
      let response = {code:'200'};
      const data = {'username':user.username,'password': user.password, 'category': user.category, 'id': user.id}
      const uNew = await userM.checkRegister(data);
      // console.log("unew",uNew)
      if (uNew == "exist_username"){
         // response.code = 409;
         response.status = false;
         response.result = 'exist';
<<<<<<< HEAD
=======
         //response.url = `http://localhost:${PORT.PORT_CLIENT}/register`;
>>>>>>> bfcd9abacf68a86710be0fb718eba88e04ac2dcc
         response.message = 'Email đã được sử dụng';
      } 
      else if (uNew == "exist_id"){
         // response.code = 409;
         response.status = false;
         response.result = 'exist';
<<<<<<< HEAD
=======
         //response.url = `http://localhost:${PORT.PORT_CLIENT}/register`;
>>>>>>> bfcd9abacf68a86710be0fb718eba88e04ac2dcc
         response.message = 'ID đã được sử dụng';
      }
      else if (uNew == "NotExist_id"){
         // response.code = 409;
         response.status = false;
         response.result = 'NotExist';
<<<<<<< HEAD
=======
         //response.url = `http://localhost:${PORT.PORT_CLIENT}/register`;
>>>>>>> bfcd9abacf68a86710be0fb718eba88e04ac2dcc
         response.message = 'ID không tồn tại';
      }
      else if(uNew == false){
         // response.code = 400;
         response.status = false;
         response.result = 'fail';
<<<<<<< HEAD
=======
         //response.url = `http://localhost:${PORT.PORT_CLIENT}/register`;
>>>>>>> bfcd9abacf68a86710be0fb718eba88e04ac2dcc
         response.message = 'Đăng ký thất bại, lỗi cơ sở dữ liệu';
      } 
      else {
         // response.code = 200;
         response.status = true;
         response.result = 'success';
<<<<<<< HEAD
=======
         //response.url = `http://localhost:${PORT.PORT_CLIENT}/login`;
>>>>>>> bfcd9abacf68a86710be0fb718eba88e04ac2dcc
         response.message = 'Đăng ký thành công! Hãy đăng nhập';
         uNew.password = user.password;
         response.user = uNew;
      }
      return res.status(response.code).json(response);

   }
}
module.exports = new RegisterC;
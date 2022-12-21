const userM = require('../models/user.m')

class LoginC {
   index(req,res){
      res.render('login');
   }
   async handleLogin(req,res,next){
      const user = req.body;
      let response = {code:200};

      const data = {'username':user.username,'password': user.password, 'category': user.category}
      console.log("data",data)
      const check = await userM.checkLogin(data);
      console.log("check:",check)
      if(req.session.username != undefined 
         && req.session.username == user.username 
         && req.session.password == user.password
         ){
         console.log('Dang nhap dua vao luu password')
         response.status = true;
         response.result = 'resuccess';
         response.message = 'Đăng nhập thành công nhờ lưu password';
      } 
      else {
         if (check == "not_exist"){
            response.status = false;
            response.result = 'fail';
            response.message = 'Đăng nhập thất bại, tên người dùng không tồn tại';
         }
         else if(check == true){
            req.session.username = data.username;
            req.session.password = data.password;
            response.status = true;
            response.result = 'success';
            response.message = 'Đăng nhập thành công, đã lưu mật khẩu';
         }
         else{
            console.log('a')
            response.status = false;
            response.result = 'fail';
            response.message = 'Đăng nhập thất bại sai mật khẩu';
         }
      }
      return res.status(response.code).json(response);
   }
   async handleLogout(req,res,next){
      delete req.session.username;
      delete req.session.pw;
   }

}

module.exports =new LoginC;
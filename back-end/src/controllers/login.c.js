const userM = require('../modules/user.m')
const {PORT} = require('../configs/const')

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
      console.log('req.session', req.session);
      if(req.session.username != undefined 
         && req.session.username == user.username 
         && req.session.password == user.password
         )
         {
         console.log('Dang nhap dua vao luu password')
         response.code = 200;
         response.status = true;
         response.result = 'resuccess';
         response.url = `http://localhost:${PORT.PORT_CLIENT}/home`;
         response.messege = 'Đăng nhập thành công nhờ lưu password';
      } 
      else {
         if (check == "not_exist"){
            response.code = 400;
            response.status = false;
            response.result = 'fail';
            response.url = `http://localhost:${PORT.PORT_CLIENT}/login`;
            response.messege = 'Đăng nhập thất bại, username không tồn tại';
         }
         else if(check == true){
            req.session.username = data.username;
            req.session.password = data.password;
            response.code = 200;
            response.status = true;
            response.result = 'success';
            response.url = `http://localhost:${PORT.PORT_CLIENT}/home`;
            response.messege = 'Đăng nhập thành công, đã lưu password';
         }
         else{
            response.code = 400;
            response.status = false;
            response.result = 'fail';
            response.url = `http://localhost:${PORT.PORT_CLIENT}/login`;
            response.messege = 'Đăng nhập thất bại sai password';
         }
      }
      return res.status(response.code).json(response);
   }
   async handleLogout(req,res,next){
      delete req.session.username;
      delete req.session.pw;
      res.status(200).json({result:"redirect",url:"/"});
   }

}

module.exports =new LoginC;
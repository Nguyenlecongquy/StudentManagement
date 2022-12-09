// const userM = require('../modules/user.m')
// const importM = require('../modules/import.m')
const movieM = require('../modules/movie.m')

class HomeC {
   index(req,res){
      movieM.getMoviesTopRating()
         .then(data=>{
            // slice(0,8) lấy 8 movie đầu
            res.render("home",{movies:data.slice(0,8)});
         })
   }
   homenav(req,res){
      if(req.session.un == undefined ){
         console.log('Chưa đăng nhập')
         res.status(200).json({ result: "redirect", url: "http://localhost:20603/",indb:false, msg:"Chưa đăng nhập" });
      } else{
         res.status(200).json({ result: "redirect", url: "http://localhost:20603/home",indb:false,msg:`Tiếp tục phiên đăng nhập của ${req.session.un}`});
      }
   }
   async show(req,res){
      const slug = req.params.slug;
      const data = await movieM.getDetail(slug);
      console.log(data)
      res.render('detail',data);
   }

}



module.exports = new HomeC;
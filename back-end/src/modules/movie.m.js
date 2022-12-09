
const DB = require('../connect/db')
const db =DB.connect;

const HomeM= {
   getIdUser:async(un)=>{
      const idUser = await db.one('select id from Users where username=$1',[un])
      return idUser;
   },

   getMoviesTopRating: async () => {
      const rs = await db.any('select * from movies order by rating desc');
      return rs;
   },
   getMoviesFavorite: async (username) => {
      const idUser = (await HomeM.getIdUser(username)).id;
      // console.log(idUser)
      const query = `
         select f.idUser,f.idMovie,mv.title,mv.img,mv.rating 
         from movies mv join favorites_movie f on mv.id = f.idMovie 
         join Users u on u.id = f.idUser
         where f.idUser = ${idUser};
      `;
      const rs = await db.any(query);
      return rs;
   },
   addFavorite: async (movie) => {
      try {
         const rs = await db.one('insert into favorites_movie(idUser,idMovie) values($1,$2) returning *',[movie.idUser,movie.idMovie]);
         return rs;
      } catch (error) {
         return false;
      }
   },
   removeFavorite: async (movie) => {
      try {
         const rs = await db.any('delete from favorites_movie where iduser=$1 and idmovie=$2',[movie.idUser,movie.idMovie]);
         return true;
      } catch (error) {
         return false;
      }
   },
   getDetail:async (slug)=>{
      const query1 = `
         select m.id,m.title,m.rating,m.img,d.sumary
         from movies m join detail_movie d on m.id = d.idmovie
         where m.id= $1;
      `;
      const query2 = `
         select c.id,c.name,c.image
         from casts_movie cm join casts c on cm.idcast = c.id
         where cm.idmovie = $1;
      `;
      try {
         const movie = await db.one(query1,[slug]);
         const casts = await db.any(query2,[slug]);
         return {movie,casts};
      } catch (error) {
         console.log("Lỗi ở  getDetail")
      }


   }

};

module.exports = HomeM;
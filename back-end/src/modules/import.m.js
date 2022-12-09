
const DB = require('../connect/db')
const db =DB.connect;
const movie_list = require('../tool/movies.json')
const cast_list = require('../tool/casts.json')
const ImportDb = {
   importMovies:() => {
      const query = `
         insert into movies(id,title,genres,img,rating) values($1,$2,$3,$4,$5);
      `;
      movie_list.forEach(function(movie){ 
         const genres = movie.genres.join(',');
         db.any(query,[movie.id,movie.title,genres,movie.img,movie.rating])
      })
      console.log("import movies successfully")
   },
   importCasts:() => {
      const query = `
         insert into casts(id,image,legacynametext,name,birthday,birthplace,gender,
            heightcentimers,nicknames,realname) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);
      `;
      cast_list.forEach(function(cast){ 
         let nicknames="";
         if(cast.nicknames == undefined){
            nicknames = null;
         }else{
            nicknames = cast.nicknames.join(',');
         }
         db.any(query,[cast.id, cast.image,cast.legacyNameText,cast.name,cast.birthdate, cast.birthplace
            ,cast.gender,cast.heightcentimers,nicknames,cast.realname])
      })
      console.log("import casts successfully")
   },
   importDetail:() => {
      const query = `
         insert into detail_movie(idmovie,img,sumary) values($1,$2,$3);
      `;
      movie_list.forEach(function(movie){ 
         let sumary =""
         if(movie.synopses==undefined){
            sumary=null
         }else{
            sumary = movie.synopses.text;
         }
         
         db.any(query,[movie.id,movie.img,sumary]);
      })
      console.log("import detail successfully")
   },
   importCastsMovie:() => {
      const query = `
         insert into casts_movie(idmovie,idcast,namecharacter) values($1,$2,$3);
      `;
      movie_list.forEach(function(movie){ 
         movie.casts.forEach(function(cast){
            let character =""
            if(cast.characters == undefined){
               character=null
            }else{
               character = cast.characters.join(',');
            }
            db.any(query,[movie.id,cast.id,character]);

         })
      })
      console.log("import detail successfully")
   }

}

//  ImportDb.importCasts();
module.exports = ImportDb;

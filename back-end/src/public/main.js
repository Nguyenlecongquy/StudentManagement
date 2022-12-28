// $(() => {
//     $("#btn-register").on("click", (e) => {
//         e.preventDefault();
//         const n = $("#n").val();
//         const un = $("#un").val();
//         const pw = $("#pw").val();
//         // console.log(un,pw,n);
//         const user = {
//             n,
//             un,
//             pw,
//         };
//         if (n !== "" && un !== "" && pw !== "") {
//             $.ajax({
//                 url: "http://localhost:20603/register/",
//                 type: "POST",
//                 data: user,
//             }).done((data) => {
//                 if (data.result === "redirect") {
//                     window.location.assign(data.url);
//                 }else if(data.result === "fail"){
//                     alert("Đăng ký thất bại, lỗi database");
//                     window.location.assign(data.url);
//                 }else if(data.result === "exists"){
//                     alert("Tên đăng nhập đã tồn tại!");
//                     window.location.assign(data.url);
//                 }

//             });
//         } else {
//             alert("Chưa nhập username|password|name");
//         }
//     });

//     $('#btn-login').on('click', (e) => {
//         e.preventDefault();
//         const un = $("#un").val();
//         const pw = $("#pw").val();

//         const user = {
//             un,
//             pw,
//         }
//         if (un !== "" && pw !== "") {
//             $.ajax({
//                 url: "http://localhost:20603/",
//                 type: "POST",
//                 data: user,
//             }).done((data) => {
//                 if (data.result === "redirect" && data.indb==true) {
//                     alert("Đăng nhập thành công!");
//                     window.location.assign(data.url);
//                 } else if (data.result === "redirect" && data.indb==false) {
//                     alert("Đăng nhập thành công với mật khẩu đã lưu ở session!");
//                     window.location.assign(data.url);
//                 } else if(data.result ==="fail"){
//                     alert("Sai user name hoặc password");
//                 }else if(data.result ==="notexists"){
//                     alert("Tên đăng nhập không tồn tại!");
//                 }
                
//             });
//         } else {
//             alert("Chưa nhập user name hoặc passord");
//         }

//     });

//     $('#btn-logout').on('click', (e) => {
//         e.preventDefault();
//         $.ajax({
//             url: "http://localhost:20603/logout",
//             type: "POST",
//             data: {}
//         }).done((data) => {
//             if (data.result === "redirect") {
//                 alert("Đăng xuất sẽ không lưu mật khẩu ở session!\n Bạn có muốn đăng xuất!")
//                 window.location.assign(data.url);
//             } 
//         });
//     });
//     $('#btn-home').on('click', (e) => {
//         e.preventDefault();
//         $.ajax({
//             url: "http://localhost:20603/home/homenav",
//             type: "GET",
//             data: {}
//         }).done((data) => {
//             if (data.result === "redirect") {
//                 if(data.msg != undefined){
//                     alert(data.msg)
//                 }
//                 window.location.assign(data.url);
//             } 
//         });

//     });
//     $('.btn-favorite').on('click', (e) => {
//         e.preventDefault();
//         const idMovie= e.target.id;
//         $.ajax({
//             url: "http://localhost:20603/favorite",
//             type: "POST",
//             data: {idMovie:idMovie}
//         }).done((data) => {
//             if (data.result === "success") {
//                 alert(data.msg)
//                 // console.log(e);
//                 // window.location.assign(data.url);
//             } 
//         });
//     });
//     $('.btn-unfavorite').on('click', (e) => {
//         e.preventDefault();
//         const idMovie= e.target.getAttribute('idmovie');
//         const idUser= e.target.getAttribute('iduser') ;
//         // console.log(idMovie,idUser)
//         $.ajax({
//             url: "http://localhost:20603/favorite/unfavorite",
//             type: "POST",
//             data: {idUser:idUser,idMovie:idMovie}
//         }).done((data) => {
//             if (data.result === "redirect") {
//                 if(data.msg != undefined){
//                     alert(data.msg)
//                 }
//                 window.location.assign(data.url);
//             } 
//         });

//     })
// });

<template>
    <div>
        <div class="header" >
            <h1  class="headerText">Đăng xuất </h1>
            <h1  class="headerText">Thông tin </h1>
        </div>
        <ul>
            <li><a href="#home">Trang chủ</a></li>
            <li><a href="#classes">Lớp</a></li>
            <li><a href="#students">QL. Học sinh</a></li>
            <li><a href="#teachers">QL. Giáo viên</a></li>
            <li><a href="#subjects">QL.Môn học</a></li>
            <li><a href="#score">QL. Điểm</a></li>
            <li><a href="#report">QL. Điểm tổng</a></li>
            <li><a href="#members">Thành viên</a></li>
            <li><a href="#role">Vai trò</a></li>
            <li><a href="#tos">Điều khoản</a></li>
        </ul>
        <div>
            hello
        </div>
    </div>
 
</template>
  
<script>
 export default {
  name: "HomeCom",
 }
</script>

<style scoped>
.headerText{
    color:#4765f6; 
    float: right;
    margin: 2px;
}
.header{
    background-color: white;
    height: 100px;
    width: 200%;
}
ul {
  width: 361px;
  height: auto;
  list-style-type: none;
  margin:0;
  padding:0;
  overflow:hidden;
  background-color: #4f6dfd;
  border-radius: 12px;
  box-shadow: 1px 1px 20px rgb(204, 199, 199);
}

li {
  border-bottom: 1px solid blue ;
}
li a {
  width:361px;
  display: block;
  color:white;
  text-align: left;
  padding: 14px 16px;
  text-decoration: none;
}
li a:hover{
  background-color: #4765f6;
}
</style>
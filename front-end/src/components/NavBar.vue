<script>
export default {
  name: "NavBar",
 
};
</script>

<template>
   <div class="header" >
      <router-link to="/accountInfo" class="headerText" >Thông tin cá nhân</router-link>
      <router-link to="/" class="headerText">Đăng xuất</router-link>
    </div>
  <nav>
        <ul class="nav-link">
            <li><router-link to="/home" >Trang chủ</router-link></li>
            <li><router-link to="/home/class" >Lớp</router-link></li>
            <li><router-link to="/home/student" >Học sinh</router-link></li>
            <li><router-link to="/home/teacher" >Giáo viên</router-link></li>
            <li><router-link to="/home/subject" >Môn học</router-link></li>
            <li><router-link to="/home/score" >Điểm</router-link></li>
            <li><router-link to="/home/summary" >Điểm tổng</router-link></li>
            <li><router-link to="/home/member" >Thành viên</router-link></li>
            <li><router-link to="/home/role" >Vai trò</router-link></li>
            <li><router-link to="/home/policy" >Điều khoản</router-link></li>
        </ul>
    </nav>
</template>

<style scoped>
nav ul.nav-link {
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
.headerText{
  color:white;
    float: right;
    margin: 2px;
}
.header{
    background-color: blue;
    height: 100px;
    width: 200%;
    margin: -10px;
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

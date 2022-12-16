<script>
export default {
  name: "NavBar",
 
};
</script>

<template>
  <div class="sidebar">
    <header>
      <img src="../assets/images/logo.png" alt="Logo" class="logo" />
      <h1 class="name"> HỌ VÀ TÊN</h1>
      <router-link to="/home/accountInfo" class="headerText" >Thông tin cá nhân</router-link>
      <router-link to="/" class="headerText">Đăng xuất</router-link>
    </header>
    <section>
      <nav>
        <ul>
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
    </section>
  </div>
</template>

<style scoped>
.name{
  color: black;
  position:absolute;
  top:  30px;
  left: 130px;
}
.sidebar{
  color: #4f6dfd;
  background-color: #4f6dfd;
  float: left;
  position: fixed;
  display: flex;
  flex-direction: column;
  box-shadow: 1px 1px 20px rgb(204, 199, 199);
}
header{
  float: inline-start;
  align-items: center;
  color: white;
  background-color: white;
  flex-direction: row;
  ;

}
a {
  color:white;
  text-align: left;
}
.logo {
  width: 100px;
  height: 100px;
  display: block;
}
li {
  border-bottom: 1px solid blue ;
}

li a {
  width:361px;
  display: block;
  padding: 14px 16px;
  text-decoration: none;
}
li a:hover{
  background-color: #4765f6;
}
.headerText{
    color:#4765f6;
    float: right;
    margin: 6px;
}

ul {
  width: 361px;
  height: 961px;
  list-style-type: none;
  margin:0;
  padding:0;
  overflow:hidden;

}

li {
  border-bottom: 1px solid blue ;
}
li a:hover{
  background-color: #4765f6;
}
</style>

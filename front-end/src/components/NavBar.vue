<script>
export default {
  name: "NavBar",
};
</script>

<template>
  <div class="sidebar">
    <header>
      <div class="header-info">
        <img src="../assets/images/logo.png" alt="Logo" class="logo" />
        <h1 class="name">Họ và Tên</h1>
      </div>
      <div class="header-control">
        <router-link to="/home/accountInfo" class="header-control-btn"
          >Thông tin cá nhân</router-link
        >
        <router-link to="/" class="header-control-btn">Đăng xuất</router-link>
      </div>
    </header>
    <section>
      <nav>
        <ul>
          <li><router-link to="/home/intro">Trang chủ</router-link></li>
          <li><router-link to="/home/faculty">Khoa</router-link></li>
          <li><router-link to="/home/class">Lớp</router-link></li>
          <li><router-link to="/home/student">Học sinh</router-link></li>
          <li><router-link to="/home/teacher">Giáo viên</router-link></li>
          <li><router-link to="/home/subject">Môn học</router-link></li>
          <li><router-link to="/home/score">Điểm</router-link></li>
          <li><router-link to="/home/summary">Điểm tổng</router-link></li>
          <li><router-link to="/home/member">Thành viên</router-link></li>
          <li><router-link to="/home/policy">Điều khoản</router-link></li>
        </ul>
      </nav>
    </section>
  </div>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  box-shadow: 1px 1px 20px rgb(204, 199, 199);
  width: var(--width-sidebar);
}

header {
  display: flex;
  flex-direction: column;
  color: white;
  background-color: white;
}
.header-info {
  display: flex;
  align-items: center;
  padding: 6px 14px;
}
.logo {
  width: 80px;
  height: 80px;
  display: block;
}
.name {
  color: black;
  margin: 0 6px;
  text-transform: capitalize;
}

.header-control {
  display: flex;
  justify-content: flex-end;
  padding: 2px 14px;
}

section {
  background-color: var(--primary-color);
  border-radius: 4px;
  flex: 1;
}
a {
  color: white;
  text-align: left;
}

li {
  border-bottom: 1px solid blue;
}
li a {
  width: 361px;
  display: block;
  padding: 6px 14px;
  text-decoration: none;
}
li a:hover {
  background-color: var(--dark-primary-color);
  cursor: pointer;
}
.header-control-btn {
  color: var(--dark-primary-color);
  float: right;
}
.header-control-btn + .header-control-btn {
  margin-left: 6px;
}
ul {
  width: var(--width-sidebar);
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
li {
  border-bottom: 1px solid blue;
}
.icon {
  display: inline-block;
  width: 24px;
}
</style>

<script>
import InforService from "../services/InfoService";

export default {
  name: "NavBar",
  data() {
    return {
      username: "",
    };
  },
  mounted() {
    let email = window.localStorage.getItem("email");
    let category = window.localStorage.getItem("category");

    InforService.search({
      params: {
        email,
        category,
      },
    })
      .then(({ data }) => {
        this.username = data.infors.ten_gv;
      })
      .catch((e) => console.log(e));
  },
  methods: {
    logOut() {
      window.localStorage.removeItem("email");
      window.localStorage.removeItem("category");
      window.localStorage.removeItem("isLogin");
      this.$router.push("/");
    },
  },
};
</script>
<template>
  <div class="sidebar">
    <header>
      <div class="header-info">
        <img src="../assets/images/logo.png" alt="Logo" class="logo" />
        <h1 class="name">{{ username }}</h1>
      </div>
      <div class="header-control">
        <router-link to="/home/accountInfo" class="header-control-btn"
          >Thông tin cá nhân</router-link
        >
        <a hre="#" class="header-control-btn" @click="logOut()">Đăng xuất</a>
      </div>
    </header>
    <section>
      <nav>
        <ul>
          <li>
            <router-link to="/home/intro">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-house" />
              </span>
              Trang chủ
            </router-link>
          </li>
          <li>
            <router-link to="/home/faculty">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-book-open" />
              </span>
              Khoa
            </router-link>
          </li>
          <li>
            <router-link to="/home/class">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-users" />
              </span>
              Lớp
            </router-link>
          </li>
          <li>
            <router-link to="/home/student">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-user" />
              </span>
              Học sinh
            </router-link>
          </li>
          <li>
            <router-link to="/home/teacher">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-chalkboard-teacher" />
              </span>
              Giáo viên</router-link
            >
          </li>
          <li>
            <router-link to="/home/subject">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-book" />
              </span>
              Môn học</router-link
            >
          </li>
          <li>
            <router-link to="/home/score">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-medal" />
              </span>
              Điểm</router-link
            >
          </li>
          <li>
            <router-link to="/home/summary">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-medal" />
              </span>
              Điểm tổng</router-link
            >
          </li>
          <li>
            <router-link to="/home/member">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-users-gear" />
              </span>
              Thành viên</router-link
            >
          </li>
          <li>
            <router-link to="/home/role">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-bookmark" />
              </span>
              Vai trò</router-link
            >
          </li>
          <li>
            <router-link to="/home/policy">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-circle-question" />
              </span>
              Điều khoản</router-link
            >
          </li>
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
  font-size: 22px;
  text-align: center;
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

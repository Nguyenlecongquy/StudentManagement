<template>
  <div class="wrapper">
    <form class="inner">
      <header>
        <img src="../assets/images/logo.png" alt="Logo" class="logo" />
        <h2 class="heading">Đăng nhập</h2>
        <p class="des">Đăng nhập tài khoản của bạn để tiếp tục</p>
      </header>
      <div class="body">
        <FormGroup
          label="EMAIL"
          typeOfInput="email"
          v-model="emailValue"
          nameOfInput="username"
          valueOfPlaceholder="Nhập email"
        />
        <FormGroup
          label="Mật khẩu"
          typeOfInput="password"
          v-model="passwordValue"
          nameOfInput="password"
          valueOfPlaceholder="Nhập mật khẩu"
        />
        <div class="form-category-user">
          <div class="form-category">
            <input
              id="teacher"
              name="category"
              type="radio"
              class="form-category-control"
              checked
              value="true"
              v-model="isTeacher"
            />
            <label for="teacher">Giáo viên</label>
          </div>
          <div class="form-category">
            <input
              id="student"
              name="category"
              type="radio"
              class="form-category-control"
              value="false"
              v-model="isTeacher"
            />
            <label for="student">Học sinh</label>
          </div>
        </div>
        <span class="error">{{ error }}</span>
        <button
          type="submit"
          class="btn"
          :class="{
            disable: !validate(),
          }"
          @click.prevent="submit"
        >
          Đăng nhập
        </button>
        <p class="add-infor">
          Bạn chưa có tài khoản? Hãy
          <router-link to="/register" class="link">Đăng ký</router-link>
        </p>
      </div>
    </form>
  </div>
</template>
<script>
import FormGroup from "./FormGroup.vue";
import AuthenticationService from "../services/AuthenticationService";

export default {
  name: "LoginCom",
  components: { FormGroup },
  data() {
    return {
      emailValue: "",
      passwordValue: "",
      isTeacher: "true",
      error: "",
    };
  },
  methods: {
    validate() {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var isValid = re.test(this.emailValue) && this.passwordValue.length >= 8;
      return isValid;
    },
    submit() {
      this.$router.push("/home");
      AuthenticationService.login({
        username: this.emailValue,
        password: this.passwordValue,
        category: this.isTeacher,
      })
        .then(({ data }) => {
          if (data.status) {
            this.$router.push("/home");
          } else {
            this.error = data.message;
          }
        })
        .catch((e) => console.log(e));
    },
  },
};
</script>
<style scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  background-color: #f3f7f9;
  display: flex;
}
.inner {
  width: 400px;
  background-color: white;
  margin: auto;
  padding: 28px;
  border-radius: 8px;
  box-shadow: 1px 1px 20px rgb(204, 199, 199);
}
header {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.heading {
  font-size: 24px;
  font-weight: 500;
}
.des {
  font-size: 12px;
  color: #7d909e;
  font-weight: 400;
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px;
  display: block;
}
.btn {
  width: 100%;
  height: 32px;
  color: #fff;
  background-color: var(--primary-color);
  border-radius: 4px;
  margin-top: 4px;
}
.btn.disable {
  opacity: 0.5;
  pointer-events: none;
}
.btn:hover {
  cursor: pointer;
  background-color: var(--dark-primary-color);
}
.add-infor {
  font-size: 12px;
  font-weight: 400;
  color: #000;
  text-align: center;
  margin-top: 24px;
}
.link {
  color: var(--primary-color);
  font-weight: 600;
}
.link:hover {
  color: var(--dark-primary-color);
}
.error {
  display: block;
  font-size: 10px;
  height: 10px;
  color: red;
  margin-bottom: 6px;
  text-align: center;
}

.form-category-user {
  display: flex;
}
.form-category {
  display: flex;
  align-items: center;
}
.form-category + .form-category {
  margin-left: 8px;
}
.form-category-control {
  margin-right: 6px;
}
</style>

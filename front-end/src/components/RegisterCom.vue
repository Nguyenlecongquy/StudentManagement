<template>
  <div class="wrapper">
    <form class="inner" method="POST" action="http://localhost:3000/register" >
      <header>
        <img src="../assets/images/logo.png" alt="Logo" class="logo" />
        <h2 class="heading">Đăng ký</h2>
        <p class="des">Đăng ký tài khoản của bạn!</p>
      </header>
      <div class="body">
        <FormGroup label="EMAIL" typeOfInput="email" v-model="emailValue" />
        <FormGroup label="PASSWORD" typeOfInput="password" v-model="passwordValue"
        />
        <FormGroup label="CONFIRM PASSWORD" typeOfInput="password" v-model="confirmPasswordValue"
          v-model:confirmPasswordValue="passwordValue"

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
          class="btn"
          :class="{
            disable: !validate(),
          }"
        >
          Đăng ký
        </button>
        <p class="add-infor">
          Bạn đã có tài khoản? Hãy
          <router-link to="/" class="link-register">Đăng nhập</router-link>
        </p>
      </div>
    </form>
  </div>
</template>
<script>
import FormGroup from "./FormGroup.vue";

export default {
  name: "RegisterCom",
  components: { FormGroup },
  data() {
    return {
      emailValue: "",
      passwordValue: "",
      confirmPasswordValue: "",
      error: "",
    };
  },
  methods: {
    validate() {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var isValid =
        re.test(this.emailValue) &&
        this.passwordValue.length >= 8 &&
        this.passwordValue == this.confirmPasswordValue;
      return isValid;
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
  padding: 20px 28px;
  border-radius: 8px;
  box-shadow: 1px 1px 20px rgb(204, 199, 199);
}
header {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.heading {
  font-size: 12px;
  font-weight: 400;
}
.heading {
  font-size: 24px;
  font-weight: 500;
}
.des {
  font-size: 10px;
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
  background-color: #4765f6;
}
.add-infor {
  font-size: 12px;
  font-weight: 400;
  color: #000;
  text-align: center;
  margin-top: 8px;
}
.link-register {
  color: var(--primary-color);
  font-weight: 500;
}
.link:hover {
  color: #4765f6;
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

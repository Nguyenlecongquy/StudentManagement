<template>
  <div class="wrapper">
    <form class="inner">
      <header>
        <img src="../assets/images/logo.png" alt="Logo" class="logo" />
        <h2 class="heading">Đăng ký</h2>
        <p class="des">Đăng ký tài khoản của bạn!</p>
      </header>
      <div class="body">
        <FormGroup
          label="EMAIL"
          typeOfInput="email"
          valueOfPlaceholder="Nhập email"
          v-model="emailValue"
          nameOfInput="username"
        />
        <FormGroup
          label="ID"
          valueOfPlaceholder="Nhập ID"
          typeOfInput="text"
          v-model="magv"
          nameOfInput="id"
        />
        <FormGroup
          label="MẬT KHẨU"
          typeOfInput="password"
          v-model="passwordValue"
          nameOfInput="password"
          valueOfPlaceholder="Nhập mật khẩu"
        />
        <FormGroup
          label="XÁC NHẬP MẬT KHẨU"
          typeOfInput="password"
          v-model="confirmPasswordValue"
          v-model:confirmPasswordValue="passwordValue"
          valueOfPlaceholder="Nhập lại mật khẩu"
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
        <span class="notify" :class="{ success: isSuccess }">{{ notify }}</span>
        <button
          class="btn"
          :class="{
            disable: !validate(),
          }"
          @click.prevent="onSubmit"
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
import AuthenticationService from "../services/AuthenticationService";

export default {
  name: "RegisterCom",
  components: { FormGroup },
  data() {
    return {
      emailValue: "",
      magv: "",
      passwordValue: "",
      confirmPasswordValue: "",
      isTeacher: true,
      notify: "",
      isSuccess: false,
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
    onSubmit() {
      AuthenticationService.register({
        username: this.emailValue,
        id: this.magv,
        password: this.passwordValue,
        category: this.isTeacher,
      })
        .then(({ data }) => {
          console.log(data)
          this.notify = data.message;
          if (data.status) {
            this.isSuccess = true;

            this.emailValue = "";
            this.magv = "";
            this.passwordValue = "";
            this.confirmPasswordValue = "";
            this.isTeacher = true;
          }
        })
        .catch(function (e) {
          console.log(e);
        });
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
.notify {
  display: block;
  font-size: 11px;
  height: 10px;
  color: red;
  margin: 2px 0 8px 0;
  text-align: center;
}

.notify.success {
  color: green;
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

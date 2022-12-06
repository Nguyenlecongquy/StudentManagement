<script setup>
import FormGroupVue from "./FormGroup.vue";
</script>

<template>
  <div class="wrapper">
    <div class="inner">
      <header>
        <img src="../assets/images/logo.png" alt="Logo" class="logo" />
        <h2 class="heading">Sign in</h2>
        <p class="des">Đăng nhập tài khoản của bạn để tiếp tục</p>
      </header>
      <div class="body">
        <FormGroupVue />
        <FormGroupVue />
        <FormGroupVue />

        <button class="btn_login disable">Log in</button>
        <p class="add-infor">
          Bạn chưa có tài khoản? Hãy
          <a href="#" class="link-register">Đăng ký</a>
        </p>
      </div>
    </div>
  </div>
</template>

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
}
header {
  display: flex;
  flex-direction: column;
  align-items: center;
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
.btn_login {
  width: 100%;
  height: 32px;
  color: #fff;
  background-color: #4f6dfd;
  border-radius: 4px;
  margin-top: 16px;
}
.btn_login.disable {
  opacity: 0.5;
  pointer-events: none;
}
.btn_login:hover {
  cursor: pointer;
  background-color: #4765f6;
}
.add-infor {
  font-size: 12px;
  font-weight: 400;
  color: #000;
  text-align: center;
  margin-top: 24px;
}
.link-register {
  color: #4f6dfd;
  font-weight: 500;
}
</style>

<template>
  <div class="wrapper">
    <NavBarVue />
    <router-view />
  </div>
</template>

<script>
import NavBarVue from "./NavBar.vue";
export default {
  name: "HomeCom",
  components: {
    NavBarVue,
  },

  mounted() {
    let isLogin = window.localStorage.getItem("isLogin");
    if (isLogin != "true") {
      this.$router.push("/");
    }
  },
};
</script>

<style scoped>
.wrapper {
  width: calc(100vw);
  height: 100vh;
  display: flex;
}
</style>

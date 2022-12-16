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
};
</script>

<style scoped>
.wrapper {
  width: calc(100vw);
  height: 100vh;
  display: flex;
}
</style>

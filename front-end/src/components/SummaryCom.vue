<template>
  <NavBarVue />
 <div class="pageContent">
   <h2> Thông tin học sinh</h2>
    
 </div>
 
</template>

<script>
import NavBarVue from './NavBar.vue';

export default {
name: "SummaryCom",
components: {
 NavBarVue,
}
}
</script>

<style scoped>
.pageContent {
 margin-top: 34px;
 margin-left: 400px;
 background-color: white;
 width: 1300px;
 height: 1000px;
 padding: 28px;
 border-radius: 8px;
 box-shadow: 1px 1px 20px rgb(204, 199, 199);
}
</style>
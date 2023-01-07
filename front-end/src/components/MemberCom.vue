<template>
  <div class="pageContent">
    <h2>Thông tin thành viên</h2>

    <div class="members">
      <div class="member">
        <img class="img" src="../assets/images/Quan.jpg" />
        <h3 class="name">Nguyễn Xuân Quân</h3>
        <h3>ID: 20120555</h3>
        <span class="role">Frontend Developer</span>
        <span class="tech">Tech: VueJS</span>
      </div>
      <div class="member">
        <img class="img" src="../assets/images/Tri.jpg" />
        <h3 class="name">Trần Minh Trí</h3>
        <h3>ID: 20120603</h3>
        <span class="role">Backend Developer</span>
        <span class="tech">Tech: NodeJS, PostGreSQL</span>
      </div>

      <div class="member">
        <img class="img" src="../assets/images/Quy.jpg" />
        <h3 class="name">Nguyễn Lê Công Quý</h3>
        <h3>ID: 20120563</h3>
        <span class="role">Backend Developer</span>
        <span class="tech">Tech: NodeJS, PostGreSQL</span>
      </div>
      <div class="member">
        <img class="img" src="../assets/images/Vinh.jpg" />

        <h3 class="name">Hoàng Vinh</h3>
        <h3>ID: 20120627</h3>
        <span class="role">Frontend Developer</span>
        <span class="tech">Tech: VueJS</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MemberCom",
};
</script>

<style scoped>
.pageContent {
  flex: 1;
  background-color: white;
  width: calc(100% - 10px);
  padding: 24px;
  margin: 6px 8px;

  border-radius: 8px;
  box-shadow: 1px 1px 20px rgb(204, 199, 199);
}
.members {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
.member {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.member + .member {
  margin-left: 30px;
}
.img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 2px;
  object-fit: contain;
}
h3 {
  font-size: 16px;
  font-weight: 600;
  margin-top: 6px;
}
.name {
  font-size: 22px;
}
.role {
  font-weight: 500;
}
.tech {
  color: green;
  font-weight: 500;
}
</style>

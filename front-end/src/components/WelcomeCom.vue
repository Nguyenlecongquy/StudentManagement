<template>
  <div class="pageContent">
    <h2>Giới thiệu phần mềm quản lý học sinh</h2>

    <p class="intro">
      Đối với các đơn vị trường học, trung tâm ngày nay. Việc quản lý học sinh
      thông qua sổ sách (giấy tờ) không đủ để đáp ứng với số lượng ngày càng
      tăng là vấn đề quá khó khăn. Dựa trên nhu cầu thực hiện tế, Nhóm đã góp
      phần gở rối với phần mềm quản lý, bên cạnh đó còn rút ngắn, giảm thời gian
      làm việc của các giáo viên.
    </p>
    <p>
      <span class="soft-name"
        >Phần mềm quản lý học sinh
        <img src="../assets/images/logo.png" class="logo" />
      </span>
      là công cụ được xây dựng nhắm hỗ trợ các quy trình, công việc quản lý học
      sinh. Nhắm mang đến quản lý một cách hiệu quả cho giáo viên.
    </p>
    <h3>Các tính năng của phần mềm gồm:</h3>
    <ol>
      <li>Quản lý khoa</li>
      <li>Quản lý lớp</li>
      <li>Quản lý học sinh</li>
      <li>Quản lý giáo viên</li>
      <li>Quản lý môn học</li>
      <li>Quản lý điểm môn, điểm tổng kết</li>
    </ol>
    <p class="note">
      Chú ý: Phần mềm đến nay, còn nhiều phần chưa được hoàn thiện. Vui lòng đợi
      để chúng tôi hoàn thiện dần.
    </p>
  </div>
</template>

<script>
export default {
  name: "WelcomeCom",
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
.soft-name {
  font-weight: 500;
}
.logo {
  width: 30px;

  transform: translateY(7.5px);
}
p {
  font-size: 18px;
  text-align: justify;
}
h3,
h2 {
  font-weight: 500;
}
ol,
li {
  font-size: 18px;
}
.note {
  font-size: 16px;
}
</style>

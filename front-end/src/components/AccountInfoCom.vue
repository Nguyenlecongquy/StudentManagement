<template>
  <div class="pageContent">
    <h2>Thông tin cá nhân</h2>
    <div class="content">
      <div class="content-inner">
        <div class="content-info">
          <img src="../assets/images/logo.png" alt="Logo" class="logo" />
          <h1 class="name">{{ user.username }}</h1>
        </div>
        <div class="form-field">
          <span class="form-label">Mã ID: </span>
          <p class="form-content">{{ user.id }}</p>
        </div>
        <div class="form-field">
          <span class="form-label">Email: </span>
          <p class="form-content">{{ user.email }}</p>
        </div>
        <div class="form-field">
          <span class="form-label">Mật khẩu: </span>
          <p class="form-content">
            {{ new Array(user.password.length + 1).join("*") }}
          </p>
        </div>
      </div>
      <ButtonVue
        class="mt-12"
        title="Chỉnh sửa thông tin"
        primary="true"
        @click="showEditModal()"
      />
    </div>

    <vue-final-modal
      v-model="showModal"
      classes="modal-container"
      content-class="modal-content"
    >
      <span class="modal__title">Thay đổi thông tin cá nhân</span>
      <div class="modal__content">
        <FormGroup
          label="Họ tên"
          typeOfInput="text"
          v-model="editedUser.username"
          valueOfPlaceholder="Họ tên"
        />
        <FormGroup
          label="Mã ID"
          typeOfInput="text"
          v-model="editedUser.id"
          valueOfPlaceholder="Nhập ID"
          disabled="true"
        />
        <FormGroup
          label="Email"
          typeOfInput="email"
          v-model="editedUser.email"
          valueOfPlaceholder="Nhập email"
          disabled="true"
        />
        <FormGroup
          label="Mật khẩu"
          typeOfInput="password"
          v-model="editedUser.password"
          valueOfPlaceholder="Nhập mật khẩu"
        />
        <FormGroup
          label="Xác nhận mật khẩu"
          typeOfInput="password"
          v-model="editedUser.confirmPassword"
          valueOfPlaceholder="Nhập mật khẩu"
        />
      </div>
      <div class="modal__action">
        <ButtonVue title="Sửa" @click="edit()" primary="true" />
        <ButtonVue title="Hủy" @click="cancel()" />
      </div>
    </vue-final-modal>
  </div>
</template>

<script>
import ButtonVue from "./Button.vue";
import FormGroup from "./FormGroup.vue";
import InforService from "../services/InfoService";

export default {
  name: "AccountInfoCom",
  components: { ButtonVue, FormGroup },
  data() {
    return {
      showModal: false,
      user: {
        id: "",
        username: " ",
        email: "",
        password: "",
      },
      editedUser: {
        id: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  mounted() {
    let email = window.localStorage.getItem("email");
    let category = window.localStorage.getItem("category");

    if (email && category) {
      InforService.search({
        params: {
          email,
          category,
        },
      })
        .then(({ data }) => {
          if (data.status) {
            this.user.id = data.infors.ma_gv;
            this.user.username = data.infors.ten_gv;
            this.user.password = data.infors.password;
            this.user.email = data.infors.email;
          }
        })
        .catch((e) => console.log(e));
    }
  },
  methods: {
    showEditModal() {
      this.editedUser = { ...this.user, confirmPassword: this.user.password };
      this.showModal = true;
    },
    edit() {
      this.user = { ...this.editedUser };

      //Call API for updating
      InforService.edit({
        email: this.editedUser.email,
        password: this.editedUser.password,
        fullName: this.editedUser.username,
        category: true,
      })
        .then(({ data }) => {
          if (data.status) {
            alert("Sửa thông tin thành công");
          }
        })
        .catch((e) => console.log(e));
      this.showModal = false;
    },
    cancel() {
      this.showModal = false;
    },
  },
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

.content,
.content-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content-inner {
  margin: auto;
}

.form-field {
  display: flex;
  font-size: 18px;
}

.form-label {
  width: 120px;
}

.form-content {
  font-weight: 500;
}

::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

::v-deep .modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  width: 500px;

  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}

.modal__title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.modal__content .input:first-child {
  margin-left: 0;
}

.modal__action {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 0 0;
}

.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>

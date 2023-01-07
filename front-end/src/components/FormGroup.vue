<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="form-group">
    <label class="form-label">{{ label }}</label>
    <div class="form-inner">
      <input
        class="form-control"
        :placeholder="valueOfPlaceholder"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="validate"
        @focus="error = ''"
        :name="nameOfInput"
        :disabled="disabled"
      />
      <button
        v-show="typeOfInput == 'password'"
        @click.stop.prevent="handleShowPassword()"
      >
        <font-awesome-icon
          v-if="showPassword == false"
          icon="fa-solid fa-eye"
        />
        <font-awesome-icon
          v-else-if="showPassword == true"
          icon="fa-solid fa-eye-slash"
        />
      </button>
    </div>

    <span class="form-error">{{ error }}</span>
  </div>
</template>

<script>
export default {
  name: "FormGroup",
  props: [
    "label",
    "typeOfInput",
    "nameOfInput",
    "modelValue",
    "confirmPasswordValue",
    "valueOfPlaceholder",
    "isValid",
    "disabled",
  ],
  emits: ["update:modelValue"],
  data() {
    return {
      error: "",
      type: this.typeOfInput,
      showPassword: false,
    };
  },
  methods: {
    validate() {
      if (this.label.toLowerCase() == "email") {
        var re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(this.modelValue)) {
          this.error = "";
        } else {
          this.error = "Vui lòng nhập email của bạn!";
        }
      } else if (this.label.toLowerCase() == "password") {
        if (this.modelValue.length < 8) {
          this.error = "Mật khẩu phải từ 8 ký tự trở lên!";
        }
      } else if (this.label.toUpperCase() == "CONFIRM PASSWORD") {
        if (this.modelValue != this.confirmPasswordValue) {
          this.error = "Mật khẩu phải giống nhau! Vui lòng nhập lại";
        }
      }
    },
    handleShowPassword() {
      this.showPassword = !this.showPassword;
      if (this.showPassword) {
        this.type = "text";
      } else {
        this.type = "password";
      }
    },
  },
};
</script>
<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
}
.form-inner {
  display: flex;
}
.form-label {
  color: #54616b;
  display: block;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 12px;
  margin-bottom: 2px;
}
.form-inner {
  border: 1px solid #dce6ed;
  border-radius: 3px;
}
.form-control {
  padding: 4px 8px;
  width: 100%;
  display: block;
}
.form-error {
  display: block;
  font-size: 10px;
  height: 10px;
  color: red;
  margin-bottom: 2px;
}
</style>

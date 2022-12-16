<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="form-group">
    <label class="form-label">{{ label }}</label>
    <input
      class="form-control"
      :placeholder="valueOfPlaceholder"
      :type="typeOfInput"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="validate"
      @focus="error = ''"
      :name="nameOfInput"
    />
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
    "isValid",
  ],
  emits: ["update:modelValue"],
  data() {
    return {
      error: "",
    };
  },
  computed: {
    valueOfPlaceholder() {
      return "Nhập " + this.typeOfInput.toLowerCase();
    },
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
  },
};
</script>
<style scoped>
.form-group {
  display: block;
}
.form-group + .form-group {
  margin-top: 10px;
}
.form-label {
  color: #54616b;
  display: block;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 12px;
  margin-bottom: 2px;
}
.form-control {
  padding: 4px 8px;
  border: 1px solid #dce6ed;
  border-radius: 3px;
  width: 100%;
  display: block;
}
.form-error {
  display: block;
  font-size: 10px;
  height: 10px;
  color: red;
  margin-bottom: 6px;
}
</style>

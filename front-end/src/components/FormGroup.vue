<template>
  <div class="form-group">
    <label class="form-label">Email</label>
    <input class="form-control" placeholder="Nhập email" />
    <span class="form-error">Mật khẩu không chính xác</span>
  </div>
</template>

<style scoped>
.form-group {
  display: block;
}
.form-group + .form-group {
  margin-top: 12px;
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
}
.form-error {
  font-size: 10px;
  color: red;
  padding: 0 4px;
}
</style>

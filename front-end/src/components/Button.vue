<template>
  <button class="btn" :class="{ primary: primary == 'true' }">
    {{ title }}
  </button>
</template>

<script>
export default {
  name: "ButtonCom",
  props: ["title", "primary"],
};
</script>

<style>
.btn {
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 3px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background-color: var(--white-color);
}
.btn + .btn {
  margin-left: 10px;
}
.btn.primary {
  background: var(--primary-color);
  color: var(--white-color);
}

.btn:hover {
  cursor: pointer;
  background-color: var(--dark-primary-color);
  color: var(--white-color);

  transition: all 0.4s ease;
}
</style>

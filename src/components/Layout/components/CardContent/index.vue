<template>
  <div class="router-card">
    <BreadCrumb />
    <slot></slot>
  </div>
</template>
<script>
import BreadCrumb from './BreadCrumb.vue';

export default {
  components: {
    BreadCrumb,
  },
};
</script>
<style lang="scss" scoped>
.router-card {
  background-color: #ffffff;
  box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.1);
  padding: 13px 20px;
}
</style>

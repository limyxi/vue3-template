<template>
  <div class="sider">
    <div class="sider__logo">
      <img src="@/assets/logo.png" />
    </div>
    <el-scrollbar class="sider__menu">
      <side-menu :collapse="collapse" />
    </el-scrollbar>
  </div>
</template>
<script>
import SideMenu from './SideMenu.vue';
export default {
  components: {
    SideMenu,
  },
  props: {
    collapse: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.side {
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.15);
}
.sider__menu {
  background-color: var(--color-menu-back);
  height: calc(100% - 60px);
}
.sider__logo {
  background-color: var(--color-menu-back);
  height: 60px;
  @include flex-justify-center;
  img {
    height: 38px;
    margin-top: 15px;
  }
}
</style>

<template>
  <el-aside class="menu-aside" width="250px">
    <el-menu
      :collapse="collapse"
      :default-active="activedPath"
      background-color="#18202e"
      class="sider-menu"
      menu-trigger="click"
      router
      text-color="#FFFFFF"
      unique-opened
    >
      <side-menu-item
        v-for="route in routeList"
        :key="route.path"
        :item="route"
        :collapse="collapse"
      />
    </el-menu>
  </el-aside>
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import SideMenuItem from './SideMenuItem.vue';

export default {
  name: 'SideMenu',
  components: { SideMenuItem },
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { currentRoute } = useRouter();
    const store = useStore();

    const routeList = computed(() => {
      if (store.getters.menuGroup) {
        return store.getters.menuGroup;
      }
      return [];
    });
    console.log(routeList);

    // 当前页面路由
    const activedPath = computed(() => {
      const { path } = currentRoute.value;
      return path;
    });

    return {
      routeList,
      activedPath,
    };
  },
};
</script>
<style lang="scss" scoped>
.menu-aside {
  height: 100%;
  margin-right: -1px;
}
</style>

<style lang="scss">
.menu-aside {
  .el-menu--inline {
    background: var(--color-menu-child-back);
  }
  .menu-item {
    &.is-active {
      background: var(--color-primary);
      color: var(--color-menu-text);
    }
  }
}
</style>

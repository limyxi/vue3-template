<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in list"
      :key="item.name"
      class="breadcrumb-item"
      :class="{ 'breadcrumb-item_prev': index < list.length - 1 }"
    >
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
import { computed, ref, watch, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ArrowRight } from '@element-plus/icons-vue';

export default {
  setup() {
    const store = useStore();
    const { currentRoute } = useRouter();

    const list = ref([]);

    const menuJson = reactive({});
    const getMenuJson = (arr, parentId = null) => {
      for (let i = 0, len = arr.length; i < len; i++) {
        menuJson[arr[i].name] = { ...arr[i], parentId };
        if (arr[i].children?.length) {
          getMenuJson(arr[i].children, arr[i].name);
        }
      }
    };
    // 获取menujson {name1:{},name2:{}}
    getMenuJson(store.getters.menuGroup);

    // 通过当前路由查询对应菜单的父级对象
    const searchCurrentMatch = (name) => {
      if (!menuJson[name]) return;
      list.value.unshift(menuJson[name]);
      if (menuJson[name].parentId) {
        searchCurrentMatch(menuJson[name].parentId);
      }
    };

    // 获取面包屑
    const getBreadcrumb = () => {
      list.value = [];
      searchCurrentMatch(currentRoute.value.name);
    };

    watch(
      () => currentRoute.value,
      () => {
        getBreadcrumb();
      },
      {
        immediate: true,
      }
    );

    return {
      list,
      ArrowRight,
    };
  },
};
</script>

<style lang="scss" scoped>
.breadcrumb-item {
  :deep .el-breadcrumb__inner {
    color: var(--color-black);
  }
  &_prev {
    :deep .el-breadcrumb__inner {
      color: var(--color-default);
    }
  }
}
</style>

<template>
  <el-dropdown>
    <el-button link type="primary" :icon="MoreFilled" />
    <template #dropdown>
      <el-dropdown-menu>
        <slot></slot>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script>
import { MoreFilled } from '@element-plus/icons-vue';
export default {
  name: 'table-more',
  setup() {
    return {
      MoreFilled,
    };
  },
};
</script>

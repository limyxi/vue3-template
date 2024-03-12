<template>
  <el-menu-item
    v-if="!item.children || !item.children.length"
    :index="item.path"
    class="menu-item"
  >
    <span class="menu-item__title">
      <component
        v-if="item.icon"
        :is="item.icon"
        class="icon-item menu-item__icon"
      />
      <span class="menu-item__text">{{ item.meta.title }}</span>
    </span>
    <component v-if="item.icon && collapse" :is="item.icon" class="icon-item" />
  </el-menu-item>
  <el-sub-menu v-else :index="item.name">
    <template #title>
      <span class="menu-item__title">
        <component
          v-if="item.icon"
          :is="item.icon"
          class="icon-item menu-item__icon"
        />
        <span class="menu-item__text">{{ item.meta.title }}</span>
      </span>
      <component
        v-if="item.icon && collapse"
        :is="item.icon"
        class="icon-item"
      />
    </template>
    <side-menu-item
      v-for="child in item.children"
      :key="child.path"
      :item="child"
    />
  </el-sub-menu>
</template>
<script>
export default {
  props: {
    item: Object,
    collapse: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
.menu-item {
  &__title {
    @include flex-align-center;
  }
  &__icon {
    margin-top: -3px;
  }
  &__text {
    margin-left: 10px;
  }
}
</style>

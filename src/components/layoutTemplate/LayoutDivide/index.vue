<template>
  <div class="layout-divide">
    <div class="layout-divide__left" :style="{ '--width': leftWidth + 'px' }">
      <slot name="left"></slot>
    </div>
    <div class="layout-divide__right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LayoutDivide',
  props: {
    // 左边间距
    leftWidth: {
      type: Number,
      default: 200,
    },
  },
};
</script>
<style lang="scss" scoped>
.layout-divide {
  display: flex;
  &__left {
    width: var(--width);
    flex-shrink: 0;
    margin-right: 10px;
    :deep > * {
      height: 100%;
    }
  }
  &__right {
    flex: 1;
    overflow: hidden;
  }
}
</style>

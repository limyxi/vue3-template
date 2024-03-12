<template>
  <div class="cus-card">
    <div class="cus-card__head">
      <span>{{ title }}</span>

      <div v-if="$slots.action" class="cus-card__head__right">
        <slot name="actions"></slot>
      </div>
    </div>

    <!-- 卡片中间内容 -->
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'SimpleCard',
  props: {
    title: {
      props: String,
      require: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.cus-card {
  border: 1px solid var(--el-border-color);
  &__head {
    @include flex-align-center;
    padding: 0 10px;
    height: 40px;
    border-bottom: 1px solid var(--el-border-color);
    &__right {
      flex: 1;
      margin-left: 10px;
      text-align: right;
    }
  }
}
</style>

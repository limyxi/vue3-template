<template>
  <div class="card">
    <div class="card__head">
      <span class="card__title"> {{ currentRoute.meta.title }}</span>
      <div class="card__action">
        <slot name="headActions"></slot>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const { currentRoute } = useRouter();
    return {
      currentRoute,
    };
  },
};
</script>
<style lang="scss" scoped>
.card {
  &__head {
    @include flex-align-center;
    justify-content: space-between;
    margin: 10px 0 15px 0;
  }
  &__title {
    font-size: 18px;
    color: var(--color-primary);
    font-weight: 500;
  }
}
</style>

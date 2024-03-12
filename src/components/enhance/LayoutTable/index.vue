<template>
  <div v-if="!$slots.topRight || !$slots.topLeft" class="table-layout-top">
    <div class="table-layout-top__right">
      <slot name="topRight"> </slot>
      <div
        v-if="columnList.length > 0"
        class="action-btn"
        @click="openColumnSet"
      >
        <img src="@/assets/set.png" />
      </div>
    </div>
    <div class="table-layout-top__left">
      <slot name="topLeft"> </slot>
    </div>
  </div>

  <div class="table-layout-center">
    <slot></slot>
  </div>

  <!-- 表格列设置 -->
  <column-set ref="columnSet" :columnList="columnList" />
</template>
<script>
import ColumnSet from '@/components/common/columnSet/index.vue';
import { ref } from 'vue';
export default {
  name: 'layout-table',
  components: {
    ColumnSet,
  },
  props: {
    // 需要设置的列
    columnList: {
      type: Array,
      default: [],
    },
  },
  setup() {
    const columnSet = ref();

    const openColumnSet = () => {
      columnSet.value.open();
    };

    return {
      columnSet,
      openColumnSet,
    };
  },
};
</script>
<style lang="scss" scoped>
.table-layout-top {
  margin: 10px 0;
  &__right {
    @include flex-justify-end;
    :deep .action-btn {
      width: 32px;
      height: 32px;
      background: #f7f8fa;
      border-radius: 2px;
      border: 1px solid #f1f2f4;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 10px;
      &:hover {
        cursor: pointer;
        box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.1);
      }
      img {
        width: 20px;
        height: 20px;
      }
    }
    > * {
      margin-left: 10px;
    }
  }
}
</style>

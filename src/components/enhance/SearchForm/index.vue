<template>
  <div class="search-form">
    <el-form
      :inline="true"
      :model="searchForm"
      :label-suffix="labelSuffix"
      :label-width="labelWidth"
    >
      <!-- 基础表单项 -->
      <slot name="basicItem"></slot>

      <!-- 高级表单项 -->
      <template v-if="showMoreFilter">
        <slot name="advanceItem"></slot>
      </template>

      <!-- 操作按钮 -->
      <el-form-item v-if="showFormAction" class="search-form-btns">
        <!-- 默认搜索重置按钮 -->
        <template v-if="showSearchBtn">
          <!-- 搜索 -->
          <el-button type="primary" @click="search">{{
            $t('com.search')
          }}</el-button>
          <!-- 重置 -->
          <el-button @click="reset">{{ $t('com.reset') }}</el-button>
        </template>

        <!-- 有额外的操作按钮 -->
        <slot name="external"></slot>

        <!-- 高级搜索插槽内没有则不显示按钮 -->
        <template v-if="$slots.advanceItem">
          <div
            v-show="!showMoreFilter"
            class="primary-text"
            @click="showMoreFilter = true"
          >
            <!-- 高级搜索 -->
            {{ $t('com.moreSearch') }}
          </div>
          <div
            v-show="showMoreFilter"
            class="primary-text"
            @click="showMoreFilter = false"
          >
            <!-- 普通搜索 -->
            {{ $t('com.basicSearch') }}
          </div>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  emits: ['search', 'update:searchForm', 'reset'],

  props: {
    // 搜索表单对象
    searchForm: {
      type: Object,
    },
    // 标签宽度
    labelWidth: {
      type: Number,
      default: 100,
    },
    // 标签前缀
    labelSuffix: {
      type: String,
      default: '：',
    },
    // 是否展示默认的搜索重置按钮
    showSearchBtn: {
      type: Boolean,
      default: true,
    },
  },

  setup(props, { slots, emit }) {
    // 高级搜索和普通搜索的状态
    const showMoreFilter = ref(false);

    // 是否显示操作部分
    const showFormAction = computed(() => {
      if (props.showSearchBtn) {
        return true;
      }
      if (slots.advanceItem || slots.basicItem) {
        return true;
      }
    });

    // 搜索
    const search = () => {
      emit('search');
    };

    // 保存初始化传进来的searchForm对象，用于重置
    const originForm = JSON.parse(JSON.stringify(props.searchForm));
    // 重置
    const reset = () => {
      emit('update:searchForm', JSON.parse(JSON.stringify(originForm)));
      emit('reset');
    };

    return {
      showMoreFilter,
      showFormAction,
      search,
      reset,
    };
  },
};
</script>

<style lang="scss">
.search-form {
  background: var(--color-grey-back);
  padding: 15px 15px 0 15px;
  margin-bottom: 10px;
  .el-form--inline .el-form-item {
    width: 345px;
  }
  .el-form-item--default {
    margin-bottom: 15px;
  }
  .el-select {
    width: 100%;
  }
  &-btns {
    width: auto !important;
    .el-form-item__content > * {
      margin-left: 10px;
    }
  }
}
</style>

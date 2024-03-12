<template>
  <el-table
    ref="multipleTableRef"
    v-bind="$attrs"
    :data="data"
    @selection-change="handleSelectionChange"
  >
    <!-- 是否展示复选框 -->
    <el-table-column
      v-if="showSelection"
      type="selection"
      align="center"
      width="50"
    />
    <!-- 是否展示序号 -->
    <el-table-column
      v-if="showIndex"
      :label="$t('com.index')"
      width="60"
      align="center"
    >
      <template #default="scope">
        {{ (page.index - 1) * page.size + scope.$index + 1 }}
      </template>
    </el-table-column>

    <!-- 表格其它列 -->
    <slot></slot>
  </el-table>

  <div class="table-layout-bottom">
    <div class="table-layout-bottom__left">
      <template v-if="showSelection">
        <el-checkbox
          v-model="checked"
          label="全选"
          @change="changeAllCheckStatus"
        />
        <span class="check-note">已选{{ selectData.length }}条</span>
      </template>

      <!-- 表格操作 -->
      <slot name="actions"></slot>
    </div>

    <div class="table-layout-bottom__right">
      <el-pagination
        v-if="showPage"
        background
        :layout="pageLayout"
        :total="page.total"
        :page-sizes="pageSizes"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>
<script>
import { ref, reactive } from 'vue';
export default {
  props: {
    // 数据源
    data: {
      type: Array,
      default: () => [],
    },
    // 已选择的数据
    // todo：这里回显逻辑还没写
    select: { type: Array, default: () => [] },
    // 是否选择复选框
    showSelection: {
      type: Boolean,
      default: false,
    },
    // 是否展示序号
    showIndex: {
      type: Boolean,
      default: false,
    },
    // 是否展示分页
    showPage: {
      type: Boolean,
      default: true,
    },
    // 分页参数
    page: {
      type: Object,
      default: () => {
        return { index: 1, size: 20, total: 0 };
      },
    },
    // 分页需要显示的东西
    pageLayout: {
      type: String,
      default: 'total, sizes, prev, pager, next',
    },
    // 分页切换可选择条数
    pageSizes: { type: Array, default: [10, 20, 50, 100] },
  },
  setup(props, context) {
    const multipleTableRef = ref();

    // 分页相关：监听页码切换事件
    const handleCurrentChange = (val) => {
      props.page.index = val;
      context.emit('getTableData');
    };
    // 分页相关：监听单页显示数量切换事件
    const handleSizeChange = (val) => {
      props.page.size = val;
      context.emit('getTableData', true);
    };

    // 是否全选状态
    const checked = ref();
    // 表格已选择的数据
    const selectData = ref([]);
    // 复选框选择
    const handleSelectionChange = (val) => {
      // 切换全选
      if (val.length === props.data.length) {
        checked.value = true;
      } else {
        checked.value = false;
      }
      selectData.value = val;
      context.emit('selection-change', val);
    };
    // 切换全选/取消全选状态
    const changeAllCheckStatus = (value) => {
      multipleTableRef.value.toggleAllSelection();
    };

    return {
      checked,
      multipleTableRef,
      selectData,
      handleCurrentChange,
      handleSizeChange,
      handleSelectionChange,
      changeAllCheckStatus,
    };
  },
};
</script>
<style lang="scss" scoped>
:deep .el-table-fixed-column--right .cell {
  > *:not(:first-child) {
    margin-left: 10px;
  }
}
.table-layout-bottom {
  @include flex-justify-between;
  margin-top: 15px;
  &__left {
    @include flex-align-center;
    .check-note {
      margin-top: -1px;
      color: var(--el-text-color-regular);
      font-size: 14px;
    }
    :deep > *:not(:first-child) {
      margin-left: 10px;
    }
  }
}
</style>

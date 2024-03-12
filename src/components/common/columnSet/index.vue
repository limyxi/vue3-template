<template>
  <en-dialog :layer="layer" @confirm="confirm">
    <en-table :data="columnList" :showPage="false" border>
      <el-table-column property="name" :label="$t('com.columnName')" />
      <el-table-column :label="$t('com.showColumn')" width="100">
        <template #default="{ row }">
          <el-switch v-model="row.show" size="small" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('com.fixColumn')" width="100">
        <template #default="{ row }">
          <el-switch v-model="row.fixed" size="small" />
        </template>
      </el-table-column>
    </en-table>
  </en-dialog>
</template>
<script>
import EnDialog from '@/components/enhance/EnDialog/index.vue';
import { ref } from 'vue';
import i18n from '@/locale';
export default {
  name: 'comlumn-set',
  components: {
    EnDialog,
  },
  emits: ['confirm'],
  props: {
    // 需要设置的列
    columnList: {
      type: Array,
    },
  },
  setup(props, ctx) {
    // 弹窗控制器
    const layer = ref({});

    const open = () => {
      layer.value = {
        show: true,
        title: i18n.global.t('com.customListItem'),
        showButton: true,
      };
    };

    const confirm = () => {
      ctx.emit('confirm');
    };

    return {
      layer,
      confirm,
      open,
    };
  },
};
</script>

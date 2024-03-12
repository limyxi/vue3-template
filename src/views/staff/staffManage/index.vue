<template>
  <Card>
    <template #headActions>
      <el-button>{{ $t('m.staff.staffManage.importStaff') }}</el-button>
      <el-button type="primary" @click="openAddDialog">{{
        $t('m.staff.staffManage.addStaff')
      }}</el-button>
    </template>

    <LayoutDivide>
      <template #left>
        <SimpleCard :title="$t('m.staff.staffManage.depart')">
          <el-tree :data="departData" @node-click="chooseDepart" />
        </SimpleCard>
      </template>

      <template #right>
        <SearchForm
          v-model:searchForm="searchForm"
          :labelWidth="90"
          @search=""
          @reset=""
        >
          <template #basicItem>
            <el-form-item
              :label="
                $t('m.staff.staffManage.name') +
                '/' +
                $t('m.staff.staffManage.mobile')
              "
            >
              <el-input
                v-model="searchForm.keyWord"
                :placeholder="$t('com.pleaseInput')"
              />
            </el-form-item>
            <el-form-item :label="$t('m.staff.staffManage.status')">
              <el-select
                v-model="searchForm.keyWord"
                :placeholder="$t('com.pleaseSelect')"
                clearable
                filterable
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </template>
        </SearchForm>

        <en-table
          :data="tableData"
          :page="page"
          :showIndex="true"
          @getTableData="getTableData"
        >
          <el-table-column
            prop="date"
            :label="$t('m.staff.staffManage.name')"
          />
          <el-table-column
            prop="name"
            :label="$t('m.staff.staffManage.account')"
          />
          <el-table-column
            prop="address"
            :label="$t('m.staff.staffManage.mobile')"
          />
          <el-table-column
            prop="address"
            :label="$t('m.staff.staffManage.post')"
          />
          <el-table-column
            prop="address"
            :label="$t('m.staff.staffManage.role')"
          />
          <el-table-column
            prop="address"
            :label="$t('m.staff.staffManage.depart')"
          />
          <el-table-column
            prop="address"
            :label="$t('m.staff.staffManage.status')"
          />
          <el-table-column prop="address" :label="$t('com.createTime')" />
          <el-table-column fixed="right" :label="$t('com.action')" width="150">
            <template #default="scope">
              <el-button link type="primary">{{ $t('com.view') }}</el-button>
              <el-button link type="primary">{{ $t('com.edit') }}</el-button>
              <table-more>
                <el-dropdown-item>{{
                  $t('m.staff.staffManage.editPassword')
                }}</el-dropdown-item>
                <el-dropdown-item>{{
                  $t('m.staff.staffManage.recovery')
                }}</el-dropdown-item>
              </table-more>
            </template>
          </el-table-column>
        </en-table>
      </template>
    </LayoutDivide>
  </Card>

  <!-- 新增/编辑弹框 -->
  <AddEdit ref="addEditDialog" :layer="layer" />
</template>
<script>
import { onMounted, reactive, ref } from 'vue';
import LayoutDivide from '@/components/layoutTemplate/LayoutDivide/index.vue';
import SimpleCard from '@/components/Card/SimpleCard.vue';
import useDepart from './depart.js';
import useUser from './user.js';
import AddEdit from './components/AddEdit.vue';
import i18n from '@/locale';

export default {
  components: {
    SimpleCard,
    LayoutDivide,
    AddEdit,
  },
  setup() {
    const addEditDialog = ref();

    const { departData, getDepartData } = useDepart();

    const { searchForm, tableData, getTableData, options, page } = useUser();

    // 选择部门
    const chooseDepart = () => {};

    // 控制弹框
    const layer = reactive({
      show: false,
      title: '',
      showButton: true,
    });

    // 打开弹框
    const openAddDialog = () => {
      layer.show = true;
      layer.title = `${i18n.global.t('com.add')}${i18n.global.t(
        'm.staff.staffManage.staff'
      )}`;
    };

    onMounted(() => {
      getDepartData();
      getTableData(true);
    });

    return {
      departData,
      searchForm,
      options,
      tableData,
      page,
      addEditDialog,
      layer,
      chooseDepart,
      getTableData,
      chooseDepart,
      openAddDialog,
    };
  },
};
</script>

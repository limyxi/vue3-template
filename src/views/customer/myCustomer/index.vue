<template>
  <Card>
    <template #headActions>
      <el-button>{{ $t('m.customer.myCustomer.importCustomer') }}</el-button>
      <el-button type="primary">{{
        $t('m.customer.myCustomer.addCustomer')
      }}</el-button>
    </template>

    <search-form
      v-model:searchForm="searchForm"
      :labelWidth="120"
      @search="getTableData(true)"
      @reset="getTableData(true)"
    >
      <template #basicItem>
        <el-form-item :label="$t('m.customer.myCustomer.customerName')">
          <el-input
            v-model="searchForm.user"
            :placeholder="$t('com.pleaseSelect')"
          />
        </el-form-item>
        <el-form-item :label="$t('m.customer.myCustomer.responsibleSale')">
          <el-input
            v-model="searchForm.region"
            :placeholder="$t('com.pleaseSelect')"
          />
        </el-form-item>
        <el-form-item :label="$t('m.customer.myCustomer.responsibleBusiness')">
          <el-input
            v-model="searchForm.user"
            :placeholder="$t('com.pleaseSelect')"
          />
        </el-form-item>
      </template>

      <template #advanceItem>
        <el-form-item :label="$t('m.customer.myCustomer.customerType')">
          <el-select
            v-model="searchForm.user"
            :placeholder="$t('com.pleaseSelect')"
          >
            <el-option label="企业" value="1" />
            <el-option label="个人" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('m.customer.myCustomer.customerCate')">
          <el-select
            v-model="searchForm.user"
            :placeholder="$t('com.pleaseSelect')"
          >
            <el-option label="企业" value="1" />
            <el-option label="个人" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('m.customer.myCustomer.customerLevel')">
          <el-select
            v-model="searchForm.user"
            :placeholder="$t('com.pleaseSelect')"
          >
            <el-option label="企业" value="1" />
            <el-option label="个人" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('m.customer.myCustomer.customerSource')">
          <el-select
            v-model="searchForm.user"
            :placeholder="$t('com.pleaseSelect')"
          >
            <el-option label="企业" value="1" />
            <el-option label="个人" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('m.customer.myCustomer.companyCate')">
          <el-select
            v-model="searchForm.user"
            :placeholder="$t('com.pleaseSelect')"
          >
            <el-option label="企业" value="1" />
            <el-option label="个人" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('m.customer.myCustomer.registerDate')">
          <TimeRangeSelection
            v-model:value="searchForm.value"
          ></TimeRangeSelection>
        </el-form-item>
        <el-form-item :label="$t('m.customer.myCustomer.lastLoginDate')">
          <TimeRangeSelection
            v-model:value="searchForm.value"
          ></TimeRangeSelection>
        </el-form-item>
        <el-form-item
          :label="$t('m.customer.myCustomer.proportionOfPrepayment')"
        >
          <el-input
            v-model="searchForm.region"
            :placeholder="$t('com.pleaseInput')"
            class="wp40"
          />
          <span class="wp20 tx-center">至</span>
          <el-input
            v-model="searchForm.region"
            :placeholder="$t('com.pleaseInput')"
            class="wp40"
          />
        </el-form-item>
        <el-form-item :label="$t('m.customer.myCustomer.lastOrderDate')">
          <TimeRangeSelection
            v-model:value="searchForm.value"
          ></TimeRangeSelection>
        </el-form-item>
        <el-form-item :label="$t('m.customer.myCustomer.firstOrderDate')">
          <TimeRangeSelection
            v-model:value="searchForm.value"
          ></TimeRangeSelection>
        </el-form-item>
        <el-form-item :label="$t('m.customer.myCustomer.accountStatus')">
          <el-select
            v-model="searchForm.user"
            :placeholder="$t('com.pleaseSelect')"
          >
            <el-option label="有效" value="1" />
            <el-option label="禁用" value="2" />
          </el-select>
        </el-form-item>
      </template>
    </search-form>

    <layout-table :columnList="columnList">
      <template #topRight>
        <div class="action-btn">
          <img src="@/assets/export.png" />
        </div>
      </template>

      <en-table
        :data="tableData"
        :page="page"
        :showSelection="true"
        @getTableData="getTableData"
      >
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
        <el-table-column fixed="right" label="Operations" width="180">
          <template #default="scope">
            <el-button link type="primary">查看</el-button>
            <el-button link type="primary">编辑</el-button>
            <el-button link type="danger">删除</el-button>
            <table-more>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
              <el-dropdown-item disabled>Action 4</el-dropdown-item>
              <el-dropdown-item divided>Action 5</el-dropdown-item>
            </table-more>
          </template>
        </el-table-column>

        <template #actions>
          <el-dropdown>
            <el-button>
              批量操作<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-button>导出当前页</el-button>
          <el-button>导出查询结果页</el-button>
        </template>
      </en-table>
    </layout-table>
  </Card>
</template>

<script>
import { reactive, ref } from 'vue';
import TimeRangeSelection from '@/components/enhance/DateRangeSelect/index.vue';
import { getPage } from '@/hooks';

export default {
  name: 'customer/myCustomer/index',
  components: {
    TimeRangeSelection,
  },
  setup() {
    const searchForm = ref({
      user: '1',
      region: '',
      value: [],
    });
    const tableData = ref();

    // 分页参数
    const page = reactive(getPage());

    const getTableData = (init) => {
      if (init) {
        page.index = 1;
      }
      let params = {
        page: page.index,
        pageSize: page.size,
      };
      setTimeout(() => {
        tableData.value = [
          {
            date: '呃呃呃',
            name: '呃呃呃呃',
            address: '热热热',
          },
          {
            date: '呃呃呃',
            name: '呃呃呃呃',
            address: '热热热',
          },
          {
            date: '呃呃呃',
            name: '呃呃呃呃',
            address: '热热热',
          },
          {
            date: '呃呃呃',
            name: '呃呃呃呃',
            address: '热热热',
          },
          {
            date: '呃呃呃',
            name: '呃呃呃呃',
            address: '热热热',
          },
          {
            date: '呃呃呃',
            name: '呃呃呃呃',
            address: '热热热',
          },
          {
            date: '呃呃呃',
            name: '呃呃呃呃',
            address: '热热热',
          },
          {
            date: '呃呃呃',
            name: '呃呃呃呃',
            address: '热热热',
          },
        ];
        page.total = 1;
      }, 100);
    };

    const columnList = ref([
      {
        id: 1,
        name: '复选框',
        show: true,
        fixed: false,
      },
      {
        id: 2,
        name: '序号',
        show: false,
        fixed: true,
      },
    ]);

    getTableData(true);

    return {
      searchForm,
      tableData,
      page,
      columnList,
      getTableData,
    };
  },
  mounted() {},
};
</script>

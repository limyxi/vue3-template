<template>
  <en-dialog :layer="layer" @confirm="confirm">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      label-suffix="："
      status-icon
    >
      <el-form-item :label="$t('m.staff.staffManage.staffName')" prop="name">
        <el-input
          v-model="ruleForm.name"
          :placeholder="$t('com.pleaseInput')"
        />
      </el-form-item>
      <el-form-item :label="$t('m.staff.staffManage.mobile')" prop="mobile">
        <el-input
          v-model="ruleForm.mobile"
          type="tel"
          :placeholder="$t('com.pleaseInput')"
        />
      </el-form-item>
      <el-form-item :label="$t('m.staff.staffManage.role')" prop="role">
        <el-select
          v-model="ruleForm.role"
          multiple
          :placeholder="$t('com.pleaseSelect')"
          class="wp100"
        >
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        :label="$t('m.staff.staffManage.belongCompany')"
        prop="compnay"
      >
        <el-select
          v-model="ruleForm.compnay"
          :placeholder="$t('com.pleaseSelect')"
          class="wp100"
        >
          <el-option
            v-for="item in compnayList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        :label="$t('m.staff.staffManage.belongDepart')"
        prop="depart"
      >
        <el-select
          v-model="ruleForm.depart"
          :placeholder="$t('com.pleaseSelect')"
          class="wp100"
        >
          <el-option
            v-for="item in departList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </en-dialog>
</template>
<script>
import EnDialog from '@/components/enhance/EnDialog/index.vue';
import { reactive, ref, onMounted } from 'vue';
import { getRequiredValid } from '@/utils/validate';
export default {
  components: {
    EnDialog,
  },
  emits: ['confirm'],
  props: {
    // 需要设置的列
    layer: {
      type: Object,
      default: () => {
        return {
          show: false,
          title: '',
          showButton: true,
        };
      },
    },
  },
  setup(props, ctx) {
    const ruleForm = reactive({
      name: '',
      mobile: '',
      role: '',
      compnay: '',
      depart: '',
    });

    const rules = reactive({
      name: [getRequiredValid()],
      mobile: [getRequiredValid()],
      role: [getRequiredValid()],
      compnay: [getRequiredValid()],
      depart: [getRequiredValid()],
    });

    const roleList = ref();
    const getRole = () => {
      roleList.value = [
        {
          id: 1,
          name: '222',
        },
        {
          id: 2,
          name: '33333',
        },
      ];
    };

    const compnayList = ref();
    const getCompnay = () => {
      compnayList.value = [
        {
          id: 1,
          name: '222',
        },
        {
          id: 2,
          name: '33333',
        },
      ];
    };

    const departList = ref();
    const getDepart = () => {
      departList.value = [
        {
          id: 1,
          name: '222',
        },
        {
          id: 2,
          name: '33333',
        },
      ];
    };

    const confirm = () => {
      ctx.emit('confirm');
    };

    onMounted(() => {
      getRole();
      getCompnay();
      getDepart();
    });

    return {
      confirm,
      ruleForm,
      rules,
      roleList,
      compnayList,
      departList,
    };
  },
};
</script>

<template>
  <el-header class="topbar" height="50px">
    <div class="topbar__left">
      <el-tree-select
        v-model="value"
        :data="selectList"
        :props="defaultProps"
        node-key="id"
        default-expand-all
        check-strictly
        @visible-change="changeVisible"
      />
    </div>
    <div class="topbar__right">
      <el-select
        v-model="searchValue"
        filterable
        remote
        reserve-keyword
        :remote-method="remoteMethod"
        :loading="loading"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <div class="divider" />

      <div class="topbar__link">商城</div>
      <div class="topbar__link ml15">待办</div>
      <div class="topbar__link ml15">帮助</div>
      <div class="divider" />

      <img src="@/assets/message.png" class="topbar__link-icon" />
      <img src="@/assets/customer.png" class="topbar__link-icon ml35" />

      <div class="topbar__user">
        <img src="@/assets/user.png" class="topbar__user__head" />
        <div>小明</div>
        <img src="@/assets/logout.png" class="topbar__user__logout" />
      </div>
    </div>
  </el-header>
</template>
<script>
import { ref } from 'vue';
export default {
  setup() {
    const value = ref();
    const selectList = ref([
      {
        id: '1',
        name: 'Level one 1',
        children: [
          {
            id: '1-1',
            name: 'Level two 1-1',
            children: [
              {
                id: '1-1-1',
                name: 'Level three 1-1-1',
              },
            ],
          },
        ],
      },
    ]);
    const defaultProps = {
      children: 'children',
      name: 'name',
      disabled: 'disabled',
    };
    const searchValue = ref();
    const loading = ref(false);
    const options = ref([]);

    const changeVisible = () => {};

    const remoteMethod = (query) => {
      if (query) {
        loading.value = true;
        setTimeout(() => {
          loading.value = false;
          options.value = [{ value: 1, label: 'label1' }];
        }, 200);
      } else {
        options.value = [];
      }
    };

    return {
      loading,
      value,
      selectList,
      searchValue,
      defaultProps,
      options,
      changeVisible,
      remoteMethod,
    };
  },
};
</script>
<style lang="scss" scoped>
.topbar {
  @include flex-align-center;
  justify-content: space-between;
  background-color: #ffffff;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
  padding: 0 0 0 35px;
  &__right {
    @include flex-align-center;
    height: 100%;
  }
  &__link {
    font-weight: 500;
    color: #000000;
    cursor: pointer;
  }
  &__link-icon {
    cursor: pointer;
    height: 20px;
  }
  &__user {
    @include flex-align-center;
    background: #fafafa;
    height: 100%;
    padding: 0 30px;
    margin-left: 24px;
    &__head {
      height: 30px;
      width: 30px;
      margin-right: 9px;
    }
    &__logout {
      height: 14px;
      width: 14px;
      margin-left: 20px;
    }
  }
}
.divider {
  height: 11px;
  border-right: 1px dashed #aaaaaa;
  margin: 0 20px;
}
</style>

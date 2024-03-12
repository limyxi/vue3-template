<template>
  <el-dialog
    ref="dialog"
    v-bind="$attrs"
    v-model="layer.show"
    :title="layer.title"
  >
    <!-- 弹框显示内容 -->
    <slot></slot>

    <template #footer v-if="layer.showButton">
      <div>
        <el-button type="primary" @click="confirm">{{
          $t('com.confirm')
        }}</el-button>
        <el-button @click="layer.show = false">{{
          $t('com.cancel')
        }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import { ref } from 'vue';
export default {
  emits: ['confirm', 'close'],
  props: {
    // 弹框的属性
    layer: {
      type: Object,
      default: () => {
        return {
          show: false,
          title: '',
          showButton: false,
        };
      },
      required: true,
    },
  },
  setup(props, ctx) {
    const dialog = ref(null);

    const confirm = () => {
      ctx.emit('confirm');
    };

    const close = () => {
      props.layer = { show: false };
      ctx.emit('close');
    };
    return {
      dialog,
      confirm,
      close,
    };
  },
};
</script>

<template>
  <el-config-provider :size="size" :z-index="zIndex" :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
// import i18n from '@/locale';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  setup() {
    const store = useStore();
    const i18n = useI18n();
    const locale = computed(() => {
      return {
        name: i18n.locale.value,
        el: i18n.messages.value[i18n.locale.value].el,
      };
    });
    return {
      zIndex: 3000,
      locale: locale,
      size: store.state.app.elementSize,
    };
  },
});
</script>

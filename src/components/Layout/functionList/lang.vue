<template>
  <div>
    <el-select v-model="value" placeholder="Select" @change="changeLang">
      <el-option
        v-for="(locale, key) in messages"
        :key="key"
        :label="locale.language"
        :value="key"
      />
    </el-select>
  </div>
</template>
<script>
import { ref, defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const value = ref();
    const i18n = useI18n();
    const store = useStore();

    const changeLang = (value) => {
      i18n.locale.value = value;
      store.commit('app/setLang', value);
      document.querySelector('html').setAttribute('lang', value);
    };

    return {
      value,
      messages: i18n.messages,
      changeLang,
    };
  },
});
</script>

<template>
  <el-date-picker
    v-bind="$attrs"
    v-model="value"
    type="daterange"
    :shortcuts="shortcuts"
    :range-separator="$t('com.to')"
    :start-placeholder="$t('com.placeStartData')"
    :end-placeholder="$t('com.placeEndDate')"
    value-format="YYYY-MM-DD"
    popper-class="cusDatePicker"
    @change="onChange"
  />
</template>
<script>
import i18n from '@/locale';
import dayjs from 'dayjs';
export default {
  inheritAttrs: false,
  emits: ['update:value'],
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const shortcuts = [
      {
        text: i18n.global.t('com.today'),
        value: () => {
          const end = dayjs().format('YYYY-MM-DD');
          const start = dayjs().format('YYYY-MM-DD');
          return [start, end];
        },
      },
      {
        text: i18n.global.t('com.yesterday'),
        value: () => {
          const end = dayjs().add(-1, 'day').format('YYYY-MM-DD');
          const start = dayjs().add(-1, 'day').format('YYYY-MM-DD');
          return [start, end];
        },
      },
      {
        text: i18n.global.t('com.thisWeek'),
        value: () => {
          const end = dayjs().endOf('week').add(1, 'day').format('YYYY-MM-DD');
          const start = dayjs()
            .startOf('week')
            .add(1, 'day')
            .format('YYYY-MM-DD');
          return [start, end];
        },
      },
      {
        text: i18n.global.t('com.lastWeek'),
        value: () => {
          const end = dayjs()
            .add(-1, 'week')
            .endOf('week')
            .add(1, 'day')
            .format('YYYY-MM-DD');
          const start = dayjs()
            .add(-1, 'week')
            .startOf('week')
            .add(1, 'day')
            .format('YYYY-MM-DD');
          return [start, end];
        },
      },
      {
        text: i18n.global.t('com.thisMonth'),
        value: () => {
          const end = dayjs().endOf('month').format('YYYY-MM-DD');
          const start = dayjs().startOf('month').format('YYYY-MM-DD');
          return [start, end];
        },
      },
      {
        text: i18n.global.t('com.lastMonth'),
        value: () => {
          const end = dayjs()
            .add(-1, 'month')
            .endOf('month')
            .format('YYYY-MM-DD');
          const start = dayjs()
            .add(-1, 'month')
            .startOf('month')
            .format('YYYY-MM-DD');
          return [start, end];
        },
      },
      {
        text: i18n.global.t('com.thisYear'),
        value: () => {
          const end = dayjs().endOf('year').format('YYYY-MM-DD');
          const start = dayjs().startOf('year').format('YYYY-MM-DD');
          return [start, end];
        },
      },
      {
        text: i18n.global.t('com.lastYear'),
        value: () => {
          const end = dayjs()
            .add(-1, 'year')
            .endOf('year')
            .format('YYYY-MM-DD');
          const start = dayjs()
            .add(-1, 'year')
            .startOf('year')
            .format('YYYY-MM-DD');
          return [start, end];
        },
      },
      {
        text: i18n.global.t('com.recent30days'),
        value: () => {
          const end = dayjs().format('YYYY-MM-DD');
          const start = dayjs().add(-30, 'day').format('YYYY-MM-DD');
          return [start, end];
        },
      },
      {
        text: i18n.global.t('com.recent60days'),
        value: () => {
          const end = dayjs().format('YYYY-MM-DD');
          const start = dayjs().add(-60, 'day').format('YYYY-MM-DD');
          return [start, end];
        },
      },
      {
        text: i18n.global.t('com.recent90days'),
        value: () => {
          const end = dayjs().format('YYYY-MM-DD');
          const start = dayjs().add(-90, 'day').format('YYYY-MM-DD');
          return [start, end];
        },
      },
    ];

    const onChange = (val) => {
      emit('update:value', val);
    };

    return {
      shortcuts,
      onChange,
    };
  },
};
</script>

<style lang="scss">
.cusDatePicker {
  .el-picker-panel__shortcut {
    display: inline;
    width: auto;
  }
}
</style>

import i18n from '@/locale';

export const getRequiredValid = () => {
  return {
    required: true,
    message: i18n.global.t('com.pleaseInput'),
    trigger: 'blur',
  }
}
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { i18n } from '@/i18n/i18n'

export const useConfigurationStore = defineStore('configurationStore', () => {
  const idioma = ref<string>('es')

  function changeLanguaje() {
    idioma.value = idioma.value === 'es' ? 'en' : 'es'
    i18n.global.locale.value = idioma.value as 'es' | 'en'
  }

  return { idioma, changeLanguaje }
})

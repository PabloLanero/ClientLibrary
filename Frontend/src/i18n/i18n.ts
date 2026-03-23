import { createI18n } from "vue-i18n";
import {useConfigurationStore } from '@/stores/Central'
import en from './languages/english.json'
import es from './languages/spanish.json'
// const { idioma } = useConfigurationStore()

export const i18n = createI18n({
    legacy: false,
    globalInjection: true,
  locale: 'es',
  fallbackLocale: 'en',
  messages: {
    en,
    es 
  }
})
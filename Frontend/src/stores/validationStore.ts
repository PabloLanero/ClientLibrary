import { defineStore } from 'pinia'
import { i18n } from '@/i18n/i18n'

export const useValidation = defineStore('formValidations', () => {
  function validateEmail(value: any) {
    if (!value) {
      return i18n.global.t('forms.isEmpty')
    }
    if (value.trim() === '') {
      return i18n.global.t('forms.isEmpty')
    }

    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    if (!regex.test(value)) {
      return i18n.global.t('forms.notEmail')
    }

    return true
  }

  function validateString(value: any) {
    if (!value) return i18n.global.t('forms.isEmpty')
    if (value.trim() === '') return i18n.global.t('forms.isEmpty')

    return true
  }

  function validateNumber(value: any) {
    if (!value) return i18n.global.t('forms.isEmpty')
    if (value <= 0) return i18n.global.t('forms.notValid')
    return true
  }

  function validatePassword(value: any) {
    if (!value) return i18n.global.t('forms.isEmpty')

    if (value.length <= 8) return i18n.global.t('forms.invalidPassword')
    return true
  }

  return { validateEmail, validateString, validatePassword, validateNumber }
})

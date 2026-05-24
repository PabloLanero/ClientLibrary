import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { Auth } from '@/models/Auth'
import type { Usuario } from '@/models/Usuario'
import type { Register } from '@/models/DTOs/Register'
import type { Login } from '@/models/DTOs/Login'

export const useUserStore = defineStore('userStore', () => {
  const token = ref<string>('')
  const user = ref<Auth>({
    token: '',
  })
  const header = {
    'Content-Type': 'application/json',
  }

  async function register(usuario: Register): Promise<boolean> {
    let bRet = fetch('http://localhost:8941/Auth/Register', {
      method: 'POST',
      headers: header,
      body: JSON.stringify(usuario),
    })
      .then((res) => {
        if (res.status === 400) throw new Error('Este usuario ya existe')
        return res.json()
      })
      .then((res: Auth) => {
        user.value = res
        token.value = res.token
        return true
      })
      .catch((err) => {
        return false
      })
    return bRet
  }
  async function login(usuario: Login): Promise<any> {
    let bRet = fetch('http://localhost:8941/Auth/Login', {
      method: 'POST',
      headers: header,
      body: JSON.stringify(usuario),
    })
      .then((res) => {
        if (res.status === 401) throw new Error('Este usuario no existe')
        return res.json()
      })
      .then((res: Auth) => {
        user.value = res
        token.value = res.token
        return user.value
      })
      .catch((err) => {
        return false
      })
    return bRet
  }

  return { user, token, register, login }
})

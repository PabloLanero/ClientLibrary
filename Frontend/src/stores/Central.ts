import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { i18n } from '@/i18n/i18n'

import type { Libro } from '@/models/Libros'
import type { Auth } from '@/models/Auth'
import type { Usuario } from '@/models/Usuario'
import type { Register } from '@/models/DTOs/Register'

const idioma = ref<string>('es')

export const useBookStore = defineStore('bookStore', () => {
  const libros = ref<Libro[]>([])
  
  function getLibros() {
    fetch('http://localhost:8941/api/Libro')
    .then(res => res.json())
    .then((res => {
      // console.log(res)
      // Los valores coinciden, asi que no tengo que recorer la respuesta
      libros.value = res
      console.log(libros.value)
      
    }))
  }

  return { libros, getLibros }
})

/**
 * Para gestionar el usuario
 */
export const useUserStore = defineStore('userStore', () => {
  const user = ref<Auth>({
    token: ''
  })

  async function register(usuario: Register): Promise<boolean>{
    user.value = {
      token: ''
    }
    const header = {
        'Content-Type': 'application/json',
    }
    
    let bRet = fetch('http://localhost:8941/Auth/Register', {
        method: 'POST',
        headers: header,
        body: JSON.stringify(usuario),
    }).then(res => {
      // debugger
      if(res.status === 400) throw new Error('Este usuario ya existe')

      return res.json()
    }).then((res: Auth) => {
      
        user.value = res
      return true
    })
    .catch(err  => {
      return false
    }) 
    return bRet
}

  return {user, register}
})



/**
 * Ese objeto es el que contiene las validaciones de los formularios
 */
export const useValidation = defineStore('formValidations', () => {

  // Funcion extraida de la documentacion de Vee Validate
  /**
   * Validacion para correos
   */
  function validateEmail(value:any){
    // if the field is empty
      if (!value ) {
          return i18n.global.t('forms.isEmpty')
        }
      if(value.trim() === ''){
        return i18n.global.t('forms.isEmpty')
      }
        
      // if the field is not a valid email
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return i18n.global.t('forms.notEmail')
      }

      // All is good
      return true;
  }

  /**
   * Validacion para campos algo genericos
   */
  function validateString(value: any){
    if(!value) return i18n.global.t('forms.isEmpty')
    if(value.trim() === '')return i18n.global.t('forms.isEmpty')
      
    return true
    
  }

  /**
   * Validacion para contraseñas
   */
  function validatePassword( value: any){
    // Regex sacado de https://es.stackoverflow.com/questions/4300/expresiones-regulares-para-contrase%C3%B1a-en-base-a-una-politica 
    if(!value) return i18n.global.t('forms.isEmpty')

    // var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    // if(!regex.test(value))
    //   return i18n.global.t('forms.invalidPassword')

    if(value.length <=8) return i18n.global.t('forms.invalidPassword')
    return true
  }

  return { validateEmail, validateString, validatePassword }
})



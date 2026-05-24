import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { i18n } from '@/i18n/i18n'
import { useRouter } from 'vue-router'

import type { Libro } from '@/models/Libros'
import type { Auth } from '@/models/Auth'
import type { Usuario } from '@/models/Usuario'
import type { Register } from '@/models/DTOs/Register'
import type { Login } from '@/models/DTOs/Login'
import { mdiOrderNumericAscending } from '@mdi/js'
import type { LibroFiltro } from '@/models/DTOs/BookFilter'


/**
 * Este archivo ya no se utiliza, se mantiene en caso de posibles errores que puedan surgir
 * (O si openCode a decidido cambiar lo que sea en algun momento)
 */


export const useBookStore = defineStore('bookStore', () => {
  // No me deja modificarlo en las vistas
  const libros = ref<Libro[]>([])
  const cantidad = ref<number>(20)
  const router = useRouter()
  let orden: boolean = true
  function ordenarLibros(): Libro[] {
    libros.value.sort((a, b) => (orden ? a.precio - b.precio : b.precio - a.precio))
    orden = !orden
    return libros.value
  }

  function aumentarCantidad() {
    cantidad.value += 10
  }

  function getLibrosFiltered(libroFiltro: LibroFiltro): Libro[] {
    let header: any = {
      accept: 'text/plain',
    }
    if (libroFiltro.ISBN && libroFiltro.ISBN !== '') header['ISBN'] = libroFiltro.ISBN
    if (libroFiltro.Title && libroFiltro.Title !== '') header['Title'] = libroFiltro.Title
    if (libroFiltro.Genero && libroFiltro.Genero !== '') header['Genero'] = libroFiltro.Genero
    if (libroFiltro.minPaginas && libroFiltro.minPaginas > 0)
      header['minPaginas'] = libroFiltro.minPaginas
    if (libroFiltro.maxPaginas && libroFiltro.maxPaginas > 0)
      header['maxPaginas'] = libroFiltro.maxPaginas
    if (libroFiltro.minPrecio && libroFiltro.minPrecio > 0)
      header['minPrecio'] = libroFiltro.minPrecio
    if (libroFiltro.maxPrecio && libroFiltro.maxPrecio > 0)
      header['maxPrecio'] = libroFiltro.maxPrecio
    if (libroFiltro.minFecha && libroFiltro.minFecha !== '')
      header['minFecha'] = libroFiltro.minFecha
    if (libroFiltro.maxFecha && libroFiltro.maxFecha !== '')
      header['maxFecha'] = libroFiltro.maxFecha

    header['Cantidad'] = cantidad.value
    fetch('http://localhost:8941/api/Libro', {
      headers: header,
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error en la petición')
        return res.json()
      })
      .then((res: Libro[]) => {
        libros.value = res
        console.log(res)
      })
      .catch((err) => {
        console.error('Error al obtener libros:', err)
      })

    return libros.value
  }

  function getLibros() {
    
    fetch('http://localhost:8941/api/Libro')
      .then((res) => {
        if (!res.ok) throw new Error('Error en la petición')
        return res.json()
      })
      .then((res) => {
        libros.value = res
        console.log(libros.value)
      })
      .catch((err) => {
        console.error('Error al obtener libros:', err)
      })
  }

  async function deleteLibro(libro: Libro) {
    const header = {
      accept: 'text/plain',
      ISBN: libro.isbn,
    }
    let borrado = await fetch('http://localhost:8941/api/Libro', {
      method: 'DELETE',
      headers: header,
    }).then((res) => res.ok)

    if (borrado) {
      libros.value = libros.value.filter((element) => element.isbn !== libro.isbn)
    }

    return borrado
  }
  async function addLibro(libro: Libro) {
    const header = {
      accept: 'text/plain',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token.value,
    }

    let added = await fetch('http://localhost:8941/api/Libro', {
      method: 'POST',
      headers: header,
      credentials: 'include',
      body: JSON.stringify(libro),
    }).then((res) => res.ok)

    if (added) {
      libros.value.push(libro)
      router.push('/Books')
    }
  }

  async function updateLibro(libro: Libro) {
    const header = {
      accept: 'text/plain',
      'Content-Type': 'application/json',
    }

    let added = await fetch('http://localhost:8941/api/Libro', {
      method: 'PUT',
      headers: header,
      body: JSON.stringify(libro),
    }).then((res) => res.ok)

    if (added) {
      let libroAct = libros.value.find((element) => element == libro)
      libroAct = libro
    }
  }

  return { libros, getLibros, deleteLibro, addLibro, updateLibro, ordenarLibros, getLibrosFiltered, aumentarCantidad }
})

/**
 * Para gestionar el usuario
 */

const token = ref<string>('')
export const useUserStore = defineStore('userStore', () => {
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
        // debugger
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
        // debugger
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

  return { user, register, login }
})

/**
 * Ese objeto es el que contiene las validaciones de los formularios
 */
export const useValidation = defineStore('formValidations', () => {
  // Funcion extraida de la documentacion de Vee Validate
  /**
   * Validacion para correos
   */
  function validateEmail(value: any) {
    // if the field is empty
    if (!value) {
      return i18n.global.t('forms.isEmpty')
    }
    if (value.trim() === '') {
      return i18n.global.t('forms.isEmpty')
    }

    // if the field is not a valid email
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    if (!regex.test(value)) {
      return i18n.global.t('forms.notEmail')
    }

    // All is good
    return true
  }

  /**
   * Validacion para campos algo genericos
   */
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

  /**
   * Validacion para contraseñas
   */
  function validatePassword(value: any) {
    // Regex sacado de https://es.stackoverflow.com/questions/4300/expresiones-regulares-para-contrase%C3%B1a-en-base-a-una-politica
    if (!value) return i18n.global.t('forms.isEmpty')

    // var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    // if(!regex.test(value))
    //   return i18n.global.t('forms.invalidPassword')

    if (value.length <= 8) return i18n.global.t('forms.invalidPassword')
    return true
  }

  return { validateEmail, validateString, validatePassword, validateNumber }
})

export const useConfigurationStore = defineStore('configurationStore', () => {
  const idioma = ref<string>('es')

  function changeLanguaje() {
    idioma.value = idioma.value === 'es' ? 'en' : 'es'
    i18n.global.locale.value = idioma.value as 'es' | 'en'
  }

  return { idioma, changeLanguaje }
})

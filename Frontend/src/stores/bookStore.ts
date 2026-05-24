import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from './userStore'

import type { Libro } from '@/models/Libros'
import type { LibroFiltro } from '@/models/DTOs/BookFilter'

export const useBookStore = defineStore('bookStore', () => {
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
    const { token } = useUserStore()
    const header = {
      accept: 'text/plain',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
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

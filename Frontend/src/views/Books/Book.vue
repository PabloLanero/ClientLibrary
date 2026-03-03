<script setup lang="ts">

import { useBookStore, useUserStore } from '@/stores/Central'
import BookCards from './components/BookCards.vue';
import UpdateBook from './components/UpdateBook.vue';
import { ref } from 'vue';

import type { Libro } from '@/models/Libros'
import type { LibroFiltro } from '@/models/DTOs/BookFilter';
const { libros, deleteLibro, updateLibro, ordenarLibros, getLibrosFiltered, aumentarCantidad} = useBookStore()

const showDialog = ref<boolean>(false)
const showUpdate = ref<boolean>(false)
const librosReactivos = ref<Libro[]>(libros)

const libroFiltrado = ref<LibroFiltro>({
    ISBN: '',
    Genero: '',
    Title: '',
    minPaginas: 0,
    maxPaginas: 0,
    minPrecio: 0,
    maxPrecio: 0,
    minFecha: '',
    maxFecha: '',
    OrderAsc: false
})

async function borrarLibro(libro: Libro){
    let bool = await deleteLibro(libro)
    showDialog.value = bool
}

async function getLibrosFiltrados(){
    // He modificado el metodo para que me lo devuelva, no me funcionaba bien la reactividad 
    // En la variable en pinia
    librosReactivos.value = getLibrosFiltered(libroFiltrado.value)
     
}

async function aumentar(){
    aumentarCantidad()
    getLibrosFiltrados()
}

</script>
<template>
    <v-row cols="12" align="center">
        <v-col md="2">
            <v-text-field placeholder="ISBN" v-model="libroFiltrado.ISBN" @input="getLibrosFiltrados" />
        </v-col>
        <v-col md="2">
            <v-text-field placeholder="Nombre" v-model="libroFiltrado.Title" @input="getLibrosFiltrados" />
        </v-col>
        <v-col md="2">
            <v-text-field placeholder="Genero" v-model="libroFiltrado.Genero" @input="getLibrosFiltrados" />
        </v-col>
        <v-col md="2">
            <v-text-field type="number" placeholder="Min Páginas" v-model.number="libroFiltrado.minPaginas" @input="getLibrosFiltrados" />
        </v-col>
        <v-col md="2">
            <v-text-field type="number" placeholder="Max Páginas" v-model.number="libroFiltrado.maxPaginas" @input="getLibrosFiltrados" />
        </v-col>
        <v-col md="2">
            <v-text-field type="number" placeholder="Min Precio" v-model.number="libroFiltrado.minPrecio" @input="getLibrosFiltrados" />
        </v-col>
        <v-col md="2">
            <v-text-field type="number" placeholder="Max Precio" v-model.number="libroFiltrado.maxPrecio" @input="getLibrosFiltrados" />
        </v-col>
        <v-col md="2">
            <v-text-field type="date" placeholder="Min Fecha" v-model="libroFiltrado.minFecha" @input="getLibrosFiltrados" />
        </v-col>
        <v-col md="2">
            <v-text-field type="date" placeholder="Max Fecha" v-model="libroFiltrado.maxFecha" @input="getLibrosFiltrados" />
        </v-col>
        <v-col md="2">
            <v-btn text="Ordenar por precio" @click="() => librosReactivos= ordenarLibros()" />
        </v-col>
    </v-row>
    <v-row cols="12">
        <v-col md="4" v-for="libro in librosReactivos">
            <BookCards :libro="libro">
                <v-card-actions v-if="useUserStore().user.usuario?.rol === 'admin'">
                    <v-btn text="Borrar Libro" append-icon="mdi-delete" color="red" @click="borrarLibro(libro)">
                    </v-btn>
                    <v-btn text="Actualizar Libro" append-icon="mdi-update" color="orange" @click="showUpdate = !showUpdate">
                    </v-btn>
                </v-card-actions>
            </BookCards>
            <UpdateBook :show-dialog="showUpdate" @update-libro="updateLibro" @cancel-update="showUpdate = !showUpdate"></UpdateBook>
            <v-dialog :model-value="showDialog" width="300px">
                <v-card>
                    <v-card-title>
                        <p>{{ $t('deleted') }}</p>
                    </v-card-title>
                    <v-card-actions>

                        <v-btn prepend-icon="mdi-check-bold" @click="showDialog = !showDialog" >
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
        <v-col>
            <v-btn append-icon="mdi-plus" @click="aumentar">Ver mas</v-btn>
        </v-col>
    </v-row>

</template>
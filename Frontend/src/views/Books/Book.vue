<script setup lang="ts">

import { useBookStore, useUserStore } from '@/stores/Central'
import BookCards from './components/BookCards.vue';

import type { Libro } from '@/models/Libros'
const { libros, deleteLibro } = useBookStore()
const { user }= useUserStore()

async function borrarLibro(libro: Libro){
    let bool = await deleteLibro(libro)
    if(bool){
        alert('El libro se ha borrado')
    }

}

</script>
<template>
    <v-row cols="12">
        <v-col md="4" v-for="libro in libros">
            <BookCards :libro="libro">
                <v-card-actions v-if="user.usuario?.rol === 'admin'">
                    <v-btn  text="Borrar Libro" append-icon="mdi-delete" color="red" @click="borrarLibro(libro)">

                    </v-btn>
                </v-card-actions>
            </BookCards>
        </v-col>
    </v-row>
</template>
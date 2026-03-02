<script setup lang="ts">

import { useBookStore, useUserStore } from '@/stores/Central'
import BookCards from './components/BookCards.vue';

import type { Libro } from '@/models/Libros'
import { ref } from 'vue';
import UpdateBook from './components/UpdateBook.vue';
const { libros, deleteLibro, updateLibro } = useBookStore()

const showDialog = ref<boolean>(false)
const showUpdate = ref<boolean>(false)

async function borrarLibro(libro: Libro){
    let bool = await deleteLibro(libro)
    showDialog.value = bool
}

</script>
<template>
    <v-row cols="12">
        <v-col md="4" v-for="libro in libros">
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

                        <v-btn prepend-icon="mdi-check-bold" @click="showDialog = !showDialog">
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
</template>
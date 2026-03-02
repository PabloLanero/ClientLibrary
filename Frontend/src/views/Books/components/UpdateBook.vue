<script setup lang="ts">
import type { Libro } from '@/models/Libros';
import { ref } from 'vue';


const props = defineProps<{
    
    showDialog?: boolean
}>()

const libro = ref<Libro>({
    isbn:'',
    titulo:'',
    disponible:true,
    genero:'',
    numeroPaginas: 0,
    precio: 0
})

const emits = defineEmits(['updateLibro', 'cancelUpdate'])
</script>
<template>
<v-dialog :model-value="showDialog">
    <v-card>
        <v-card-title>
            Actualizar el libro
        </v-card-title>
        <v-card-text>
            <v-text-field placeholder="isbn" v-model:model-value="libro.isbn"></v-text-field>
            <v-text-field placeholder="titulo" v-model:model-value="libro.titulo"></v-text-field>
            <v-text-field placeholder="genero" v-model:model-value="libro.genero"></v-text-field>
            <v-text-field placeholder="Paginas" type="number" v-model:model-value="libro.numeroPaginas"></v-text-field>
            <v-text-field placeholder="precio" type="number" v-model:model-value="libro.precio"></v-text-field>
            <span>Disponible</span> <v-switch placeholder="Disponible" type="button" v-model:model-value="libro.disponible" ></v-switch>
        </v-card-text>
        <v-card-actions>
            <v-btn text="Actualizar" @click="emits('updateLibro',libro)"></v-btn>
            <v-btn text="Cancelar" @click="emits('cancelUpdate')"></v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>
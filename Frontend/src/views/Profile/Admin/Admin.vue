<script setup lang="ts">
import CreateBook from '@/components/CreateBook.vue';
import UserCard from '@/components/UserCard.vue'
import type { Libro } from '@/models/Libros';
import { useUserStore, useBookStore } from '@/stores/Central'
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'

const { addLibro } = useBookStore()
const { user } = useUserStore()
const fecha = new Date()
const libro = ref<Libro>({
    isbn: '',
    titulo:'',
    genero: '',
    numeroPaginas:0,
    precio: 0,
    disponible: true,
})
const router = useRouter()

onMounted(() => {
    if(user.usuario?.rol !== 'admin'){
        router.push('/')
    }
})
</script>
<template>
    <v-row>
        <v-col>

            <UserCard :user="user.usuario" />
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <CreateBook  v-model:nuevo-libro="libro" @add-book="addLibro"/>
        </v-col>
    </v-row>
</template>
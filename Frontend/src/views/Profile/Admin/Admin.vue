<script setup lang="ts">
import CreateBook from '@/components/CreateBook.vue';
import UserCard from '@/components/UserCard.vue'
import Gaficas  from './components/Gaficas.vue' ;
import { useUserStore } from '@/stores/userStore'
import { useBookStore } from '@/stores/bookStore'
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
// Types
import type { Libro } from '@/models/Libros';
import type { Usuario } from '@/models/Usuario';
import type { Prestamo } from '@/models/Prestamo';

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
const libros = ref<Libro[]>([])
const usuarios = ref<Usuario[]>([])
const prestamos = ref<Prestamo[]>([])

onMounted(async () => {
    if(user.usuario?.rol !== 'admin'){
        router.push('/')
    }

    let header : any = {
      accept: 'text/plain',
      'Cantidad': 99999,
      'OrderAsc': true
    }
    libros.value = await fetch('http://localhost:8941/api/Libro', {
      headers: header
    }).then((res): Promise<Libro[]> => res.json())

    prestamos.value = await fetch('http://localhost:8941/api/Prestamo').then((res): Promise<Prestamo[]> => res.json())
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
            <CreateBook v-model:nuevo-libro="libro" @add-book="addLibro"/>
        </v-col>
    </v-row>
    <Gaficas :libros="libros" :usuarios="usuarios" :prestamo="prestamos"/>
</template>
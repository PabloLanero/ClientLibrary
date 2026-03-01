<script setup lang="ts">

import { useBookStore } from '@/stores/Central'
import BookCards from './components/BookCards.vue';

const { libros } = useBookStore()

</script>
<template>
    <v-row>
        <v-col v-for="libro in libros">
            <BookCards :libro="libro"/>
        </v-col>
    </v-row>
</template>
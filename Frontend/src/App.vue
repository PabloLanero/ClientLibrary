<script setup lang="ts">
import Header from '@/components/Header.vue'
import Main from './views/main.vue'
import Footer from './components/Footer.vue'
import { onMounted } from 'vue';


import { useBookStore } from './stores/Central';

const { getLibros } = useBookStore()

onMounted( () => {
   getLibros()
})

</script>

<template>
  <RouterView/>
</template>

<style scoped></style>

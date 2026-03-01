<script setup lang="ts">

import { useBookStore } from '@/stores/Central'

const { libros } = useBookStore()

</script>
<template>
    {{ libros }}
</template>
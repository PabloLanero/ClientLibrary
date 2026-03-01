<script setup lang="ts">
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import { useRoute } from 'vue-router'

const router = useRoute()

</script>

<template>
<div class="app-container">
  <!-- Por si se esta logeando o no -->
  <Header v-if="!router.path.includes('SigIn') && !router.path.includes('LogIn') " />
  <RouterView />
  <Footer />
</div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
<script setup lang="ts">
import { useTheme } from 'vuetify'
import { useConfigurationStore } from '@/stores/configurationStore';
import { ref } from 'vue';

const { changeLanguaje } = useConfigurationStore()
// Para cambiar el tema de vuetify, se tiene que llamar desde una zona llamada setup
// Sino dara problemas al ejecutar
const actualTheme = ref<string>('dark')
const theme = useTheme() 
  
  function changeTheme(){
    actualTheme.value = actualTheme.value === 'dark' ? 'light' : 'dark'
    theme.change(actualTheme.value)
    
     
  }


</script>

<template>
  <footer>
    <div>
      <v-btn icon="mdi-theme-light-dark" @click="changeTheme"></v-btn>
    </div>
    <div class="footer-content">
      <p>&copy; {{ new Date().getFullYear() }} Client Library. All rights reserved.</p>
    </div>
    <div>
      <v-btn append-icon="mdi-translate" @click="changeLanguaje" >{{ $t('footer.language') }}</v-btn>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem;
  text-align: center;
  margin-top: auto;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.footer-content p {
  margin: 0;
  font-size: 0.9rem;
}
</style>
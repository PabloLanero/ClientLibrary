<script setup lang="ts">

</script>

<template>
  <footer>
    <div class="footer-content">
      <p>&copy; {{ new Date().getFullYear() }} Client Library. All rights reserved.</p>
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
<script setup lang="ts">

</script>
<template>
  <div class="landing">
    <section class="hero">
      <h1>{{ $t('landing.bienvenida.titulo') }}</h1>
      <p>{{ $t('landing.bienvenida.subtitulo') }}</p>
      <button class="cta-button">{{$t('landing.bienvenida.button')}}</button>
    </section>

    <section class="features">
      <div class="feature">
        <h3>{{ $t('landing.cards.primera.titulo') }}</h3>
        <span class="icon">📚</span>
        <p>{{ $t('landing.cards.primera.texto') }}</p>
      </div>
      <div class="feature">
        <span class="icon">⭐</span>
        <h3>{{ $t('landing.cards.segunda.titulo') }}</h3>
        <p>{{ $t('landing.cards.segunda.texto') }}</p>
      </div>
      <div class="feature">
        <span class="icon">🔖</span>
        <h3>{{ $t('landing.cards.tercera.titulo') }}</h3>
        <p>{{ $t('landing.cards.tercera.texto') }}</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.landing {
  min-height: 80vh;
}

.hero {
  text-align: center;
  padding: 80px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 20px;
  font-weight: 700;
}

.hero p {
  font-size: 1.5rem;
  margin-bottom: 30px;
  opacity: 0.9;
}

.cta-button {
  padding: 15px 40px;
  font-size: 1.1rem;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.3s;
}

.cta-button:hover {
  transform: scale(1.05);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  padding: 60px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature {
  text-align: center;
  padding: 30px;
  border-radius: 10px;
  transition: transform 0.3s;
}

.feature:hover {
  transform: translateY(-10px);
}

.icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 15px;
}

.feature h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
}

.feature p {
  color: #666;
  font-size: 1rem;
}
</style>
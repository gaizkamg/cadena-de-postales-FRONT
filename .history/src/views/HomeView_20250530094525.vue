<template>
  <div class="hero">
    <div class="img-hero"></div>
    <div class="text-hero">
      <h1>
        {{ $t('home-bienvenido-a') }} <span class="logo-texto">Cadena de Postales</span>
      </h1>
      <img src="@/assets/img/logotipo-blanco.png" alt="Logotipo Cadena de Postales" />
      <p class="subheading">{{ $t('home-practica-intro') }}</p>
      <p class="description">
        {{ $t('home-intencion-intro1') }}
        <strong>Cadena de Postales</strong>
        {{ $t('home-intencion-intro2') }}
        <br /><br />
        {{ $t('home-intencion-intro3') }}
      </p>
      <router-link to="/info" class="participation-button">
        {{ $t('home-dinamica') }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
// No hay código JS por ahora
</script>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
}

.img-hero {
  background-image: url('@/assets/img/postal-cara.jpg');
  background-size: cover;
  background-position: center;
}

.text-hero {
  display: flex;
  flex-direction: column;
  padding: 3rem;
}

.text-hero .logo-texto {
  font-size: 5rem;
  font-family: "Qwitcher Grypen", cursive;
  font-weight: 900;
}

.text-hero img {
  width: 80%;
  margin: 1rem 0;
}

.participation-button {
  display: inline-block;
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background-color: #0d7c03;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s ease;
  font-weight: bold;
  width: fit-content;
}

.participation-button:hover {
  background-color: #0a9396;
  cursor: pointer;
}

/* Media query para móvil */
@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
    height: auto;
  }

  .img-hero {
    height: 250px;
  }

  .text-hero {
    padding: 1.5rem;
  }

  .text-hero .logo-texto {
    font-size: 3rem;
  }

  h1 {
    font-size: 2rem;
  }
}
</style>
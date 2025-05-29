<template>
                <div class="hero">
                        <div class="img-hero"></div>
                        <div class="text-hero">
                                <h1>{{ $t('home-bienvenido-a') }} <span class="logo-texto">Cadena de Postales</span></h1>
                                <img src="@/assets/img/logotipo-blanco.png" alt="" />
                                <p class="subheading">
        📬 {{ $t('home-practica-intro') }}
      </p>
        <p class="description">
        {{ $t('home-intencion-intro1') }}<strong>Cadena de Postales</strong>{{ $t('home-intencion-intro2') }}
        <br /><br />
        {{ $t('home-intencion-intro3') }}
      </p>    <router-link to="/info" class="participation-link">
      {{ $t('home-dinamica')}}
    </router-link>
                        </div>
                </div>

</template>

<script setup>

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
 }

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
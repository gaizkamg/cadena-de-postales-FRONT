<template>

  <div class="hero">
    <div class="img-hero"></div>
    <div class="text-hero">
      <h1>
        Bienvenido a <span class="logo-texto">Cadena de Postales</span>
      </h1>
      <p class="subheading">
         Practica y mejora tu español intercambiando cartas manuscritas llenas
        de emoción y aprendizaje.
      </p>
      <p class="description">
        La iniciativa <strong>Cadena de Postales</strong> tiene como propósito
        fortalecer el aprendizaje del castellano a través de la escritura
        manual, fomentando la expresión escrita, la creatividad y la
        comunicación reflexiva entre los participantes.
        <br /><br />
        Una herramienta educativa y emocional que conecta a personas de distintos
        orígenes mediante el poder de las palabras.
      </p>
      <router-link to="/info" class="participation-button">
      Conoce la dinámica

                <div class="hero">
                        <div class="img-hero"></div>
                        <div class="text-hero">
                                <h1>{{ $t('home-bienvenido-a') }}</h1>
                                <img src="@/assets/img/logotipo-blanco.png" alt="" />
                                <p class="subheading">
         {{ $t('home-practica-intro') }}
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

<
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




<template>
                <div class="hero">
                        <div class="img-hero"></div>
                        <div class="text-hero">
                                <h1>Bienvenido a </h1>
                                <img src="@/assets/img/logotipo-negro.png" alt="" />
                                <p class="subheading">
        📬 Practica y mejora tu español intercambiando cartas manuscritas llenas de emoción y aprendizaje.
      </p>
        <p class="description">
        La iniciativa <strong>Cadena de Postales</strong> tiene como propósito fortalecer el aprendizaje del castellano a través de la escritura manual, fomentando la expresión escrita, la creatividad y la comunicación reflexiva entre los participantes. 
        <br /><br />
        Una herramienta educativa y emocional que conecta a personas de distintos orígenes mediante el poder de las palabras.
      </p>    <router-link to="/info" class="participation-link">
      Conoce la dinámica
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
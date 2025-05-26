<template>
   <section class="info-section">
      <h1 class="title">Objetivo de la dinámica</h1>
        <p class="description">
           La iniciativa <strong>"Cadena de Postales"</strong> tiene como propósito fortalecer el aprendizaje del
           castellano a través de la escritura manual, fomentando la <em>expresión escrita</em>, la creatividad y la
           comunicación reflexiva entre los participantes.
        </p>
        <p>A través de esta dinámica se busca:</p>
          <ul class="points-list">
            <li> Potenciar las habilidades lingüísticas (ortografía, redacción y caligrafía).</li>
            <li> Estimular la memoria, la concentración y la asociación de ideas.</li>
            <li> Favorecer la interacción entre todos los miembros de la comunidad educativa de Peñascal.</li>
            <li> Crear lazos de comunidad y fortalecer el sentido de pertenencia.</li>
            <li> Aumentar la autoestima y la confianza en quienes están aprendiendo el idioma.</li>
          </ul>
      </section>

   <section class="info-section second-section">
          <h2 class="title">Justificación de la dinámica</h2>
          <p class="description">
             En un contexto donde la comunicación digital predomina, la escritura manual sigue siendo una herramienta
             fundamental para el desarrollo del pensamiento y la expresión.
         </p>
           <p><em>¿Por qué es importante esta dinámica?</em></p>
             <ul class="points-list">
                 <li> Refuerza el aprendizaje del castellano mediante la práctica real y significativa de la escritura.</li>
                 <li> Promueve una comunicación más personal y reflexiva.</li>
                 <li> Ayuda a quienes están aprendiendo el idioma a expresarse con mayor confianza.</li>
                 <li> Tiene un impacto positivo en la integración social, especialmente en el alumnado extranjero.</li>
                 <li> Fomenta valores como la paciencia, la empatía y la responsabilidad, al requerir compromiso con la respuesta de la postal.</li>
             </ul>
                <p class="description-box">
                  Más que una simple carta, cada postal representa una oportunidad para aprender, conectar y construir comunidad dentro de Peñascal.
                      </p>
</section>

<!-- Nueva sección Mis planes de futuro -->
<section class="info-section third-section"> 
       <h2 class="title">¿Cómo funciona la “Cadena de Postales”?</h2>
          <p class="description">
            El tema es: <strong>“Mis planes de futuro”</strong>
            Escribir el mensaje de forma clara y cuidada.
            Se realiza una presentación (quién soy, dónde estudio o trabajo...)
    </p>
        <ul class="points-list">
           <li> 1: Escribir una postal</li>
           <p>La persona que recibe la postal deberá leerla y responder en un plazo de una semana.</p>
           <li> 2: Enviar la postal</li>
           <p> El proceso se repite, fomentando la continuidad del intercambio.</p>
           <li> 3: Recibir una respuesta</li>
           <p> Una persona de referencia en cada sector/centro se encargará de recoger las postales.</p>
       </ul>
   </section>

 <section class="info-section fourth-section">
  <h2 class="title">¿Quiénes pueden participar?</h2>
  <p class="description">
    La iniciativa está abierta a todas las personas que forman parte de Peñascal, fomentando la conexión y la
    comunicación entre diferentes miembros de la comunidad.
  </p>

  <div class="participant-block">
    <h3 class="subtitle">Alumnado</h3>
    <div class="arrow-line">➡️</div>
    <p class="note">
      Importante que sea alumnado que esté <br>presente en el centro durante la dinámica, <br>que no estén de prácticas u otras<br> actividades externas.
    </p>
    <h3 class="subtitle">Profesorado y personal del centro</h3>
  </div>

  <div class="participant-block">
    <h3 class="subtitle">Requisitos</h3>
    <ul class="note">
      <li>Saber leer y escribir en cualquier nivel.</li>
      <li>Comprometerse a responder la postal recibida en el tiempo establecido.</li>
    </ul>
  </div>
   <p><em>El grupo motor de personas que comienzan redactando postales son aquellas que están en
REFUERZO LINGÜÍSTICO</em></p>
</section>

</template>

<script setup>
</script>

<style scoped>
.info-section {
  padding: 20px;
  margin: 20px auto;
  max-width: 700px;
  background-color: #f0f4f8; /* light grey-blue */
  border-radius: 8px;
  font-family: Arial, sans-serif;
  color: #333;
}

.title {
  font-size: 24px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 15px;
  color: #1a3e72;
}

.description {
  font-size: 16px;
  line-height: 1.5;
  text-align: left;
  margin-bottom: 15px;
}

.points-list {
  list-style: none;
  padding-left: 0;
  margin: 0 auto 15px auto;
  max-width: 680px;
}

.points-list li {
  padding-left: 20px;
  position: relative;
  margin-bottom: 10px;
  font-size: 16px;
  color: #444;
}

.points-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #2c6fdb;
}

.participant-block {
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 12px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.participant-block .subtitle {
  font-weight: 600;
  color: #222;
  width: 180px;
}

.participant-block .arrow-line {
  font-size: 20px;
  color: #2c6fdb;
}

.participant-block .note {
  font-size: 14px;
  color: #555;
  max-width: 450px;
}

</style>
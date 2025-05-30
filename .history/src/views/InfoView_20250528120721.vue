<template>
  <section class="info-section">
    <h1 class="title">Objetivo de la dinámica</h1>
    <p class="description">
      La iniciativa <strong>"Cadena de Postales"</strong> tiene como propósito fortalecer el aprendizaje del
      castellano a través de la escritura manual, fomentando la expresión escrita, la creatividad y la
      comunicación reflexiva entre los participantes.
    </p>
    <p>A través de esta dinámica se busca:</p>
    <ul class="points-list">
      <li>Potenciar las habilidades lingüísticas (ortografía, redacción y caligrafía).</li>
      <li>Estimular la memoria, la concentración y la asociación de ideas.</li>
      <li>Favorecer la interacción entre todos los miembros de la comunidad educativa de Peñascal.</li>
      <li>Crear lazos de comunidad y fortalecer el sentido de pertenencia.</li>
      <li>Aumentar la autoestima y la confianza en quienes están aprendiendo el idioma.</li>
    </ul>
  </section>

  <section class="info-section">
    <h2 class="title">Justificación de la dinámica</h2>
    <p class="description">
      En un contexto donde la comunicación digital predomina, la escritura manual sigue siendo una herramienta
      fundamental para el desarrollo del pensamiento y la expresión.
    </p>
    <p><em>¿Por qué es importante esta dinámica?</em></p>
    <ul class="points-list">
      <li>Refuerza el aprendizaje del castellano mediante la práctica real y significativa de la escritura.</li>
      <li>Promueve una comunicación más personal y reflexiva.</li>
      <li>Ayuda a quienes están aprendiendo el idioma a expresarse con mayor confianza.</li>
      <li>Tiene un impacto positivo en la integración social, especialmente en el alumnado extranjero.</li>
      <li>Fomenta valores como la paciencia, la empatía y la responsabilidad, al requerir compromiso con la respuesta de la postal.</li>
    </ul>
    <p class="description-box">
      Más que una simple carta, cada postal representa una oportunidad para aprender, conectar y construir comunidad dentro de Peñascal.
    </p>
  </section>

  <section class="info-section">
    <h2 class="title">¿Cómo funciona la "Cadena de Postales"?</h2>
    
    <p>1: Escribir una postal</p>
    <ul class="points">
      <li>El tema es: <strong>"Mis planes de futuro"</strong></li>
      <li>Escribir el mensaje de forma clara y cuidada</li>
      <li>Se realiza una presentación (quién soy, dónde estudio o trabajo...)</li>
    </ul>
    
    <p>2: Enviar la postal</p>
    <ul class="points">
      <li>Una persona de referencia en cada sector / centro se encargará de recoger las postales.</li>
    </ul>
    
    <p>3: Recibir una respuesta</p>
    <ul class="points">
      <li>La persona que recibe la postal deberá leerla y responder en un plazo de una semana</li>
      <li>El proceso se repite, fomentando la continuidad del intercambio</li>
    </ul>
  </section>

  <section class="info-section">
    <h2 class="title">¿Quiénes pueden participar?</h2>
    <p class="description">
      La iniciativa está abierta a todas las personas que forman parte de Peñascal, fomentando la conexión y la
      comunicación entre diferentes miembros de la comunidad.
    </p>

    <div class="participant-block">
      <div class="block">
        <h3 class="subtitle">Alumnado</h3>
        <p class="note">
          Importante que sea alumnado presente en el centro durante la dinámica.<br>
          Que no estén de prácticas u otras actividades externas.
        </p>
      </div>

      <div class="block">
        <h3 class="subtitle">Profesorado y personal del centro</h3>
        <p class="note">Animamos a participar a todo el personal interesado.</p>
      </div>

      <div class="block">
        <h3 class="subtitle">Requisitos</h3>
        <ul class="points">
          <li>Saber leer y escribir en cualquier nivel.</li>
          <li>Comprometerse a responder la postal recibida en el tiempo establecido.</li>
        </ul>
      </div>
    </div>

    <p>El grupo motor de personas que comienzan redactando postales son aquellas que están en
    REFUERZO LINGÜÍSTICO</p>
  </section>

  <section class="info-section">
    <h2 class="title">Ejemplo de postal</h2>
    <img src="@/assets/img/ejemplo-postal.png" alt="Ejemplo de postal" class="example-image" />
  </section>

  <section class="info-section">
    <h2 class="title">Pautas para escribir una postal</h2>
    <p>Estructura a seguir:</p>
    <ul class="points-list">
      <li>Saludo: <em>“¡Hola Paula! ¿Qué tal?”</em></li>
      <li>Presentación: <em>“Soy Aitor, profesor de 2º de Soldadura de Belategi”</em></li>
      <li>Mensaje: <em>(Explicamos lo que hemos hecho en vacaciones)</em></li>
      <li>Despedida: <em>“Espero que tú también hayas disfrutado de tus vacaciones, un abrazo”</em></li>
    </ul>

    <ul class="points">
      <li>Escribir con letra clara y frases sencillas.</li>
      <li>Respetar la ortografía dentro de lo posible.</li>
      <li>Usar un tono amable y positivo.</li>
    </ul>
  </section>
</template>

<script setup>
</script>

<style>
.info-section {
  padding: 20px;
  margin: 20px auto;
  max-width: 700px;
  background-color: #f0f4f8;
  border-radius: 8px;
  font-family: Arial, sans-serif;
  color: #333;
}

/* Para pantallas más anchas permitimos que las secciones estén en grid */
@media (min-width: 900px) {
  .info-section {
    max-width: 900px;
    padding: 30px 40px;
  }
}

.title {
  font-size: 24px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 15px;
  color: #1a3e72;
}

.subtitle {
  font-size: 18px;
  font-weight: 600;
  margin-top: 15px;
  color: #1a3e72;
}

/* Listas personalizadas */
.points, .points-list {
  list-style: none;
  padding-left: 20px;
  margin-bottom: 15px;
}

.points li, .points-list li {
  position: relative;
  padding-left: 15px;
  margin-bottom: 8px;
  font-size: 16px;
  color: #444;
}

.points li::before {
  content: "-";
  color: #2c6fdb;
  position: absolute;
  left: 0;
  font-weight: bold;
}

.points-list li::before {
  content: "•";
  color: #2c6fdb;
  font-size: 20px;
  position: absolute;
  left: 0;
  top: 0;
}

/* Participantes - Grid Responsive */
.participant-block {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 12px;
  border-radius: 6px;
}

@media (min-width: 600px) {
  .participant-block {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .participant-block {
    grid-template-columns: repeat(3, 1fr);
  }
}

.participant-block .note {
  font-size: 14px;
  color: #555;
  text-align: center;
  padding: 0 10px;
}

.example-image {
  max-width: 100%;
  border-radius: 8px;
  margin-top: 15px;
}

<
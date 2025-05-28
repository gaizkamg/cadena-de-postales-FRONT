<template>
  <section class="info-section">
    <h1 class="title">{{ $t('info-objetivo')}}</h1>
    <p class="description">
      {{ $t('info-iniciativa1')}}<strong>"Cadena de Postales"</strong> {{ $t('info-iniciativa2') }}</p>
    <p>{{ $t('info-encabezado') }}</p>
    <ul class="points-list">
      <li>{{ $t('info-potenciar') }}</li>
      <li>{{ $t('info-estimular') }}</li>
      <li>{{ $t('info-favorecer') }}</li>
      <li>{{ $t('info-lazos') }}</li>
      <li>{{ $t('info-autoestima') }}</li>
    </ul>
  </section>

  <section class="info-section">
    <h2 class="title">{{ $t('info-justificacion') }}</h2>
    <p class="description">{{ $t('info-contexto') }}</p>
    <p><em>{{ $t('info-importancia') }}</em></p>
    <ul class="points-list">
      <li>{{ $t('info-refuerza') }}</li>
      <li>{{ $t('info-promueve') }}</li>
      <li>{{ $t('info-ayuda') }}</li>
      <li>{{ $t('info-impacto') }}</li>
      <li>{{ $t('info-fomenta') }}</li>
    </ul>
    <p class="description-box">
      {{ $t('info-carta') }}
    </p>
  </section>

  <!-- Usa una estructura consistente para todas las secciones -->
  <section class="info-section">
    <h2 class="title">{{ $t('info-funcionamiento') }}Cadena de Postales?</h2>
    
    <!-- Usa el mismo patrón para todas las listas -->
    <p>1:  {{ $t('info-paso1') }}</p>
    <ul class="points">
      <li>{{ $t('info-tema1') }} <strong>"{{ $t('info-tema2') }}"</strong></li>
      <li>{{ $t('info-escribir') }}</li>
      <li>{{ $t('info-presentacion') }}</li>
    </ul>
    
    <p>2: {{ $t('info-enviar') }}</p>
    <ul class="points">
      <li>{{ $t('info-recogida') }}.</li>
    </ul>
    
    <p>3: {{ $t('info-respuesta') }}</p>
    <ul class="points">
      <li>{{ $t('info-recibo') }}.</li>
      <li>{{ $t('info-proceso') }}.</li>
    </ul>
  </section>

  <section class="info-section">
    <h2 class="title">{{ $t('info-quienes') }}?</h2>
    <p class="description">{{ $t('info-apertura') }}</p>

    <div class="participant-block">
      <h3 class="subtitle">{{ $t('info-alumnado') }}</h3>
      <p class="note">{{ $t('info-importante') }}</p>
      <h3 class="subtitle">{{ $t('info-profesorado') }}</h3>
    </div>

    <div>
      <h3 class="subtitle">{{ $t('info-requisitos') }}</h3>
      <ul class="points">
        <li>{{ $t('info-alfabetismo') }}.</li>
        <li>{{ $t('info-compromiso') }}.</li>
      </ul>
    </div>
    <p>{{ $t('info-inicio') }}</p>
  </section>

  <section class="info-section ">
    <h2 class="title">{{ $t('info-ejemplo') }}</h2>
    <img src="@/assets/img/ejemplo-postal.png" alt="Ejemplo de postal" class="example-image" />
  </section>

  <section class="info-section">
    <h2 class="title">{{ $t('info-pautas') }}</h2>
    <p>{{ $t('info-estructura') }}:</p>
    <ul class="points-list">
      <li>{{ $t('info-saludo1') }}: <em>“¡Hola Paula! ¿Qué tal?”</em></li>
      <li>{{ $t('info-presentacion1') }}: <em>“Soy Aitor, profesor de 2º de Soldadura de Belategi”</em></li>
      <li>{{ $t('info-mensaje1') }}: <em>({{ $t('info-mensaje2') }})</em></li>
      <li>{{ $t('info-despedida1') }}: <em>“Espero que tú también hayas disfrutado de tus vacaciones, un abrazo”</em></li>
    </ul>

    <ul class="points">
      <li>{{ $t('info-escitura') }}.</li>
      <li>{{ $t('info-respetar') }}.</li>
      <li>{{ $t('info-amable') }}.</li>
    </ul>
  </section>
</template>

<script setup>
</script>

<style scoped>
.info-section {
  padding: 20px;
  margin: 20px auto;
  max-width: 700px;
  background-color: #f0f4f8;
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

/* Estilos base para todas las listas */
.points, .points-list {
  list-style: none;
  padding-left: 20px;
  margin-bottom: 15px;
}

/* Estilos para los elementos de lista */
.points li, .points-list li {
  position: relative;
  padding-left: 15px;
  margin-bottom: 8px;
  font-size: 16px;
  color: #444;
}

/* Marcadores para las listas */
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

.participant-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 12px;
  border-radius: 6px;
  gap: 10px;
}

.participant-block .subtitle {
  font-weight: 600;
  color: #222;
  width: 180px;
  text-align: center;
}

.participant-block .note {
  font-size: 14px;
  color: #555;
  flex: 1;
  text-align: center;
  padding: 0 10px;
}

.example-image {
  max-width: 100%;
  border-radius: 8px;
  margin-top: 15px;
}

.cta-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.participation-link {
  display: inline-block;
  padding: 10px 20px;
  background-color: #1a3e72;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 10px;
}

.info-section {
  padding: 20px;
  margin: 20px auto;
  max-width: 700px;
  background-color: #f0f4f8;
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

/* Estilos base para todas las listas */
.points, .points-list {
  list-style: none;
  padding-left: 20px;
  margin-bottom: 15px;
}

/* Estilos para los elementos de lista */
.points li, .points-list li {
  position: relative;
  padding-left: 15px;
  margin-bottom: 8px;
  font-size: 16px;
  color: #444;
}

/* Marcadores para las listas */
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

.participant-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 12px;
  border-radius: 6px;
  gap: 10px;
}

.participant-block .subtitle {
  font-weight: 600;
  color: #222;
  width: 180px;
  text-align: center;
}

.participant-block .note {
  font-size: 14px;
  color: #555;
  flex: 1;
  text-align: center;
  padding: 0 10px;
}

.example-image {
  max-width: 100%;
  border-radius: 8px;
  margin-top: 15px;
}

</style>

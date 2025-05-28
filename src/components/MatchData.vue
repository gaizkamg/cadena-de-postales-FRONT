<template>
  <div class="match-box">
    <h2>{{ $t('match-datos')}}</h2>

    <div class="campo">
      <label>{{ $t('match-nombre')}}:</label>
      <p>{{ match.nombre }}</p>
    </div>

    <div class="campo">
      <label>{{ $t('match-apellido')}}:</label>
      <p>{{ match.apellido }}</p>
    </div>

    <div class="campo">
      <label>{{ $t('match-dedicacion')}}:</label>
      <p>{{ match.dedicacion }}</p>
    </div>

    <div class="campo">
      <label>{{ $t('match-centro')}}:</label>
      <p>{{ match.centro }}</p>
    </div>

    <div class="campo">
      <label>{{ $t('match-grupo')}}:</label>
      <p>{{ match.linguistico }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  match: {
    type: Object,
    required: true,
  }
})
</script>

<style scoped>
.match-box {
  padding: 40px 30px;
  border-radius: 12px;
  text-align: left;
}
.header-image {
  width: 100%;
  height: auto;
  border-radius: 12px 12px 0 0;
  margin-bottom: 20px;
  object-fit: cover;
}

.campo {
  margin-bottom: 15px;
}

.campo label {
  font-weight: bold;
  color: #333;
  margin-right: 10px;
}
</style>
<template>
  <div class="form-container">
    <div class="form-box">
      <h2>Datos de Contacto</h2>

      <form @submit.prevent="submitForm">
        <label for="nombre">Nombre</label>
        <input id="nombre" v-model="form.nombre" type="text" placeholder="Nombre" />

        <label for="apellido">Apellido</label>
        <input id="apellido" v-model="form.apellido" type="text" placeholder="Apellido" />

        <label for="dedicacion">¿A qué te dedicas en Peñascal Kooperatiba?</label>
        <select id="dedicacion" v-model="form.dedicacion">
          <option disabled value="">Selecciona una opción</option>
          <option>Estudio</option>
          <option>Trabajo</option>
        </select>

        <label for="centro">¿En qué centro formativo sueles estar?</label>
        <select id="centro" v-model="form.centro">
          <option disabled value="">Selecciona un centro</option>
          <option>Boluetabarri / Modo - Comercio</option>
          <option>Boluetabarri / Informática</option>
          <option>Boluetabarri / Climatización - Fontanería</option>
          <option>Boluetabarri / Madera</option>
          <option>Boluetabarri / Hostalería</option>
          <option>Boluetabarri / Administración</option>
          <option>Boluetabarri / Complementaria</option>
          <option>Montaño / Hostalería</option>
          <option>Montaño / Construcción - Electricidad</option>
          <option>Belategi / Metal</option>
          <option>Tolosa</option>
          <option>Sarrikue</option>
          <option>Markina</option>
          <option>Errenteria</option>
          <option>Intervención Social Bizkaia</option>
          <option>EPA Gipuzkoa</option>
          <option>EPA Bizkaia</option>
        </select>

        <label for="linguistico">¿Perteneces a un grupo de refuerzo lingüístico?</label>
        <select id="linguistico" v-model="form.linguistico">
          <option disabled value="">Selecciona una opción</option>
          <option>Sí</option>
          <option>No</option>
        </select>

        <button type="submit" class="registro-btn">Registrar</button>
      </form>

      <p class="switch-text">
        ¿Ya tienes cuenta?
        <a href="#">Login</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  nombre: '',
  apellido: '',
  dedicacion: '',
  centro: '',
  linguistico: '',
})

const submitForm = () => {
  console.log('Datos del formulario:', form.value)

  form.value = {
    nombre: '',
    apellido: '',
    dedicacion: '',
    centro: '',
    linguistico: '',
  }
}
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
}

.form-box {
  background: white;
  padding: 40px 30px;
  border-radius: 12px;
  width: 400px;
  text-align: left;
  animation: fadeIn 0.3s ease-in-out;
}

.form-box label {
  margin-top: 20px;
  font-size: 15px;
  font-weight: 600;
  color: #333;
  display: block;
}

.form-box input,
.form-box select {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: white;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-box input:hover,
.form-box select:hover {
  border-color: #28a745;
}

.form-box input:focus,
.form-box select:focus {
  border-color: #fd7e14;
  box-shadow: 0 0 5px #fd7e14;
  outline: none;
}

.registro-btn {
  background-color: #fd7e14;
  color: white;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.registro-btn:hover {
  background-color: #e95f00;
}

.switch-text {
  margin-top: 25px;
  font-size: 14px;
  color: #555;
  text-align: center;
}

.switch-text a {
  color: #fd7e14;
  cursor: pointer;
  text-decoration: underline;
  margin-left: 5px;
  transition: color 0.3s ease;
}

.switch-text a:hover {
  color: #337442;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
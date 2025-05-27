<template>
  <div class="form-container">
    <div class="form-box">
      <h2>Datos de Contacto</h2> 
      <form @submit.prevent="guardarCambios">
        <label for="nombre">Nombre</label>
        <input
          id="nombre"
          v-model="form.nombre"
          type="text"
          placeholder="Nombre"
          :disabled="!editable"
        />

        <label for="apellido">Apellido</label>
        <input
          id="apellido"
          v-model="form.apellido"
          type="text"
          placeholder="Apellido"
          :disabled="!editable"
        />

        <label for="dedicacion">¿A qué te dedicas en Peñascal Kooperatiba?</label>
        <select id="dedicacion" v-model="form.dedicacion" :disabled="!editable">
          <option disabled value="">Selecciona una opción</option>
          <option>Estudio</option>
          <option>Trabajo</option>
        </select>

        <label for="centro">¿En qué centro formativo sueles estar?</label>
        <select id="centro" v-model="form.centro" :disabled="!editable">
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
        <select id="linguistico" v-model="form.linguistico" :disabled="!editable">
          <option disabled value="">Selecciona una opción</option>
          <option>Sí</option>
          <option>No</option>
        </select>

        <div class="botones">
          <button
            v-if="!editable"
            type="button"
            class="editar-btn"
            @click="editar"
          >
            Editar
          </button>
          <button v-else type="submit" class="guardar-btn">Guardar cambios</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
const editable = ref(false)
const form = ref({
  nombre: '',
  apellido: '',
  dedicacion: '',
  centro: '',
  linguistico: '',
})
const modo = ref('actualizacion'); // Puede ser 'registro' o 'actualizacion'

// Función para cargar datos del usuario desde API
const cargarDatosUsuario = async () => {
  try {
    const { data } = await axios.get('/api/usuario')  // endpoint GET usuario
    form.value = data
  } catch (error) {
    console.error('Error al cargar datos:', error)
  }
}

// Función para guardar cambios en API
const guardarCambios = async () => {
  try {
    console.log('Datos enviados:', form.value); // Log para depurar datos enviados
    const endpoint = modo.value === 'registro' ? '/api/auth/register' : '/api/usuario';
    const response = await axios({
      method: modo.value === 'registro' ? 'post' : 'put',
      url: endpoint,
      data: form.value,
    });
    console.log('Respuesta del servidor:', response.data); // Log para depurar respuesta
    editable.value = false;
    alert(modo.value === 'registro' ? 'Registro exitoso.' : 'Datos guardados correctamente.');
  } catch (error) {
    console.error('Error al guardar:', error.response?.data || error.message); // Mostrar detalles del error
    alert('Error guardando datos. Por favor, revisa los datos e inténtalo de nuevo.')
  }
};

const editar = () => {
  editable.value = true
}

onMounted(() => {
  if (modo.value === 'actualizacion') {
    cargarDatosUsuario();
  }
});
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
}
.form-box {
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

.form-box input:disabled,
.form-box select:disabled {
  background-color: #e9ecef;
  cursor: not-allowed;
}

.form-box input:hover:enabled,
.form-box select:hover:enabled {
  border-color: #28a745;
}

.form-box input:focus:enabled,
.form-box select:focus:enabled {
  border-color: #fd7e14;
  box-shadow: 0 0 5px #fd7e14;
  outline: none;
}

.botones {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.editar-btn,
.guardar-btn {
  background-color: #fd7e14;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.editar-btn:hover,
.guardar-btn:hover {
  background-color: #e95f00;
}
</style>
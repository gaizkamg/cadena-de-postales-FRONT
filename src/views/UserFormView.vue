<template>
  <div class="form-container">
    <div class="form-box">
      <h2>{{ modo === 'registro' ? 'Registro de Usuario' : 'Actualizar Datos' }}</h2>
      <form @submit.prevent="guardarCambios">
        <label for="nombre">{{ $t('register-nombre') }}</label>
        <input id="nombre" v-model="form.nombre" type="text" placeholder="Nombre" />

        <label for="apellido">{{ $t('register-apellido') }}</label>
        <input id="apellido" v-model="form.apellido" type="text" placeholder="Apellido" />

        <label for="email">{{ $t('register-correo') }}</label>
        <input id="email" v-model="form.email" type="email" placeholder="Correo Electrónico" />

        <label for="contrasena" v-if="modo === 'registro'">{{ $t('register-contrasena') }}</label>
        <input
          id="contrasena"
          v-model="form.contrasena"
          type="password"
          placeholder="Contraseña"
          v-if="modo === 'registro'"
        />

        <label for="rol_id">{{ $t('register-rol') }}</label>
        <select id="rol_id" v-model="form.rol_id">
          <option disabled value="">{{ $t('register-selec-rol') }}</option>
          <option value="1">{{ $t('register-admin') }}</option>
          <option value="2">{{ $t('register-usuario') }}</option>
        </select>

        <label for="centro_id">{{ $t('register-centro') }}</label>
        <select id="centro_id" v-model="form.centro_id">
          <option disabled value="">{{ $t('register-selec-centro') }}</option>
          <option value="1">Boluetabarri</option>
          <option value="2">Montaño</option>
          <option value="3">Belategi</option>
          <option value="4">Tolosa</option>
        </select>

        <label for="sector_id">{{ $t('register-sector') }}</label>
        <select id="sector_id" v-model="form.sector_id">
          <option disabled value="">{{ $t('register-selec-sector') }}</option>
          <option value="1">{{ $t('register-hosteleria') }}</option>
          <option value="2">{{ $t('register-construccion') }}</option>
          <option value="3">{{ $t('register-metal') }}</option>
        </select>

        <label for="linguistico">{{ $t('register-pertenece') }}?</label>
        <select id="linguistico" v-model="form.refuerzo_linguistico">
          <option disabled value="">{{ $t('register-selec-opcion') }}</option>
          <option :value="true">{{ $t('register-si') }}</option>
          <option :value="false">{{ $t('register-no') }}</option>
        </select>

        <label for="penascal_rol">{{ $t('register-penascal') }}</label>
        <select id="penascal_rol" v-model="form.penascal_rol">
          <option disabled value="">{{ $t('register-selec-penascal') }}</option>
          <option value="1">{{ $t('register-estud') }}</option>
          <option value="2">{{ $t('register-traba') }}</option>
        </select>

        <div class="botones">
          <button type="submit" class="guardar-btn">
            {{ modo === 'registro' ? 'Registrar' : 'Guardar cambios' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const editable = ref(false)
const modo = ref('registro') // Cambiar a 'actualizacion' según el caso

const form = ref({
  nombre: '',
  apellido: '',
  email: '',
  contrasena: '',
  rol_id: null,
  centro_id: null,
  sector_id: null,
  refuerzo_linguistico: null,
  penascal_rol: null,
})

const cargarDatosUsuario = async () => {
  try {
    const { data } = await axios.get('/api/usuario') // Endpoint para obtener datos del usuario
    form.value = data
  } catch (error) {
    console.error('Error al cargar datos:', error)
  }
}

const guardarCambios = async () => {
  try {
    console.log('Datos enviados:', form.value)
    const endpoint = modo.value === 'registro' ? '/api/auth/register' : '/api/usuario'
    const response = await axios({
      method: modo.value === 'registro' ? 'post' : 'put',
      url: endpoint,
      data: form.value,
    })
    console.log('Respuesta del servidor:', response.data)
    editable.value = false
    alert(modo.value === 'registro' ? 'Registro exitoso.' : 'Datos guardados correctamente.')
  } catch (error) {
    console.error('Error al guardar:', error.response?.data || error.message)
    alert('Error guardando datos. Por favor, revisa los datos e inténtalo de nuevo.')
  }
}

const editar = () => {
  editable.value = true
}

onMounted(() => {
  if (modo.value === 'actualizacion') {
    cargarDatosUsuario()
  }
})
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
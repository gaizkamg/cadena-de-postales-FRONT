<template>
  <div class="form-container">
    <div class="form-box">
      <h2>{{ modo === 'registro' ? 'Registro de Usuario' : 'Actualizar Datos' }}</h2>
      <form @submit.prevent="guardarCambios">
        <label for="nombre">Nombre</label>
        <input id="nombre" v-model="form.nombre" type="text" placeholder="Nombre" />

        <label for="apellido">Apellido</label>
        <input id="apellido" v-model="form.apellido" type="text" placeholder="Apellido" />

        <label for="email">Correo Electrónico</label>
        <input id="email" v-model="form.email" type="email" placeholder="Correo Electrónico" />

        <label for="contrasena" v-if="modo === 'registro'">Contraseña</label>
        <input
          id="contrasena"
          v-model="form.contrasena"
          type="password"
          placeholder="Contraseña"
          v-if="modo === 'registro'"
        />

        <label for="rol_id">Rol</label>
        <select id="rol_id" v-model="form.rol_id">
          <option disabled value="">Selecciona un rol</option>
          <option value="1">Administrador</option>
          <option value="2">Usuario</option>
        </select>

        <label for="centro_id">Centro</label>
        <select id="centro_id" v-model="form.centro_id">
          <option disabled value="">Selecciona un centro</option>
          <option value="1">Boluetabarri</option>
          <option value="2">Montaño</option>
          <option value="3">Belategi</option>
          <option value="4">Tolosa</option>
        </select>

        <label for="sector_id">Sector</label>
        <select id="sector_id" v-model="form.sector_id">
          <option disabled value="">Selecciona un sector</option>
          <option value="1">Hostelería</option>
          <option value="2">Construcción</option>
          <option value="3">Metal</option>
        </select>

        <label for="linguistico">¿Perteneces a un grupo de refuerzo lingüístico?</label>
       <label>
      <input
        type="checkbox"
        :checked="form.refuerzo_linguistico === true"
        @change="setRefuerzo(true)"
      />
      Sí
    </label>

        <label>
          <input
            type="checkbox"
            :checked="form.refuerzo_linguistico === false"
            @change="setRefuerzo(false)"
          />
          No
        </label>
      </div>

        <label for="penascal_rol">Rol en Peñascal</label>
        <select id="penascal_rol" v-model="form.penascal_rol">
          <option disabled value="">Selecciona un rol</option>
          <option value="1">Estudiante</option>
          <option value="2">Trabajador</option>
        </select>

        <div class="botones">
          <button type="submit" class="guardar-btn">
            {{ modo === 'registro' ? 'Registrar' : 'Guardar cambios' }}
          </button>
        </div>
  </div>
      </form>
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
  width: 300px;
  text-align: left;
  animation: fadeIn 0.3s ease-in-out;
}

.form-box label {
  margin-top: 20px;
  font-size: 15px;
  font-weight: 300;
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
<template>
  <div class="form-container">
    <div class="form-box">
      <h2>{{ modo === 'registro' ? 'Registro de Usuario' : 'Actualizar Datos' }}</h2>
      <button v-if="modo === 'actualizacion' && !editable && isAuthenticated" class="editar-btn" @click="editar" style="margin-bottom: 20px;">Editar</button>
      <form @submit.prevent="guardarCambios" class="form-grid">
        <div class="form-column">
          <label for="nombre">Nombre</label>
          <input id="nombre" v-model="form.nombre" type="text" placeholder="Nombre" :disabled="!editable" />

          <label for="apellido">Apellido</label>
          <input id="apellido" v-model="form.apellido" type="text" placeholder="Apellido" :disabled="!editable" />

          <label for="email">Correo Electrónico</label>
          <input id="email" v-model="form.email" type="email" placeholder="Correo Electrónico" :disabled="!editable" />

          <label for="contrasena" v-if="modo === 'registro'">Contraseña</label>
          <input
            id="contrasena"
            v-model="form.contrasena"
            type="password"
            placeholder="Contraseña"
            v-if="modo === 'registro'"
            :disabled="!editable"
          />

          <label for="penascal_rol">Rol en Peñascal</label>
          <select id="penascal_rol" v-model="form.penascal_rol" :disabled="!editable">
            <option disabled value="">Selecciona un rol</option>
            <option value="1">Estudiante</option>
            <option value="2">Trabajador</option>
          </select>
        </div>

        <div class="form-column">
          <label for="centro_id">Centro</label>
          <select id="centro_id" v-model="form.centro_id" :disabled="!editable">
            <option disabled value="">Selecciona un centro</option>
            <option v-for="centro in centros" :key="centro.id" :value="centro.id">{{ centro.nombre }}</option>
          </select>

          <label for="sector_id">Sector</label>
          <select id="sector_id" v-model="form.sector_id" :disabled="!editable">
            <option disabled value="">Selecciona un sector</option>
            <option v-for="sector in sectores" :key="sector.id" :value="sector.id">{{ sector.nombre }}</option>
          </select>

          <label for="linguistico">¿Refuerzo lingüístico?</label>
          <div class="radio-group">
            <label>
              <input type="radio" :value="true" v-model="form.refuerzo_linguistico" :disabled="!editable" />
              Sí
            </label>
            <label>
              <input type="radio" :value="false" v-model="form.refuerzo_linguistico" :disabled="!editable" />
              No
            </label>
          </div>

          <label for="intereses">Intereses/Aficiones</label>
          <select id="intereses" v-model="form.intereses" :disabled="!editable">
            <option disabled value="">Selecciona un interés</option>
            <option v-for="interes in intereses" :key="interes.id" :value="interes.id">{{ interes.nombre }}</option>
          </select>

          <label for="rol_id">Rol de Usuario</label>
          <select id="rol_id" v-model="form.rol_id" :disabled="modo === 'registro' || !editable">
            <option disabled value="">Usuario normal</option>
            <option v-for="rol in roles" :key="rol.id" :value="rol.id">{{ rol.nombre }}</option>
          </select>
        </div>

        <div class="botones">
          <button v-if="editable" type="submit" class="guardar-btn">
            {{ modo === 'registro' ? 'Registrar' : 'Guardar cambios' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/useApi.js';
import axios from 'axios'
import { useAuthStore } from '@/stores/auth.js';
import { useRouter } from 'vue-router';

const { postData, fetchData } = useApi();
const authStore = useAuthStore();
const isAuthenticated = authStore.isAuthenticated;
const router = useRouter();

const editable = ref(false)
const modo = ref('registro') // Valor por defecto seguro

// Detectar modo según prop o ruta SOLO después de definir modo
if (typeof window !== 'undefined' && window.location.pathname.includes('register')) {
  editable.value = true;
  modo.value = 'registro';
} else {
  modo.value = 'actualizacion';
}

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
  intereses: null,
})

const roles = ref([]);
const centros = ref([]);
const sectores = ref([]);
const intereses = ref([]);

const cargarDatosUsuario = async () => {
  try {
    // Obtener usuario_id desde Pinia
    const user = authStore.user;
    const usuario_id = user && (user.usuario_id || user.id);
    if (!usuario_id) {
      console.error('No se encontró usuario_id en el store de auth');
      return;
    }
    // Petición al endpoint de usuario concreto
    const { data } = await axios.get(`/api/usuarios/${usuario_id}`);
    console.log('Datos usuario backend:', data); // <-- DEBUG
    // Rellenar el formulario con los datos del usuario, asegurando tipos y valores válidos
    form.value = {
      ...form.value,
      ...data,
      centro_id: data.centro_id ?? '',
      sector_id: data.sector_id ?? '',
      penascal_rol: data.penascal_rol ?? '',
      intereses: data.intereses ?? '',
      refuerzo_linguistico: data.refuerzo_linguistico ?? false,
      rol_id: data.rol_id ?? '',
      contrasena: '', // nunca mostrar la contraseña
    };
    console.log('Formulario tras cargar usuario:', form.value); // <-- DEBUG
  } catch (error) {
    console.error('Error al cargar datos:', error)
  }
}

const cargarDatosSelect = async () => {
  try {
    const centrosResponse = await fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/centros/lista`);
    centros.value = centrosResponse.data;

    const sectoresResponse = await fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/sectores/lista`);
    sectores.value = sectoresResponse.data;

    const interesesResponse = await fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/intereses/lista`);
    intereses.value = interesesResponse.data.map(interes => ({ id: interes.id, nombre: interes.descripcion_castellano }));  

    const rolesResponse = await fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/roles`);
    roles.value = rolesResponse.data;
  } catch (error) {
    console.error('Error al cargar datos de los select:', error);
  }
};

const guardarCambios = async () => {
  try {
    console.log('Datos enviados:', form.value);
    if (modo.value === 'registro') {
      form.value.rol_id = 2; // Asignar siempre el rol de usuario
    }
    const endpoint = modo.value === 'registro' ? '/api/auth/register' : '/api/usuarios';
    const response = await postData(endpoint, form.value);
    console.log('Respuesta del servidor:', response.data);
    editable.value = false;
    alert(modo.value === 'registro' ? 'Registro exitoso.' : 'Datos guardados correctamente.');
    if (modo.value === 'registro') {
      // Guardar usuario en Pinia y sessionStorage tras registro
      const userData = {
        ...response.data,
        email: form.value.email,
        nombre: form.value.nombre,
        apellido: form.value.apellido,
        rol_id: 2,
      };
      authStore.user = userData;
      authStore.isAuthenticated = true;
      sessionStorage.setItem('user', JSON.stringify(userData));
      router.push('/dashboard');
    }
  } catch (error) {
    console.error('Error al guardar:', error.response?.data || error.message);
    alert('Error guardando datos. Por favor, revisa los datos e inténtalo de nuevo.');
  }
}

const editar = () => {
  editable.value = true
}

onMounted(() => {
  if (modo.value === 'registro') {
    editable.value = true;
    form.value.rol_id = ""; // Asegurar que el valor inicial sea vacío para mostrar el placeholder
  }
  cargarDatosSelect();
  if (modo.value === 'actualizacion') {
    cargarDatosUsuario();
  }
})
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-box {
  padding: 40px 30px;
  border-radius: 12px;
  width: 60%;
  text-align: left;
  animation: fadeIn 0.3s ease-in-out;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
}
.form-column {
  display: flex;
  flex-direction: column;
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

.radio-group {
  display: flex;
  gap: 1rem;
  margin: 10px 0 20px;
}

.radio-group label {
  font-weight: 400;
  color: #333;
}

@media (max-width: 1024px) {
    .form-grid {
        grid-template-columns: 1fr;
    }
}
</style>
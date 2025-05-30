<template>
  <div class="dashboard-container">
    <div class="card">
      <UserFormView />
    </div>
    <div class="card">
      <MatchData v-if="datosMatch" :match="datosMatch" />
      <p v-else>Cargando datos...</p>
    </div>
    <div class="card">
      <h2>Datos de Usuarios</h2>
      <pre v-if="datosUsuarios">{{ datosUsuarios }}</pre>
      <p v-else>Cargando datos de usuarios...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import UserFormView from '@/views/UserFormView.vue'
import MatchData from '@/components/MatchData.vue'
import axios from 'axios'
import { useApi } from '@/composables/useApi.js'

const { fetchUsers, patchUser } = useApi()

const datosMatch = ref(null)
const datosUsuarios = ref(null)

const cargarDatosMatch = async () => {
  try {
    const { data } = await axios.get('/api/emparejamientos/lista')
    datosMatch.value = data
  } catch (error) {
    console.error('Error cargando datos match:', error)
  }
}

const cargarDatosUsuarios = async () => {
  try {
    datosUsuarios.value = await fetchUsers()
  } catch (error) {
    console.error('Error cargando datos de usuarios:', error)
  }
}

const editarUsuario = async (userId, nuevosDatos) => {
  try {
    const usuarioActualizado = await patchUser(userId, nuevosDatos)
    console.log('Usuario actualizado:', usuarioActualizado)
  } catch (error) {
    console.error('Error editando usuario:', error)
  }
}

onMounted(() => {
  cargarDatosMatch()
  cargarDatosUsuarios()
})
</script>

<style scoped>
.dashboard-container {
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Cambiado de stretch a flex-start */
  gap: 30px;
  padding: 30px 20px;
  background-color: #f2f2f2;
  min-height: calc(100vh - 60px); /* Ajuste para altura total */
}

.card {
  max-height: 70vh; /* Reducido de 80vh */
  height: auto; /* Altura automática según contenido */
  min-height: 300px; /* Altura mínima para mantener consistencia */
  overflow-y: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px; /* Reducido de 30px */
  width: 380px; /* Ligeramente reducido */
  display: flex;
  flex-direction: column;
  background: white; /* Fondo blanco para mejor contraste */
}

.card h2 {
  margin-top: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.card pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: 14px;
  max-height: 50vh;
  overflow-y: auto;
  background: #f8f8f8;
  padding: 10px;
  border-radius: 4px;
}

/* Responsive para tablets */
@media (max-width: 1024px) {
  .dashboard-container {
    flex-wrap: wrap;
  }
  .card {
    width: 100%;
    max-width: 400px;
    max-height: 50vh;
  }
}

/* Responsive para móviles */
@media (max-width: 768px) {
  .dashboard-container {
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px 10px;
  }
  .card {
    width: 100%;
    max-width: 100%;
    min-height: auto;
    max-height: none;
  }
}
</style>
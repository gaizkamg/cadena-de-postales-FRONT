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
  gap: 30px;
  padding: 30px;
  background-color: #f2f2f2;
  min-height: calc(100vh - 60px);
}

.card {
  height: 65vh; /* Mantenemos altura fija */
  width: 450px; /* Aumentamos el ancho (antes 350px) */
  min-width: 450px; /* Forzamos el ancho mínimo */
  overflow-y: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 25px; /* Aumentamos padding */
  background: white;
  flex-shrink: 0;
  display: flex;
  flex-direction: column; /* Mejor organización interna */
}

/* Ajustamos el contenido para aprovechar el nuevo espacio */
.card h2 {
  font-size: 1.4rem;
  margin-bottom: 15px;
}

.card pre {
  background: #f8f8f8;
  padding: 15px;
  border-radius: 8px;
  flex-grow: 1;
  overflow: auto;
}

/* Responsive para pantallas más grandes */
@media (min-width: 1600px) {
  .card {
    width: 500px;
    min-width: 500px;
  }
}

/* Ajustes para tablet */
@media (max-width: 1200px) {
  .dashboard-container {
    flex-wrap: wrap;
  }
  .card {
    width: 100%;
    min-width: 400px;
    max-width: 400px;
    height: 60vh;
  }
}

/* Ajustes para móvil */
@media (max-width: 768px) {
  .card {
    min-width: 100%;
    height: auto;
    max-height: 70vh;
    padding: 20px;
  }
}
</style>
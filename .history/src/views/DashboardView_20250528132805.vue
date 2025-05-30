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
     <UserDataComp :userId="currentUserId" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import UserFormView from '@/views/UserFormView.vue'
import MatchData from '@/components/MatchData.vue'
import UserDataComp from '@/components/UserDataComp.vue'
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
  flex-wrap: wrap; /* Permite que las cards pasen a nueva línea */
  justify-content: center;
  gap: 30px;
  padding: 30px;
  background-color: #f2f2f2;
  min-height: calc(100vh - 60px);
}

.card {
  height: 65vh;
  width: 450px;
  min-width: 450px;
  overflow-y: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 25px;
  background: white;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

/* Versión Tablet - 2 columnas */
@media (max-width: 1200px) {
  .dashboard-container {
    gap: 20px;
  }
  .card {
    width: calc(50% - 40px); /* 2 cards por fila */
    min-width: unset;
    max-width: 100%;
    height: 60vh;
  }
}

/* Versión Móvil - 1 columna */
@media (max-width: 768px) {
  .dashboard-container {
    flex-direction: column;
    align-items: center;
    padding: 15px;
    gap: 20px;
  }
  
  .card {
    width: 100%;
    min-width: unset;
    height: auto;
    max-height: none;
    padding: 20px;
  }
  
  /* Asegurar que todas las cards sean visibles */
  .card:last-child {
    margin-bottom: 20px;
  }
}

/* Contenido interno responsive */
.card h2 {
  font-size: clamp(1.2rem, 2vw, 1.4rem);
}

.card pre {
  font-size: clamp(0.9rem, 1.5vw, 1rem);
}
</style>
<template>
  <div class="dashboard-container">
    <div class="card">
      <UserFormView />
    </div>
    <div class="card">
      <MatchData v-if="datosMatch" :match="datosMatch" />
      <p v-else>{{ $t('panel-carga') }}...</p>
    </div>
    <div class="card">
      <h2>{{ $t('panel-usuarios') }}</h2>
      <pre v-if="datosUsuarios">{{ datosUsuarios }}</pre>
      <p v-else>{{ $t('panel-datos') }}...</p>
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
    const { data } = await axios.get('/api/emparejamientos/lista')  // endpoint GET datos match
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
    // Actualizar datos locales si es necesario
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
  align-items: stretch;
  gap: 40px;
  padding: 60px 20px;
  background-color: #f2f2f2;
}

.card {
  max-height: 80vh;     
  overflow-y: auto;      
  border-radius: 12px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 1);
  padding: 30px;
  width: 400px;
  display: flex;
  flex-direction: column; 
}
</style>
<template>
  <div class="dashboard-container">
    <div class="card">
      <UserFormView />
    </div>
    <div class="card">
      <MatchData v-if="datosMatch" :match="datosMatch" />
      <p v-else>Cargando datos...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import UserFormView from '@/views/UserFormView.vue'
import MatchData from '@/components/MatchData.vue'
import axios from 'axios'

const datosMatch = ref(null)

const cargarDatosMatch = async () => {
  try {
    const { data } = await axios.get('/api/match')  // endpoint GET datos match
    datosMatch.value = data
  } catch (error) {
    console.error('Error cargando datos match:', error)
  }
}

onMounted(() => {
  cargarDatosMatch()
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
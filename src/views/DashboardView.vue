<template>
  <div class="dashboard-container">
    <div class="card">
      <UserFormComp :modo="'actualizacion'" />
    </div>
    <div class="card">
      <MatchData v-if="datosMatch" :match="datosMatch" />
      <p v-else>Cargando datos...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import UserFormComp from '@/components/UserFormComp.vue';
import MatchData from '@/components/MatchData.vue';
import axios from 'axios';

const datosMatch = ref(null);

const cargarDatosMatch = async () => {
  try {
    const { data } = await axios.get('/api/match');
    datosMatch.value = data;
  } catch (error) {
    console.error('Error cargando datos match:', error);
  }
};

onMounted(() => {
  cargarDatosMatch();
});
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-wrap: wrap;  
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

 
@media (max-width: 1200px) {
  .dashboard-container {
    gap: 20px;
  }
  .card {
    width: calc(80% - 40px);  
    min-width: unset;
    max-width: 100%;
    height: 60vh;
  }
}

 
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

 
  .card:last-child {
    margin-bottom: 20px;
  }
}
 
.card h2 {
  font-size: clamp(1.2rem, 2vw, 1.4rem);
}

.card pre {
  font-size: clamp(0.9rem, 1.5vw, 1rem);
}
</style>
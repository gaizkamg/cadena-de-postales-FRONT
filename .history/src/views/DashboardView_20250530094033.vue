<template>
  <div class="dashboard-container">
    <div class="card">
      <UserFormComp :modo="'actualizacion'" />
    </div>
    <div class="card">
      <MatchData v-if="datosMatch && typeof datosMatch === 'object'" :match="datosMatch" />
      <p v-else>Cargando datos...</p>
    </div>

    <!-- Card 3: UserDataComp (solo para rol 3) -->
    <div class="card" v-if="userData && userData.role === 3">
      <h2>Datos de Usuarios</h2>
      <UserDataComp :userId="userData.id" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import UserFormComp from '@/components/UserFormComp.vue'
import MatchData from '@/components/MatchData.vue'
import UserDataComp from '@/components/UserDataComp.vue'
import axios from 'axios'

const datosMatch = ref(null);
const userData = ref(null);

const cargarDatosMatch = async () => {
  try {
    const token = sessionStorage.getItem('authToken');
    const user = JSON.parse(sessionStorage.getItem('user'));
    const userId = user ? (user.usuario_id || user.id) : null;

    if (!token) throw new Error('No hay token de autenticación');
    if (!userId) throw new Error('Usuario no identificado');

    const url = `${import.meta.env.VITE_API_BASE_URL}/api/emparejamientos/lista`;

    const { data } = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!Array.isArray(data)) throw new Error('La respuesta de la API no es válida.');

    const datosFiltrados = data.filter(match => match.usuario_id === userId);
    datosMatch.value = datosFiltrados;

  } catch (error) {
    console.error('Error cargando datos match:', error);
    alert('Error al cargar los datos de emparejamiento. Por favor, verifica la API o la autenticación.');
  }
}

onMounted(async () => {
  try {
    const res = await axios.get('/api/users/1');
    userData.value = res.data;
    await cargarDatosMatch();
  } catch (error) {
    console.error(error);
  }
});
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
    width: calc(80% - 40px);  
    min-width: unset;
    max-width: 100%;
    height: 60vh;
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
.card h2 {
  font-size: clamp(1.2rem, 2vw, 1.4rem);
}

.card pre {
  font-size: clamp(0.9rem, 1.5vw, 1rem);
}
}
</style>
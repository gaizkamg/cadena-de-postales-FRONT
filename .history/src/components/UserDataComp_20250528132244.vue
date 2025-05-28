<template>
  <div class="user-data-card">
    <h2>Datos del Usuario</h2>
    <div v-if="loading" class="loading-message">
      <p>Cargando datos del usuario...</p>
    </div>
    <div v-else-if="error" class="error-message">
      <p>Error al cargar datos: {{ error }}</p>
    </div>
    <div v-else class="user-data-content">
      <div v-if="userData" class="data-display">
        <pre>{{ formattedUserData }}</pre>
      </div>
      <div v-else class="no-data">
        <p>No se encontraron datos del usuario</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const props = defineProps({
  userId: {
    type: [String, Number],
    required: true
  }
})

const userData = ref(null)
const loading = ref(false)
const error = ref(null)

const formattedUserData = computed(() => {
  if (!userData.value) return ''
  return JSON.stringify(userData.value, null, 2)
})

const fetchUserData = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await axios.get(`http://192.168.21.90:5000/api/usuarios/${props.userId}`)
    userData.value = response.data
  } catch (err) {
    console.error('Error fetching user data:', err)
    error.value = err.message || 'Error desconocido'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUserData()
})

// Si el userId cambia, volver a cargar los datos
watch(() => props.userId, (newId) => {
  if (newId) {
    fetchUserData()
  }
})
</script>

<style scoped>
.user-data-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: 65vh;
  overflow-y: auto;
  width: 100%;
}

h2 {
  color: #2c3e50;
  margin-top: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

pre {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 6px;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  overflow-x: auto;
}

.loading-message, .error-message, .no-data {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #666;
}

.error-message {
  color: #e74c3c;
}

@media (max-width: 768px) {
  .user-data-card {
    height: auto;
    max-height: 70vh;
  }
}
</style>
<template>
  <div class="admin-dashboard">
    <h2>Panel de Administración</h2>

    <!-- Filtros -->
    <form @submit.prevent>
      <label for="centro">Centro:</label>
      <select id="centro" v-model="selectedCentro" @change="resetSector">
        <option disabled value="">-- Selecciona un centro --</option>
        <option v-for="centro in centros" :key="centro" :value="centro">{{ centro }}</option>
      </select>

      <label for="sector">Sector:</label>
      <select id="sector" v-model="selectedSector" :disabled="!selectedCentro">
        <option disabled value="">-- Selecciona un sector --</option>
        <option v-for="sector in sectoresFiltrados" :key="sector" :value="sector">{{ sector }}</option>
      </select>

      <button type="button" @click="resetFiltros">Resetear filtros</button>
    </form>

    <!-- Búsqueda -->
    <input
      type="text"
      v-model="busqueda"
      placeholder="Buscar por nombre o apellidos..."
      class="buscador"
    />

    <!-- Tabla -->
    <div v-if="usuariosPaginados.length" class="tabla-usuarios">
      <h3>Usuarios - {{ selectedCentro }} / {{ selectedSector }}</h3>
      <table>
        <thead>
          <tr>
            <th>Seleccionar</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Centro</th>
            <th>Refuerzo</th>
            <th>Intereses</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuario in usuariosPaginados" :key="usuario.id">
            <td><input type="checkbox" :value="usuario.id" v-model="usuariosSeleccionados" /></td>
            <td>{{ usuario.nombre }}</td>
            <td>{{ usuario.apellido }}</td>
            <td>{{ usuario.centro }}</td>
            <td>{{ usuario.refuerzo }}</td>
            <td>{{ usuario.intereses }}</td>
            <td>
              <button @click="verUsuario(usuario)">👁️</button>
              <button @click="editarUsuario(usuario)">✏️</button>
              <button @click="eliminarUsuario(usuario.id)">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Paginación -->
      <div class="paginacion">
        <button :disabled="paginaActual === 1" @click="paginaActual--">Anterior</button>
        <span>Página {{ paginaActual }} / {{ totalPaginas }}</span>
        <button :disabled="paginaActual === totalPaginas" @click="paginaActual++">Siguiente</button>
      </div>
    </div>

    <p v-else class="info">Selecciona centro y sector para mostrar usuarios.</p>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import axios from 'axios'

const centros = [
  'Boluetabarri', 'Montaño', 'Belategi', 'Tolosa', 'Sarrikue',
  'Markina', 'Errenteria', 'Intervención Social Bizkaia',
  'EPA Gipuzkoa', 'EPA Bizkaia'
]

const sectoresPorCentro = {
  Boluetabarri: ['Modo - Comercio', 'Informática', 'Climatización - Fontanería', 'Madera', 'Hostalería', 'Administración', 'Complementaria'],
  Montaño: ['Hostalería', 'Construcción - Electricidad'],
  Belategi: ['Metal'],
  Tolosa: [], Sarrikue: [], Markina: [], Errenteria: [],
  'Intervención Social Bizkaia': [], 'EPA Gipuzkoa': [], 'EPA Bizkaia': []
}

const selectedCentro = ref('')
const selectedSector = ref('')
const usuarios = ref([])
const usuariosSeleccionados = ref([])
const busqueda = ref('')
const paginaActual = ref(1)
const usuariosPorPagina = 10

const sectoresFiltrados = computed(() => {
  return selectedCentro.value ? sectoresPorCentro[selectedCentro.value] || [] : []
})

const usuariosFiltrados = computed(() => {
  return usuarios.value.filter(u => {
    const coincideCentro = u.centro === selectedCentro.value
    const coincideSector = u.sector === selectedSector.value
    const coincideBusqueda = u.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
                             u.apellido.toLowerCase().includes(busqueda.value.toLowerCase())
    return coincideCentro && coincideSector && coincideBusqueda
  })
})

const totalPaginas = computed(() => {
  return Math.ceil(usuariosFiltrados.value.length / usuariosPorPagina)
})

const usuariosPaginados = computed(() => {
  const inicio = (paginaActual.value - 1) * usuariosPorPagina
  return usuariosFiltrados.value.slice(inicio, inicio + usuariosPorPagina)
})

const resetSector = () => {
  selectedSector.value = ''
  usuariosSeleccionados.value = []
  paginaActual.value = 1
}

const resetFiltros = () => {
  selectedCentro.value = ''
  selectedSector.value = ''
  busqueda.value = ''
  usuariosSeleccionados.value = []
  usuarios.value = []
  paginaActual.value = 1
}

const cargarUsuarios = async () => {
  if (!selectedCentro.value || !selectedSector.value) {
    usuarios.value = []
    return
  }
  try {
    const { data } = await axios.get('/api/usuarios', {
      params: { centro: selectedCentro.value, sector: selectedSector.value }
    })
    usuarios.value = data
    usuariosSeleccionados.value = []
    paginaActual.value = 1
  } catch (error) {
    console.error('Error al cargar usuarios:', error)
  }
}

// Acciones de usuario
const verUsuario = (usuario) => {
  alert(`👁️ Usuario:\n${JSON.stringify(usuario, null, 2)}`)
}

const editarUsuario = (usuario) => {
  alert(`Funcionalidad editar no implementada aún para ${usuario.nombre}.`)
}

const eliminarUsuario = async (id) => {
  if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
    try {
      await axios.delete(`/api/usuarios/${id}`)
      usuarios.value = usuarios.value.filter(u => u.id !== id)
    } catch (error) {
      console.error('Error al eliminar usuario:', error)
    }
  }
}

watch([selectedCentro, selectedSector], () => {
  cargarUsuarios()
})
</script>

<style scoped>
.admin-dashboard {
  max-width: 900px;
  margin: 40px auto;
  padding: 40px;
  background: #f9fafb;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h2, h3 {
  color: rgb(5, 90, 12);
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
}

label {
  font-weight: 600;
  margin-right: 8px;
}

select {
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: #fff;
  color: #111827;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

select:focus {
  border-color: rgb(0, 141, 12);
  outline: none;
}

.tabla-usuarios {
  overflow-x: auto;
  border-radius: 10px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 14px 12px;
  text-align: left;
  font-size: 15px;
}

th {
  background-color: #eef2ff;
  color:  rgb(0, 141, 12);
  font-weight: 600;
}

tr:nth-child(even) {
  background-color: #f9fafb;
}

tr:hover {
  background-color: #e0e7ff;
}

.info {
  color: #6b7280;
  font-style: italic;
  margin-top: 20px;
}
.buscador {
  margin-bottom: 20px;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  width: 100%;
}

.paginacion {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.paginacion button {
  background-color: rgb(0, 141, 12);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
}

.paginacion button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

</style>


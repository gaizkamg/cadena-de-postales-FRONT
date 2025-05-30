<template>
  <div class="admin-dashboard">
    <h2>Panel de Administración</h2>

    <form @submit.prevent>
      <label for="centro">Centro:</label>
      <select id="centro" v-model="selectedCentro" @change="resetFiltros">
        <option value="">-- Selecciona un centro --</option>
        <option v-for="centro in centros" :key="centro" :value="centro">{{ centro }}</option>
      </select>

      <label for="sector">Sector:</label>
      <select id="sector" v-model="selectedSector" :disabled="!selectedCentro" @change="resetPagina">
        <option value="">-- Selecciona un sector --</option>
        <option v-for="sector in sectoresFiltrados" :key="sector" :value="sector">{{ sector }}</option>
      </select>

      <label for="busqueda">Buscar usuario:</label>
      <input 
        id="busqueda" 
        type="text" 
        v-model="busqueda" 
        placeholder="Nombre o Apellido" 
        @input="resetPagina"
      />

      <button type="button" @click="resetFiltros" class="btn-reset">Resetear filtros</button>
    </form>

    <div class="tabla-usuarios">
      <h3>Usuarios 
        <span v-if="selectedCentro">- {{ selectedCentro }}</span> 
        <span v-if="selectedSector">/ {{ selectedSector }}</span>
      </h3>

      <table>
        <thead>
          <tr>
            <th>Seleccionar</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Centro</th>
            <th>Refuerzo lingüístico</th>
            <th>Intereses</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="usuariosPaginados.length === 0">
            <td colspan="7" style="text-align:center; font-style: italic; color: #666;">
              No hay usuarios que mostrar.
            </td>
          </tr>
          <tr v-for="usuario in usuariosPaginados" :key="usuario.id">
            <td>
              <input 
                type="checkbox" 
                :value="usuario.id" 
                v-model="usuariosSeleccionados"
              />
            </td>
            <td>{{ usuario.nombre }}</td>
            <td>{{ usuario.apellido }}</td>
            <td>{{ usuario.centro }}</td>
            <td>{{ usuario.refuerzo }}</td>
            <td>{{ usuario.intereses }}</td>
            <td>
              <button @click="verUsuario(usuario)">Ver</button>
              <button @click="editarUsuario(usuario)">Editar</button>
              <button @click="eliminarUsuario(usuario.id)"class="btn-eliminar">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Paginación simple -->
      <div class="paginacion" v-if="totalPaginas > 1">
        <button @click="paginaActual--" :disabled="paginaActual === 1">Anterior</button>
        <span>Página {{ paginaActual }} de {{ totalPaginas }}</span>
        <button @click="paginaActual++" :disabled="paginaActual === totalPaginas">Siguiente</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

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

const usuarios = ref([])
const usuariosSeleccionados = ref([])

const selectedCentro = ref('')
const selectedSector = ref('')
const busqueda = ref('')
const paginaActual = ref(1)
const itemsPorPagina = 3

const sectoresFiltrados = computed(() => {
  return selectedCentro.value ? sectoresPorCentro[selectedCentro.value] || [] : []
})

const usuariosFiltrados = computed(() => {
  return usuarios.value.filter(u => {
    const centroMatch = selectedCentro.value ? u.centro === selectedCentro.value : true
    const sectorMatch = selectedSector.value ? u.sector === selectedSector.value : true
    const busquedaMatch = busqueda.value
      ? (u.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) || u.apellido.toLowerCase().includes(busqueda.value.toLowerCase()))
      : true
    return centroMatch && sectorMatch && busquedaMatch
  })
})

const totalPaginas = computed(() => Math.ceil(usuariosFiltrados.value.length / itemsPorPagina))

const usuariosPaginados = computed(() => {
  const start = (paginaActual.value - 1) * itemsPorPagina
  return usuariosFiltrados.value.slice(start, start + itemsPorPagina)
})

const resetFiltros = () => {
  selectedCentro.value = ''
  selectedSector.value = ''
  busqueda.value = ''
  usuariosSeleccionados.value = []
  paginaActual.value = 1
}

const resetPagina = () => {
  paginaActual.value = 1
}

function verUsuario(usuario) {
  alert(`Ver usuario: ${usuario.nombre} ${usuario.apellido}`)
}

function editarUsuario(usuario) {
  alert(`Editar usuario: ${usuario.nombre} ${usuario.apellido}`)
}

function eliminarUsuario(id) {
  const confirmado = confirm('¿Estás seguro de eliminar este usuario?')
  if (confirmado) {
    const idx = usuarios.value.findIndex(u => u.id === id)
    if (idx !== -1) usuarios.value.splice(idx, 1)
  }
}
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
  gap: 15px;
  margin-bottom: 30px;
  align-items: center;
}

label {
  font-weight: 600;
  margin-right: 8px;
}

select, input[type="text"] {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: #fff;
  color: #111827;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  min-width: 160px;
}

select:focus, input[type="text"]:focus {
  border-color: rgb(0, 141, 12);
  outline: none;
}

.btn-reset {
  padding: 8px 14px;
  background-color: rgb(0, 141, 12);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s ease;
}

.btn-reset:hover {
  background-color: rgb(0, 110, 9);
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
  vertical-align: middle;
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

button {
  margin-right: 6px;
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  background-color: rgb(0, 141, 12);
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: rgb(0, 110, 9);
}

.paginacion {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  gap: 12px;
  font-weight: 600;
}

.paginacion button {
  background-color: #e4e4e4;
  color: #333;
}

.paginacion button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
td:last-child {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.btn-eliminar {
  background-color: #e53935; /* rojo suave */
  color: white;
}

.btn-eliminar:hover {
  background-color: #c62828; /* rojo más oscuro al pasar el ratón */
}


/* Responsive design para móviles */
@media (max-width: 768px) {
  .admin-dashboard {
    padding: 20px;
  }

  form {
    flex-direction: column;
    gap: 10px;
    align-items: stretch;
  }

  label {
    margin-bottom: 4px;
  }

  select,
  input[type="text"] {
    min-width: unset;
    width: 100%;
  }

  .btn-reset {
    width: 100%;
    text-align: center;
  }

  td:last-child {
    flex-direction: column;
    gap: 6px;
  }

  button {
    width: 100%;
  }

  .paginacion {
    flex-direction: column;
    gap: 6px;
  }

  .paginacion button {
    width: 100%;
  }
}
</style>


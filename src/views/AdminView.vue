<template>
  <div class="admin-dashboard">
    <h2>Panel de Administración</h2>

    <form @submit.prevent>
      <label for="centro">Centro:</label>
      <select id="centro" v-model="selectedCentro">
        <option disabled value="">-- Selecciona un centro --</option>
        <option v-for="centro in centros" :key="centro.id" :value="centro.nombre">
          {{ centro.nombre }}
        </option>
      </select>

      <label for="sector">Sector:</label>
      <select id="sector" v-model="selectedSector" :disabled="!selectedCentro">
        <option disabled value="">-- Selecciona un sector --</option>
        <option v-for="sector in sectoresFiltrados" :key="sector.id" :value="sector.nombre">
          {{ sector.nombre }}
        </option>
      </select>
    </form>

    <!-- Tabla de usuarios -->
        <div v-if="usuariosFiltrados.length" class="tabla-usuarios">
        <h3>Usuarios - {{ selectedCentro }} / {{ selectedSector }}</h3>
        <table>
        <thead>
        <tr>
                <th>Seleccionar</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Centro</th>
                <th>Sector</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="usuario in usuariosFiltrados" :key="usuario.id">
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
                <td>{{ usuario.sector }}</td>
        </tr>
        </tbody>
        </table>
        
        </div>
        <div v-else-if="selectedCentro && selectedSector" class="info">
                No hay usuarios registrados en este centro y sector.
        </div>
        <p v-else class="info">Selecciona centro y sector para mostrar usuarios.</p>

        <!-- Botón para borrar usuarios -->
        <div class="acciones">
          <button
            @click="confirmarBorrarUsuarios" 
            type="button" 
            class="btn-borrar"
            >💣Borrar todos los usuarios💣
          </button>
          <button 
            @click="borrarUsuariosSeleccionados" 
            type="button" 
            class="btn-borrar-seleccionados"
          >
            Borrar {{ usuariosSeleccionados.length }} usuario(s) seleccionado(s)
          </button>
        </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import axios from 'axios'

const centros = ref([])
const sectoresFiltrados = ref([])

const usuarios = ref([])
const usuariosSeleccionados = ref([])

const selectedCentro = ref('')
const selectedSector = ref('')

const borrarUsuariosSeleccionados = async () => {
  const confirmacion = window.confirm(`¿Estás seguro de borrar ${usuariosSeleccionados.value.length} usuario(s)?`)
  
  if (!confirmacion) return

  for (const id of usuariosSeleccionados.value) {
    try {
      await axios.delete(`http://localhost:5000/api/usuarios/${id}`)
    } catch (error) {
      console.error(`Error al borrar usuario con ID ${id}:`, error)
    }
  }

  // Refrescar lista de usuarios
  usuarios.value = usuarios.value.filter(u => !usuariosSeleccionados.value.includes(u.id))
  usuariosSeleccionados.value = []

  alert('Usuarios seleccionados eliminados correctamente')
}

const confirmarBorrarUsuarios = () => {
  const confirmacion = window.confirm('¿Estás seguro? Esta acción eliminará a todos los usuarios que no sean Admin o Super Admin.')
  
  if (confirmacion) {
    borrarUsuariosNoAdmin()
  }
}

const borrarUsuariosNoAdmin = async () => {
  try {
    const { data } = await axios.delete('http://localhost:5000/api/usuarios/borrar_todo')
    alert(data.mensaje)

    // Opcional: recargar usuarios o limpiar tabla
    usuarios.value = usuarios.value.filter(u => u.rol_id === 1 || u.rol_id === 3)

  } catch (error) {
    console.error('Error al borrar usuarios:', error)
    alert('Hubo un error al intentar borrar los usuarios.')
  }
}

// ---- Computed -----
const usuariosFiltrados = computed(() => {
  if (!selectedCentro.value || !selectedSector.value) return []
  return usuarios.value.filter(
    u => u.centro === selectedCentro.value && u.sector === selectedSector.value
  )
})

// ---- Funciones ----
const cargarCentros = async () => {
  try {
    const { data } = await axios.get('http://localhost:5000/api/centros/lista')
    centros.value = data
  } catch (error) {
    console.error('Error al cargar centros:', error)
  }
}

watch(selectedCentro, () => {
  if (!selectedCentro.value) {
    sectoresFiltrados.value = []
    return
  }

  const centro = centros.value.find(c => c.nombre === selectedCentro.value)
  if (centro && centro.sectores) {
    // Si sectores es un array de strings
    sectoresFiltrados.value = centro.sectores
  } else {
    sectoresFiltrados.value = []
  }

  selectedSector.value = ''
})

const cargarUsuarios = async () => {
  if (!selectedCentro.value || !selectedSector.value) return

  try {
    const { data } = await axios.get('http://localhost:5000/api/usuarios/filtrar', {
      params: {
        centro: selectedCentro.value,
        sector: selectedSector.value
      }
    })

    // Mapeamos para tener centro y sector como strings
    usuarios.value = data.map(u => ({
      id: u.id,
      nombre: u.nombre,
      apellido: u.apellido,
      centro: u.centro_nombre,
      sector: u.sector_nombre
    }))

  } catch (error) {
    console.error('Error al cargar usuarios:', error)
  }
}

watch([selectedCentro, selectedSector], () => {
  cargarUsuarios()
})

// ---- Carga inicial ----
cargarCentros()
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
  color: black;
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

td{
  color:#111827 ;
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

.acciones {
  display: flex;
  justify-content: space-around;
}

.btn-borrar {
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 10px 16px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-borrar:hover {
  background-color: #dc2626;
}
</style>


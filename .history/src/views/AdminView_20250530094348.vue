<template>
  <div class="admin-container">
    <h1>Panel de Administración</h1>

    <div v-if="loading" class="loading">Cargando usuarios...</div>
    <div v-else>
      <table class="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in usuarios" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>
              <button @click="editarUsuario(user)">Editar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <UserEditModal
        v-if="usuarioSeleccionado"
        :usuario="usuarioSeleccionado"
        @close="usuarioSeleccionado = null"
        @guardar="guardarCambios"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'


const usuarios = ref([])
const loading = ref(true)
const usuarioSeleccionado = ref(null)

const cargarUsuarios = async () => {
  try {
    loading.value = true
    const token = sessionStorage.getItem('authToken')
    if (!token) throw new Error('No hay token de autenticación')

    const url = `${import.meta.env.VITE_API_BASE_URL}/api/users`
    const { data } = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    })

    usuarios.value = data
  } catch (error) {
    console.error('Error al cargar usuarios:', error)
    alert('Error al cargar la lista de usuarios')
  } finally {
    loading.value = false
  }
}

const editarUsuario = (user) => {
  usuarioSeleccionado.value = { ...user } // clonar para edición
}

const guardarCambios = async (usuarioEditado) => {
  try {
    const token = sessionStorage.getItem('authToken')
    if (!token) throw new Error('No hay token de autenticación')

    const url = `${import.meta.env.VITE_API_BASE_URL}/api/users/${usuarioEditado.id}`
    await axios.patch(url, usuarioEditado, {
      headers: { Authorization: `Bearer ${token}` }
    })

    // Actualizar lista localmente
    const index = usuarios.value.findIndex(u => u.id === usuarioEditado.id)
    if (index !== -1) {
      usuarios.value[index] = usuarioEditado
    }

    usuarioSeleccionado.value = null
    alert('Usuario actualizado correctamente')
  } catch (error) {
    console.error('Error actualizando usuario:', error)
    alert('Error al actualizar usuario')
  }
}

onMounted(() => {
  cargarUsuarios()
})
</script>

<style scoped>
.admin-container {
  padding: 20px;
  max-width: 900px;
  margin: auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.users-table th,
.users-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.users-table th {
  background-color: #f4f4f4;
}

.loading {
  font-size: 1.2rem;
  font-weight: 500;
}
</style>

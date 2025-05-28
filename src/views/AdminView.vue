<template>
  <div class="admin-container">
    <h1>{{ $t('admin-titulo') }}</h1>
    <div>
      <h2>{{ $t('admin-gestion') }}</h2>
      <ul>
        <li v-for="usuario in usuarios" :key="usuario.id">
          {{ usuario.nombre }} {{ usuario.apellido }}
          <button @click="editarUsuario(usuario.id)">{{ $t('admin-editar') }}</button>
        </li>
      </ul>
    </div>
    <div>
      <h2>{{ $t('admin-emparejamientos') }}</h2>
      <button @click="generarEmparejamientos">{{ $t('admin-generar') }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/useApi.js'

const { fetchUsers, patchUser } = useApi()

const usuarios = ref([])

const cargarUsuarios = async () => {
  try {
    usuarios.value = await fetchUsers()
  } catch (error) {
    console.error('Error cargando usuarios:', error)
  }
}

const editarUsuario = async (userId) => {
  const nuevosDatos = { nombre: 'Nuevo Nombre' } // Ejemplo de datos
  try {
    await patchUser(userId, nuevosDatos)
    cargarUsuarios() // Recargar usuarios después de editar
  } catch (error) {
    console.error('Error editando usuario:', error)
  }
}

const generarEmparejamientos = () => {
  console.log('Generando emparejamientos...')
  // Lógica para generar emparejamientos
}

onMounted(() => {
  cargarUsuarios()
})
</script>

<style scoped>
.admin-container {
  padding: 20px;
}
</style>
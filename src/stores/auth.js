import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApi } from '@/composables/useApi.js'

// defineStore crea un "almacén" como cajón de datos global
export const useAuthStore = defineStore('auth', () => {

  const user = ref(null)
  const isAuthenticated = ref(false)
  const role = ref(null) //Alejandro

  // Cargar el estado del usuario desde sessionStorage
  const storedUser = sessionStorage.getItem('user')
  const storedToken = sessionStorage.getItem('token') //Alejandro

  if (storedUser && storedToken /*Alejandro*/) {
    try {
      const parsedUser = JSON.parse(storedUser)
      if (parsedUser && parsedUser.id) {
        user.value = parsedUser
        isAuthenticated.value = true
        role.value = parsedUser.rol || 'usuario' /*Alejandro*/
      } else {
        console.error('El usuario almacenado no tiene un ID válido:', parsedUser)
      }
    } catch (error) {
      console.error('Error al parsear el usuario almacenado:', error)
    }
  }

  // Función para login con JWT
  async function login(email, password) {
    try {
      const { postData } = useApi() // Usamos el composable // fetchData -> postData /*Alejandro*/


      // const response = await fetchData(`http://localhost:3000/users?email=${email}`)
      const response = await postData('htt://localhost:5000/login', {
        email,
        password
      })
      const userData = response.data.usuario
      // const userData = response.data[0]
      const token = response.data.token

      if (userData && token) {
      // if (userData && userData.password === password) {
        user.value = userData
        role.value = userData.rol || 'usuario'
        isAuthenticated.value = true
        sessionStorage.setItem('user', JSON.stringify(userData))
        sessionStorage.setItem('token', token)
        return true
      }
      return false
    } catch (error) {
      console.error('Error de login:', error)
      return false
    }
  }

  // Función para registro
  async function register(userData) {
    try {
      const { postData } = useApi()

      // Enviar datos al endpoint de registro en Flask
      const response = await postData(
        'http://localhost:5000/register', // Asegurarnos de que esta ruta es correcta
        {
          nombre: userData.nombre,
          apellido: userData.apellido || '',
          email: userData.email,
          contrasena: userData.contrasena,
          rol_id: userData.rol_id || null,
          centro_id: userData.centro_id || null,
          sector_id: userData.sector_id || null,
          refuerzo_linguistico: userData.refuerzo_linguistico || false,
          penascal_rol: userData.penascal_rol || '',
          fecha_alta: userData.fecha_alta || null
        }
      )

      // Si el backend devuelve éxito
      if (response.status === 201) {
        const newUser = {
          id: response.data.usuario.id,
          nombre: response.data.usuario.nombre,
          apellido: response.data.usuario.apellido,
          email: response.data.usuario.email,
          rol: response.data.usuario.rol,
          token: response.data.token
        }

        user.value = newUser
        isAuthenticated.value = true
        sessionStorage.setItem('user', JSON.stringify(newUser))
        sessionStorage.setItem('token', response.data.token)

        return true
      }

      return false

    } catch (error) {
      console.error('Error de registro:', error.response?.data || error.message)
      return false
    }
  }

  /*async function register(name, email, password) {
    try {
      const { fetchData, postData } = useApi()
      const response = await fetchData(`http://localhost:3000/users?email=${email}`)
      if (response.data.length > 0) {
        throw new Error('El usuario ya existe')
      }

      const newUser = { name, email, password }
      await postData('http://localhost:3000/users', newUser)
      user.value = newUser
      isAuthenticated.value = true
      sessionStorage.setItem('user', JSON.stringify(newUser))
      return true
    } catch (error) {
      console.error('Error de registro:', error)
      return false
    }
  }*/

  // Función para actualizar perfil
  async function updateProfile(updatedUser) {
    try {
      const { putData } = useApi()
      const response = await putData(`http://localhost:3000/users/${updatedUser.id}`, updatedUser)
      user.value = response.data
      sessionStorage.setItem('user', JSON.stringify(response.data))
      return true
    } catch (error) {
      console.error('Error al actualizar el perfil:', error)
      return false
    }
  }

  function logout() {
    user.value = null
    isAuthenticated.value = false
    sessionStorage.removeItem('user')
  }

  // Exponemos lo que queremos que otros usen
  return { user, isAuthenticated, login, register, updateProfile, logout }
})

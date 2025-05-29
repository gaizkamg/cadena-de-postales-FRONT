import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApi } from '@/composables/useApi.js'

// defineStore crea un "almacén" como cajón de datos global
export const useAuthStore = defineStore('auth', () => {

  const user = ref(null)
  const isAuthenticated = ref(false)
  const role = ref(null) //Alejandro

  // Cargar el estado del usuario desde sessionStorage
  const storedUser = sessionStorage.getItem('user');
  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser && parsedUser.rol_id) { // Asegurar que rol_id esté presente
        user.value = parsedUser;
        isAuthenticated.value = true;
      } else {
        console.error('El usuario almacenado no tiene un rol válido:', parsedUser);
      }
    } catch (error) {
      console.error('Error al parsear el usuario almacenado:', error);
    }
  }

  // Función para login con JWT
  async function login(email, password) {
    try {
      const { postData } = useApi();

      const response = await postData('/api/auth/login', { email, contrasena: password }); // Cambiar a POST para el login
      console.log('Datos de usuario:', response.data); // Agregar un console.log para inspeccionar los datos
      const userData = {
        ...response.data,
        rol_id: response.data.rol, // Mapear "rol" a "rol_id"
      };

      if (userData) {
        user.value = userData;
        isAuthenticated.value = true;
        sessionStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error de login:', error);
      return false;
    }
  }

  // Función para registro
  async function register(name, email, password) {
    try {
      const { fetchData, postData } = useApi();
      const response = await fetchData(`/api/usuarios?email=${email}`); // Ajustar al endpoint correcto
      if (response.data.length > 0) {
        throw new Error('El usuario ya existe');
      }

      const newUser = { name, email, password };
      await postData('/api/usuarios', newUser); // Ajustar al endpoint correcto
      user.value = newUser;
      isAuthenticated.value = true;
      sessionStorage.setItem('user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Error de registro:', error);
      return false;
    }
  }

  // Función para actualizar perfil
  async function updateProfile(updatedUser) {
    try {
      const { putData } = useApi();
      const response = await putData(`/api/usuarios/${updatedUser.id}`, updatedUser); // Ajustar al endpoint correcto
      user.value = response.data;
      sessionStorage.setItem('user', JSON.stringify(response.data));
      return true;
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      return false;
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

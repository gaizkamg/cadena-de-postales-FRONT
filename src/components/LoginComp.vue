<template>
  <div class="login-container">
    <h1>Iniciar Sesión</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Correo Electrónico</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Contraseña</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" @click="console.log('Botón de login clicado')">Iniciar Sesión</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.js'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref(null)
const emit = defineEmits(['login-success'])

const handleLogin = async () => {
  console.log('handleLogin ejecutado');
  try {
    const success = await authStore.login(email.value, password.value)
    if (success) {
      emit('login-success')
      const user = authStore.user
      if (user && user.rol_id === 1) { // Cambiar rol a rol_id
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
    } else {
      error.value = 'Credenciales incorrectas o error en el servidor. Inténtalo de nuevo.'
    }
  } catch (err) {
    console.error('Error durante el login:', err)
    error.value = 'Credenciales incorrectas o error en el servidor. Inténtalo de nuevo.'
  }
}
</script>

<style scoped>
.login-container {
color: black;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

form div {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>

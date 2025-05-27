<template>
  <header class="navbar">
    <div class="logo"><a href="/">Cadena de Postales</a></div>
    <nav class="menu">
      <a href="/">Home</a>
      <a href="/info">Cómo funciona</a>
      <template v-if="isAuthenticated">
        <template v-if="user && user.rol_id === 1">
          <a href="/admin">Admin</a>
        </template>
        <template v-else>
          <a href="/dashboard">Dashboard</a>
        </template>
        <button class="login-btn" @click="handleLogout">Logout</button>
      </template>
      <template v-else>
        <button class="registro-btn" @click="openRegister">Registro</button>
        <button class="login-btn" @click="openLogin">Login</button>
      </template>
    </nav>

    <!-- Register Modal -->
    <div v-if="showRegister" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModals">&times;</span>
        <UserFormView :modo="'registro'" />
      </div>
    </div>

    <!-- Login Modal -->
    <div v-if="showLogin" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModals">&times;</span>
        <LoginComp @login-success="closeModals" />
        <!-- Switch to Registro -->
        <p class="switch-text">
          ¿No tienes cuenta?
          <a href="#" @click.prevent="switchToRegister">Registro</a>
        </p>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import LoginComp from '@/components/LoginComp.vue';
import UserFormView from '@/views/UserFormView.vue';

const showRegister = ref(false)
const showLogin = ref(false)
const authStore = useAuthStore()

const isAuthenticated = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)

function openRegister() {
  showRegister.value = true
  showLogin.value = false
}
function openLogin() {
  showLogin.value = true
  showRegister.value = false
}
function closeModals() {
  showLogin.value = false
  showRegister.value = false
}
function switchToLogin() {
  showRegister.value = false
  showLogin.value = true
}
function switchToRegister() {
  showLogin.value = false
  showRegister.value = true
}

function handleLogout() {
  authStore.logout()
  // Opcional: recarga la página o redirige a home
  window.location.href = '/'
}
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0f4d03;
  padding: 15px 30px;
  color: white;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s;
}

.logo:hover {
  color: #fd7e14;
}

.menu {
  display: flex;
  align-items: center;
  gap: 15px;
  padding-right: 40px;
}

.menu a {
  color: white;
  text-decoration: none;
  font-size: 16px;
}

.registro-btn,
.login-btn {
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  font-weight: 600;
}

.registro-btn {
  background-color: #337442;
  color: white;
  border-color: #28a745;
}

.registro-btn:hover {
  background-color: transparent;
  color: #fd7e14;
  border-color: #fd7e14;
}

.login-btn {
  background-color: #fd7e14;
  color: white;
  border-color: #fd7e14;
}

.login-btn:hover {
  background-color: transparent;
  color: #337442;
  border-color: #28a745;
}

/* Modal Base */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto; /* Permitir desplazamiento si el contenido es grande */
  padding: 20px; /* Espaciado para evitar que el contenido toque los bordes */
}

.modal-content {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Dos columnas */
  gap: 20px; /* Espaciado entre columnas */
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 800px; /* Ancho máximo más amplio */
  max-height: 90vh; /* Limitar la altura máxima */
  overflow-y: auto; /* Scroll interno si el contenido es demasiado grande */
  text-align: left;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-content label {
  grid-column: span 2; /* Asegura que los labels ocupen ambas columnas */
}

.modal-content input,
.modal-content select {
  grid-column: span 1; /* Campos ocupan una columna */
}

.modal-content button {
  grid-column: span 2; /* Botón ocupa ambas columnas */
  justify-self: center;
}

/* Close Button */
.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
.switch-text {
  margin-top: 25px;
  font-size: 14px;
  color: #555;
  text-align: center;
}

.switch-text a {
  color: #fd7e14;
  cursor: pointer;
  text-decoration: underline;
  margin-left: 5px;
  transition: color 0.3s ease;
}

.switch-text a:hover {
  color: #337442;
}

/* Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>

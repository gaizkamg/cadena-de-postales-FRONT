<template>
  <header class="navbar">
    <div class="logo"><a href="/">Cadena de Postales</a></div>
    <nav class="menu">
      <a href="/">Home</a>
      <a href="/info">Cómo funciona</a>
      <button class="registro-btn" @click="openRegister">Registro</button>
      <button class="login-btn" @click="openLogin">Login</button>
    </nav>

    <!-- Register Modal -->
    <div v-if="showRegister" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModals">&times;</span>
        <form @submit.prevent="submitForm">
        <label for="nombre">Nombre</label>
        <input id="nombre" v-model="form.nombre" type="text" placeholder="Nombre" />

        <label for="apellido">Apellido</label>
        <input id="apellido" v-model="form.apellido" type="text" placeholder="Apellido" />

        <label for="dedicacion">¿A qué te dedicas en Peñascal Kooperatiba?</label>
        <select id="dedicacion" v-model="form.dedicacion">
          <option disabled value="">Selecciona una opción</option>
          <option>Estudio</option>
          <option>Trabajo</option>
        </select>

        <label for="centro">¿En qué centro formativo sueles estar?</label>
        <select id="centro" v-model="form.centro">
          <option disabled value="">Selecciona un centro</option>
          <option>Boluetabarri / Modo - Comercio</option>
          <option>Boluetabarri / Informática</option>
          <option>Boluetabarri / Climatización - Fontanería</option>
          <option>Boluetabarri / Madera</option>
          <option>Boluetabarri / Hostalería</option>
          <option>Boluetabarri / Administración</option>
          <option>Boluetabarri / Complementaria</option>
          <option>Montaño / Hostalería</option>
          <option>Montaño / Construcción - Electricidad</option>
          <option>Belategi / Metal</option>
          <option>Tolosa</option>
          <option>Sarrikue</option>
          <option>Markina</option>
          <option>Errenteria</option>
          <option>Intervención Social Bizkaia</option>
          <option>EPA Gipuzkoa</option>
          <option>EPA Bizkaia</option>
        </select>

        <label for="linguistico">¿Perteneces a un grupo de refuerzo lingüístico?</label>
        <select id="linguistico" v-model="form.linguistico">
          <option disabled value="">Selecciona una opción</option>
          <option>Sí</option>
          <option>No</option>
        </select>

        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="email" placeholder="Email" required />

        <label for="password">Password</label>
        <input id="password" v-model="form.password" type="password" placeholder="Password" required />

        <button type="submit" class="registro-btn">Registrar</button>
      </form>
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
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import LoginComp from '@/components/LoginComp.vue';

const showRegister = ref(false)
const showLogin = ref(false)
const authStore = useAuthStore()

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

const form = ref({
  nombre: '',
  apellido: '',
  dedicacion: '',
  centro: '',
  linguistico: '',
  email: '',
  password: ''
})

const submitForm = async () => {
  // Aquí deberías llamar a tu store o API para registrar
  await authStore.register(form.value)
  closeModals()
  // Limpia el formulario
  form.value = {
    nombre: '',
    apellido: '',
    dedicacion: '',
    centro: '',
    linguistico: '',
    email: '',
    password: ''
  }
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
  z-index: 2000;
}

.modal-content {
  background: white;
  padding: 40px 30px; /* pehle 30px tha, ab zyada padding */
  border-radius: 12px;
  width: 400px; /* pehle 320px tha */
  text-align: left; /* center se left aligned */
  position: relative;
  animation: fadeIn 0.3s ease-in-out;
}

.modal-content label {
  margin-top: 20px;
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.modal-content h2{
  color: black;
}


.modal-content input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 6px;
  border: 1px solid #ccc;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.modal-content input:hover {
  border-color: #28a745;
}

.modal-content input:focus {
  border-color: #fd7e14;
  box-shadow: 0 0 5px #fd7e14;
  outline: none;
}
.modal-content select {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: white;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
select {
  max-height: 200px;   /* dropdown ka max height */
  overflow-y: auto;    /* scroll vertical agar zyada items hon */
}

.modal-content select:hover {
  border-color: #28a745;
}

.modal-content select:focus {
  border-color: #fd7e14;
  box-shadow: 0 0 5px #fd7e14;
  outline: none;
}

/* Close Button */
.close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 26px;
  font-weight: bold;
  cursor: pointer;
  color: #333;
  user-select: none;
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

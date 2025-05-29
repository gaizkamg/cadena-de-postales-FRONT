<template>
  <div class="register-container">
    <UserFormComp />
  </div>
</template>

<script setup>
import UserFormComp from '@/components/UserFormComp.vue';
</script>


<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-box {
  padding: 40px 30px;
  border-radius: 12px;
  width: 60%;
  text-align: left;
  animation: fadeIn 0.3s ease-in-out;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
}
.form-column {
  display: flex;
  flex-direction: column;
}

.form-box label {
  margin-top: 20px;
  font-size: 15px;
  font-weight: 600;
  color: #333;
  display: block;
}

.form-box input,
.form-box select {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: white;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-box input:disabled,
.form-box select:disabled {
  background-color: #e9ecef;
  cursor: not-allowed;
}

.form-box input:hover:enabled,
.form-box select:hover:enabled {
  border-color: #28a745;
}

.form-box input:focus:enabled,
.form-box select:focus:enabled {
  border-color: #fd7e14;
  box-shadow: 0 0 5px #fd7e14;
  outline: none;
}

.botones {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.editar-btn,
.guardar-btn {
  background-color: #fd7e14;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.editar-btn:hover,
.guardar-btn:hover {
  background-color: #e95f00;
}
</style>

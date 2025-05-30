<template>
  <footer class="footer">
    <img src="@/assets/img/logopenascal.png" alt="Logo Cadena de Postales" class="logo" />
    <p>&copy; 2025 SixCoders.  {{ $t('footer-rights')}}.</p>
     <select @change="changeLanguage($event)">
            <option>es</option>
            <option>en</option>
     </select>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const changeLanguage = (event) => {
  locale.value = event.target.value;
};

</script>

<style scoped>
.footer {
  width: 100%;
  background-color: #0f4d03;
  padding: 1rem;
  color: #fcfdfc;
  text-align: center;
  box-sizing: border-box;
}
.logo {
  width: 80px;
  height: auto;
  margin-bottom: 0.5rem;
}
select{
  background-color: #337442;
  color: white;
  border-color: #28a745;
  width: 2.5rem;
  border-radius: 2rem;
  position: relative;
  bottom: 2rem;
  left: 45%;
  z-index: 1005;
}
</style>
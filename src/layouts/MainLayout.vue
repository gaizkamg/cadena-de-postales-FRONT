<template>
    <NavbarComp />
    <div>
      <router-view />
    </div>
    <FooterComp />
</template>

<script setup>
import NavbarComp from '@/components/NavbarComp.vue'
import FooterComp from '@/components/FooterComp.vue'
</script>
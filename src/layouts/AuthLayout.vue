<template>

    <HeaderComp />
    <div>
      <router-view />
    </div>
    <FooterComp />

</template>

<script>
export default {
  name: 'AuthLayout',
}
</script>
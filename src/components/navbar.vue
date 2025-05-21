<template>
  <header class="navbar">
    <div class="logo">MyLogo</div>
    <nav class="menu">
      <a href="#">Home</a>
      <button class="registro-btn">Registro</button>
      <button class="login-btn">Login</button>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #111;
  padding: 15px 30px;
  color: white;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.menu {
  display: flex;
  align-items: center;
  gap: 15px;
}

.menu a {
  color: white;
  text-decoration: none;
  font-size: 16px;
}

.registro-btn,
.login-btn {
  background-color: #ff5555;
  border: none;
  color: white;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
}

.registro-btn:hover,
.login-btn:hover {
  background-color: #ff7777;
}
</style>

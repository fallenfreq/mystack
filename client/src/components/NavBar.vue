<script lang="ts">
//
</script>
<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/login">Login</RouterLink>
    <RouterLink to="/vuestic-demo">Vuestic</RouterLink>
    <RouterLink to="/primevue-demo">Primevue</RouterLink>
    <RouterLink to="/admin" v-if="$zitadel.hasRole('admin')">Admin</RouterLink>
    <a href="#" @click.prevent="$zitadel.oidcAuth.signOut" v-if="$zitadel.oidcAuth.isAuthenticated"
      >Signout
    </a>
  </nav>
</template>
<style scoped lang="css">
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

<script setup lang="ts">
import index from './layouts/index.vue'
</script>

<template>
<n-loading-bar-provider>
  <n-message-provider>
    <n-notification-provider>
      <n-dialog-provider>
        <index></index>
      </n-dialog-provider>
    </n-notification-provider>
  </n-message-provider>
</n-loading-bar-provider>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

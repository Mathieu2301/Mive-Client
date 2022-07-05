<script setup lang="ts">
import Map from './components/Map.vue'
</script>

<template>
  <Map/>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Questrial&display=swap');

#app {
  font-family: Questrial, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  fill: #2c3e50;
  text-align: center;
}

html, body {
  margin: 0;
  height: 100%;
}

body * {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  -webkit-appearance: none;
}

.ol-uncollapsible { display: none }
</style>

<template>
  <div id="app">
    <DrawingBoard />
  </div>
</template>

<script>
import DrawingBoard from './components/DrawingBoard.vue'

export default {
  name: 'App',
  components: {
    DrawingBoard
  }
}
</script>

<style>
body{
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #2c3e50;
}
</style>

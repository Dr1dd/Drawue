<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>

import Header from './components/Header'
export default {
  name: 'App',
  components: {
    Header,
  },
}
</script>

<style lang="scss">
$module-theme: #86a1b8;
@use './sass/transitions/transitions';
body{
  margin: 0;
  background: #f0f8ff;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #f0f8ff;
}
.btn{
  cursor: pointer;
  padding: 8px;
  border-radius: 23px;
  background: #86a1b8;
  color: white;
  font-size: 16px;
  font-weight: 700;
  a{
    text-decoration: none;
    color: white;
  }
}
input{
  margin: 10px 0;
  padding: 8px;
  font-size: 20px;
  border: none;
  border-bottom: 3px solid $module-theme;
  transition: 0.25s all;
  &:focus{
    outline: none;
    border: none;
    border-bottom: 3px solid #5f7282;
    box-shadow: 0px 9px 12px -13px rgb(65 74 83);
  }
  &::placeholder{
    color: #a7a5a5;
  }
}
textarea{
  margin: 10px 0;
  padding: 8px;
  font-size: 20px;
  resize: none;
  border: 3px solid $module-theme;
  transition: 0.25s all;
  &:focus{
    outline: none;
    border: none;
    border: 3px solid #5f7282;
    box-shadow: 0px 9px 12px -13px rgb(65 74 83);
  }
  &::placeholder{
    color: #a7a5a5;
  }
}
.error{
  font-size: 13px;
  text-align: left;
  padding-left: 10px;
  color: #d31818;
}
  .fade-enter-active, .fade-leave-active {
      transition: all .4s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
  }
  .fader-enter{
      transform: translateX(-5px);
  }
  .fade-leave-to{
      transform: translateX(5px);
  }

</style>

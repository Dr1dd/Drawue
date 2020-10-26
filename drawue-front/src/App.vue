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
    Header
  },
  beforeCreate(){
    this.$store.dispatch('UpdateLoginState');
  },

}
</script>

<style lang="scss">
body{
  margin: 0;
  background: #2c3e50;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #2c3e50;
}
.btn{
  cursor: pointer;
  padding: 8px;
  border-radius: 23px;
  background: #717171;
  color: white;
  font-size: 16px;
  font-weight: 700;
  border: 1px solid #9c9b9b;
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
  border-bottom: 3px solid #9c9b9b;
  transition: 0.25s all;
  &:focus{
    outline: none;
    border: none;
    border-bottom: 3px solid #4d4d4d;
    box-shadow: 0px 9px 12px -13px rgba(0,0,0,0.75)
  }
}
.error{
  font-size: 13px;
  text-align: left;
  padding-left: 10px;
  color: #d31818;
}
</style>

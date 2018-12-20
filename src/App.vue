<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.jpg">-->
    <Page />
  </div>
</template>

<script>
import Page from './components/Page.vue'

export default {
  name: 'app',
  components: {
    Page
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /**margin-top: 60px;*/

  background-image: url("./assets/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 50vh;
}
</style>

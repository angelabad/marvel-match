<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.jpg">-->
    <Index />
  </div>
</template>

<script>
import Index from './components/Index.vue'

export default {
  name: 'app',
  components: {
    Index
  }
}
</script>

<style>
#app {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif; */
  /* margin-top: 60px; */
  font: DINNextW01-CondensedMed, Trebuchet MS, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
p.aa--marvel-title-red {
  color: #eb2328;
  font-style: normal;
  font-variant-ligatures: normal;
  font-variant-caps: normal;
  font-variant-numeric: normal;
  font-variant-east-asian: normal;
  font-weight: 500;
  font-stretch: normal;
  font-size: 40px;
  line-height: 1;
  font-family: DINNextW01-CondensedMed, "Trebuchet MS", Helvetica, Arial,
    sans-serif;
}
p.aa--marvel-content-black {
  font-style: normal;
  font-variant-ligatures: normal;
  font-variant-caps: normal;
  font-variant-numeric: normal;
  font-variant-east-asian: normal;
  font-weight: normal;
  font-stretch: normal;
  font-size: 14px;
  line-height: 22px;
  font-family: "Open Sans", "Trebuchet MS", Helvetica, Arial, sans-serif;
}
</style>

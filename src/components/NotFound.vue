<template>
  <div id="Index">

    <section class="hero is-danger is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">404</h1>
          <h2 class="subtitle">Not Found</h2>
          <p>
            <router-link to="/">Back to home</router-link>
          </p>
        </div>
      </div>
      <mm-footer />
    </section>
  </div>
</template>

<script>
import MmFooter from './ui/MmFooter.vue'

export default {
  name: 'Index',
  components: {
    MmFooter
  }
}
</script>

<style scoped>
.hero.is-danger {
  background: linear-gradient(rgba(0, 0, 0, 0.5) rgba(0, 0, 0, 0.5)),
    url("../assets/background-1.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.title {
  font-family: DIN Next W01 Regular, Trebuchet MS, Helvetica, Arial, sans-serif;
  font-weight: 900;
  font-size: 165px;
  line-height: 1;
  opacity: 0.6;
}
.subtitle {
  font-weight: 700;
  font-size: 34px;
  margin-bottom: 6px;
  opacity: 0.9;
}
ad {
    text-transform: uppercase;
}
a {
  display: inline-block;
  font-weight: 300;
  font-size: 12px;
  text-transform: uppercase;
  border: 1px solid #cdd4de;
  padding: 8px 14px;
  border-radius: 4px;
  opacity: 0.4;
  cursor: pointer;
}
</style>

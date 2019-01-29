<template>
  <div id="Index">

    <section class="hero is-danger is-fullheight">
      <div class="hero-head">
        <nav class="navbar">
          <div class="container">
            <div class="navbar-brand">
              <a class="navbar-item" href="/">
                <img src="http://bulma.io/images/bulma-type-white.png" alt="Logo">
              </a>
            </div>
          </div>
        </nav>
      </div>

      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-6 offset-3">
            <h1 class="title">
              MarvelMatch
            </h1>
          </div>
        </div>
      </div>

    </section>

<!--
    <mm-header />
    <section class="container">
      <div class="columns is-centered">
        <div class="column is-one-third">
          <SearchForm
            ref="form1"
            v-on:sendHero="hero => {this.hero1Id = hero; this.$refs.form2.$refs.autocomplete.focus()}"
          />
        </div>
        <div class="column is-one-fifth has-vertically-aligned-content">
          <transition name="bounce">
            <div v-if="hero1Id && hero2Id">
              <button
                autofocus
                class="button aa--marvel-button"
                @click="callMatch(hero1Id, hero2Id)"
              >Match</button>
            </div>
          </transition>
        </div>
        <div class="column is-one-third">
          <SearchForm
            ref="form2"
            v-on:sendHero="hero => this.hero2Id = hero"
          />
        </div>
      </div>
      <div
        class="container"
        v-if="descriptionVisible"
      >
        <div class="notification is-size-3 has-text-danger has-text-weight-bold">
          See all the places your favorite Marvel Superheroes appear together.
          Enter two Superheroes to see everywhere they appear together.
        </div>
      </div>
    </section>
    <mm-footer
      absolute=true
      v-if="descriptionVisible"
    />
-->

  </div>
</template>

<script>
import SearchForm from './SearchForm.vue'
import MmHeader from './ui/MmHeader.vue'
import MmFooter from './ui/MmFooter.vue'

export default {
  name: 'Index',
  components: {
    SearchForm,
    MmHeader,
    MmFooter
  },
  data: function () {
    return {
      searchResultsVisible: false,
      // This is modified in SearchForm
      descriptionVisible: true,
      hero1Id: null,
      hero2Id: null
    }
  },
  mounted: function () {
    this.$refs.form1.$refs.autocomplete.focus()
  },
  methods: {
    callMatch: function () {
      this.$router.replace({
        name: 'results',
        params: {
          hero1: this.hero1Id,
          hero2: this.hero2Id
        }
      })
    }
  }
}
</script>

<style scoped>
.hero.is-danger {
  background: linear-gradient(
    rgba(0, 0, 0, 0.5)
    rgba(0, 0, 0, 0.5)
  ), url('../assets/background-1.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.bounce-leave-active {
  transition: opacity 0.5s;
}
.bounce-leave-to {
  opacity: 0;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: none;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
.aa--marvel-button {
  height: 44px;
  background: #eb2328;
  position: relative;
  padding-left: 8px;
  padding-top: 4px;
  padding-bottom: 5px;
  line-height: 24px;
  display: inline-block;
  color: white;
  line-height: 16px;
  font-family: DIN Next W01 Regular, Trebuchet MS, Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-size: 14px;
  /*height: 16px;*/
  line-height: 18px;
  text-align: center;
  text-transform: uppercase;
  padding-top: 13px;
  padding-right: 13px;
  padding-bottom: 13px;
  padding-left: 13px;
}
.aa--marvel-button:before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  right: -14px;
  border-left: 15px solid #eb2328;
  border-bottom: 15px solid transparent;
  width: 0;
}
.aa--marvel-button:after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: -14px;
  border-right: 15px solid #eb2328;
  border-top: 15px solid transparent;
  width: 0;
}
.aa--marvel-button:focus {
  border: none !important;
}
</style>

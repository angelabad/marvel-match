<template>
  <div id="Index">

    <section class="hero is-danger is-fullheight">
      <div class="hero-head">
        <nav class="navbar">
          <div class="container">
            <div class="navbar-brand">
              <router-link
                :to="{ name: 'index' }"
                class="navbar-item"
              >
                <img
                  src="../assets/marvel_logo.png"
                  alt="Marvel Logo"
                >
              </router-link>
            </div>
          </div>
        </nav>
      </div>

      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-6 offset-3">
            <h1 class="title has-text-right">
              MarvelMatch
            </h1>
            <h2 class="subtitle has-text-right">
              See all the comics your favorite Marvel Superheroes appear together.
            </h2>
          </div>
          <div class="columns is-vcentered">
            <div class="column is-6 offset-3">
              <div class="box">
                <div class="field">
                  <SearchForm
                    ref="form1"
                    v-on:sendHero="hero => { this.hero1Id = hero; this.$refs.form2.$refs.autocomplete.focus() }"
                    v-on:clearParentHero="() => { hero1Id = null }"
                    :needsScroll=true
                  />
                </div>
                <div class="field">
                  <SearchForm
                    ref="form2"
                    v-on:sendHero="hero => { this.hero2Id = hero; this.$nextTick(() => this.$scrollTo('#matchbutton'))}"
                    v-on:clearParentHero="() => { hero2Id = null }"
                    :disabled="(hero1Id === null) ? true : false"
                  />
                </div>
              </div>
            </div>
            <div class="column is-2">
              <transition name="bounce">
                <div v-if="hero1Id && hero2Id">
                  <button
                    id="matchbutton"
                    autofocus
                    class="button aa--marvel-button"
                    @click="callMatch(hero1Id, hero2Id)"
                  >Match</button>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>

      <mm-footer />

    </section>
  </div>
</template>

<script>
import SearchForm from './SearchForm.vue'
import MmFooter from './ui/MmFooter.vue'

export default {
  name: 'Index',
  metaInfo: {
    title: 'MarvelMatch - Marvel Superheroes Comics Match',
    meta: [
      { name: 'description', content: 'See all the comics your favorite Marvel Superheroes appear together.' }
    ]
  },
  components: {
    SearchForm,
    MmFooter
  },
  data: function () {
    return {
      hero1Id: null,
      hero2Id: null
    }
  },
  mounted: function () {
    this.$nextTick(() => this.$refs.form1.$refs.autocomplete.focus())
  },
  methods: {
    callMatch: function () {
      this.$router.push({
        name: 'match',
        params: {
          hero1: this.hero1Id.id,
          hero2: this.hero2Id.id,
          page: 1
        }
      })
    }
  }
}
</script>

<style scoped>
.box {
  background-color: rgba(0, 0, 0, 0.4);
}
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
  font-weight: 700;
  font-size: 42px;
  line-height: 32px !important;
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

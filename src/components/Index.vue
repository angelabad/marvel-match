<template>
  <div id="Index">
    <section class="container">
      <div
        class="container"
        v-if="searchResultsVisible"
      >
        <SearchResults
          :hero1="hero1Id"
          :hero2="hero2Id"
        />
      </div>
    </section>

    <section class="container">
      <div
        class="columns is-centered"
        v-if="searchFormVisible"
      >
        <div class="column is-one-third">
          <SearchForm v-on:sendHero="hero => this.hero1Id = hero" />
        </div>
        <div class="column is-one-fifth has-vertically-aligned-content">
          <div v-if="hero1Id && hero2Id">
            <a
              class="button aa--marvel-button"
              @click="callMatch(hero1Id, hero2Id)"
            >Match</a>
          </div>
        </div>
        <div class="column is-one-third">
          <SearchForm v-on:sendHero="hero => this.hero2Id = hero" />
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.body-background {
  background-image: url("../assets/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 50vh;
  margin-top: 0px !important;
}
</style>

<style scoped>
.column.has-vertically-aligned-content {
  /*
  display: flex;
  flex-direction: column;
  justify-content: center;
  */
  margin-top: 60vh;
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
</style>

<script>
import SearchForm from './SearchForm.vue'
import SearchResults from './SearchResults.vue'

export default {
  name: 'Index',
  components: {
    SearchForm,
    SearchResults
  },
  data: function () {
    return {
      searchResultsVisible: false,
      searchFormVisible: true,
      hero1Id: null,
      hero2Id: null
    }
  },
  mounted: function () {
    // TODO: Añadir la clase con el background solo para esta pagian
    // TODO: Mejorar la forma de hacer esto
    // const el = document.body
    const el = document.getElementById('app')
    el.classList.add('body-background')
  },
  methods: {
    callMatch: function () {
      this.searchFormVisible = false
      this.searchResultsVisible = true
    }
  }
}
</script>

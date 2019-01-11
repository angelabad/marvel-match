<template>
  <div id="Index">

    <mm-header />

    <section class="container">
      <div class="columns is-centered">
        <div class="column is-one-third">
          <SearchForm ref="form1" v-on:sendHero="hero => {this.hero1Id = hero; this.$refs.form2.$refs.autocomplete.focus()}" />
        </div>
        <div class="column is-one-fifth has-vertically-aligned-content">
          <div v-if="hero1Id && hero2Id">
            <button
              autofocus
              class="button aa--marvel-button"
              @click="callMatch(hero1Id, hero2Id)"
            >Match</button>
          </div>
        </div>
        <div class="column is-one-third">
          <SearchForm ref="form2" v-on:sendHero="hero => this.hero2Id = hero" />
        </div>
      </div>
      <div class="container" v-show="descriptionVisible">
        <div class="notification is-size-3 has-text-danger has-text-weight-bold" >
          See all the places your favorite Marvel Superheroes appear together.
          <!-- Enter two Superheroes to see everywhere they appear together. -->
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import SearchForm from './SearchForm.vue'
import MmHeader from './ui/MmHeader.vue'

export default {
  name: 'Index',
  components: {
    SearchForm,
    MmHeader
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
    // TODO: Añadir la clase con el background solo para esta pagian
    // TODO: Mejorar la forma de hacer esto
    // const el = document.body
    const el = document.getElementById('app')
    el.classList.add('body-background')
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

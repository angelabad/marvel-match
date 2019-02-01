<template>
  <div id="SearchForm2">
      <b-autocomplete
        ref="autocomplete"
        placeholder="Start typing..."
        field="name"
        v-model="name"
        size="is-medium"
        :data="searchResults"
        :loading="isFetching"
        :keep-first="true"
        @keyup.native.down.stop="null"
        @keyup.native.up.stop="null"
        @keyup.native="handleSearch"
        @select="option => showHero(option.id)"
      >
        <template slot-scope="props">
          <div class="media">
            <div class="media-left">
              <img
                v-bind:src="props.option.thumbnail.path + '/standard_medium.' + props.option.thumbnail.extension | convertToHttps"
                width="32"
              >
            </div>
            <div class="media-content">{{ props.option.name }}</div>
          </div>
        </template>
      </b-autocomplete>

    <transition name="fade">
      <div v-if="hero">
        <div class="card">
          <div class="card-image">
            <figure class="image is-square">
              <img
                v-bind:src="hero.thumbnail.path + '/standard_fantastic.' + hero.thumbnail.extension | convertToHttps"
                :alt="hero.name"
              >
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4 aa--marvel-title-red">{{ hero.name }}</p>
              </div>
            </div>

            <p class="content aa--marvel-content-black">{{ hero.description | readMore }}</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
import debunce from 'debounce'

export default {
  name: 'SearchForm',
  data: function () {
    return {
      name: null,
      searchResults: [],
      hero: null,
      isFetching: false
    }
  },
  methods: {
    handleSearch: debunce(function () {
      this.isFetching = true

      // If empty input delete all and send null to Index
      if (!this.name.length) {
        this.$emit('sendHero', null)
        this.searchResults = []
        this.hero = null
        this.isFetching = false
        return 0
      } else {
        // TODO: El mensaje se elimina cuando tecleas por primera vez, si vuelves a vaciar los inputs no aparece otra vez
        this.$parent.descriptionVisible = false
      }
      axios
        .get(
          'https://gateway.marvel.com:443/v1/public/characters?apikey=***REMOVED***&orderBy=name&nameStartsWith=' +
          this.name
        )
        .then(response => (this.searchResults = response.data.data.results))
        .catch(error => console.log(error))
        .finally(() => (this.isFetching = false))
    }, 500),
    showHero: function (id) {
      this.searchResults = []
      axios
        .get(
          'https://gateway.marvel.com:443/v1/public/characters/' +
          id +
          '?apikey=***REMOVED***'
        )
        // TODO: Es raro coger el primer dato del array aqui...
        // (this.hero = response.data.data.results[0])
        .then(response => {
          this.hero = {
            id: response.data.data.results[0].id,
            name: response.data.data.results[0].name,
            description: response.data.data.results[0].description,
            thumbnail: response.data.data.results[0].thumbnail,
            comicsAvailable: response.data.data.results[0].comics.available
          }
        })
        .then(() => this.$emit('sendHero', this.hero))
        .catch(() => error => console.log(error))
    },
    splitHeroName: function (name) {
      var regExp = /([a-zA-Z0-9_]+ ?[a-zA-Z0-9_]+)( ?(\(([^)]+)\)))?/
      var matches = regExp.exec(name)
      return matches
    }
  }
}
</script>

<style>
.aa-autocomplete input:focus {
  /* box-shadow: 0 0 0 0.125em rgba(red, 0.25) !important; */
  box-shadow: none !important;
  border-color: #eb2328 !important;
}
</style>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

</style>

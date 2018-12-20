<template>
  <div id="Search">
    <b-field label="Find a Marvel Character">
      <b-autocomplete
        placeholder="Start typing..."
        field="name"
        v-model="name"
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
                v-bind:src="props.option.thumbnail.path + '.' + props.option.thumbnail.extension | convertToHttps"
                width="32"
              >
            </div>
            <div class="media-content">{{ props.option.name }}</div>
          </div>
        </template>
      </b-autocomplete>
    </b-field>

    <div v-if="hero">
      <div v-if="heroLoading">Loading...</div>

      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img
              v-bind:src="hero.thumbnail.path + '.' + hero.thumbnail.extension | convertToHttps"
              :alt="hero.name"
            >
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <!--
                    <div class="media-left">
                        <figure class="image is 48x48">
                            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                        </figure>
                    </div>
            -->
            <div class="media-content">
              <p class="title is-4">{{ hero.name }}</p>
              <!-- <p class="subtitle is-6">{{ subName }}</p> -->
            </div>
          </div>

          <div class="content">{{ hero.description | readMore }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#Search {
  background-color: white;
  padding: 20px;
  margin-top: 37vh;
  border-radius: 5px;
}
</style>

<script>
import axios from 'axios'
import debunce from 'debounce'

export default {
  name: 'Search',
  data: function () {
    return {
      name: null,
      searchResults: [],
      hero: null,
      heroLoading: false,
      isFetching: false
    }
  },
  methods: {
    handleSearch: debunce(function () {
      this.isFetching = true

      // If empty input delete all and send null to Page
      if (!this.name.length) {
        this.$emit('sendHero', null)
        this.searchResults = []
        this.hero = null
        this.isFetching = false
        return 0
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
      this.heroLoading = true

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
        .finally(() => (this.heroLoading = false))
    },
    splitHeroName: function (name) {
      var regExp = /([a-zA-Z0-9_]+ ?[a-zA-Z0-9_]+)( ?(\(([^)]+)\)))?/
      var matches = regExp.exec(name)
      return matches
    }
  }
}
</script>

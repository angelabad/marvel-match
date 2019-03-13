<template>
  <div id="SearchForm2">

    <div
      v-if="hero"
      class="notification"
    >
      <button
        @click="deleteHero"
        class="delete"
      ></button>
      <article class="media">

        <div class="media-left">
          <figure class="image is-64x64">
            <img
              v-bind:src="hero.thumbnail.path + '/standard_medium.' + hero.thumbnail.extension | convertToHttps"
              :alt="hero.name"
            >
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <p class="break-text">
              <strong>{{ hero.name }}</strong>
              <br>
              {{ hero.description }}
            </p>
          </div>
        </div>
      </article>
    </div>

    <b-autocomplete
      v-else
      class="aa-autocomplete"
      ref="autocomplete"
      id="autocomplete"
      placeholder="Start typing..."
      field="name"
      v-model="name"
      size="is-medium"
      :data="searchResults"
      :loading="isFetching"
      :keep-first="true"
      @typing="handleSearch"
      @focus="setScroll"
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

  </div>
</template>

<script>
import axios from 'axios'
import axiosRetry from 'axios-retry'
import debunce from 'debounce'
import utils from '@/common/utils'

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
  mounted: function () {
    // Set axios Retry 5 times if fetch fails
    axiosRetry(axios, { retries: 5 })
  },
  methods: {
    handleSearch: debunce(function () {
      // NOTE: When we are in portrait mobile scroll to the control when you type
      if (this.$mq === 'sm') {
        this.setScroll()
      }

      this.isFetching = true

      // If empty input delete all and send null to Index
      if (!this.name.length) {
        this.$emit('sendHero', null)
        this.searchResults = []
        this.hero = null
        this.isFetching = false
        return 0
      }
      axios
        .get(
          utils.getCharacterStartsWith(this.name)
        )
        .then(response => (this.searchResults = response.data.data.results))
        .catch(error => console.log(error))
        .finally(() => (this.isFetching = false))
    }, 500),
    showHero: function (id) {
      this.searchResults = []
      axios
        .get(
          utils.getCharacter(id)
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
    },
    deleteHero: function () {
      this.hero = null
      this.name = null
      this.$nextTick(() => this.$refs.autocomplete.focus())
      this.$emit('clearParentHero', null)
    },
    setScroll: function () {
      this.$scrollTo('#autocomplete')
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
p.break-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-height: 24px; /* fallback */
  max-height: 72px; /* fallback */
  -webkit-line-clamp: 3; /* number of lines to show */
  -webkit-box-orient: vertical;
}
.notification {
  background-color: rgba(0, 0, 0, 0.4);
}
</style>

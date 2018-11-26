<template>
    <div id="Search">

    <section>
        <div class="columns is-centered">
            <div class="column is-one-third">
                <b-field label="Find a Marvel Character">
                    <b-autocomplete
                        v-model="name"
                        :data="searchResults"
                        placeholder="Start typing..."
                        field="name"
                        :loading="isFetching"
                        :keep-first=true
                        @keyup.native.down.stop.prevent="null"
                        @keyup.native.up="null"
                        @keyup.native="handleSearch"
                        @select="option => showHero(option.id)">

                        <template slot-scope="props">
                            <div class="media">
                                <div class="media-left">
                                    <img v-bind:src="props.option.thumbnail.path + '.' + props.option.thumbnail.extension" width="32" />
                                </div>
                                <div class="media-content">
                                    {{ props.option.name }}
                                </div>
                            </div>
                        </template>
                    </b-autocomplete>
                </b-field>
            </div>
        </div>
    </section>

    <section id="superhero" v-if="hero1">
        <div class="columns is-centered">
            <div class="column is-one-third">
                <div class="card">
                    <div class="card-image">
                        <figure class="image is-4by3">
                            <img v-bind:src="hero1.thumbnail.path + '.' + hero1.thumbnail.extension" :alt="hero1.name" />
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
                                <p class="title is-4">{{ firstName }}</p>
                                <p class="subtitle is-6">{{ subName }}</p>
                            </div>
                        </div>

                        <div class="content">
                            {{ hero1.description }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>

<!--
    <div v-if="comics">
        <div>
            <h2>Comics</h2>
            <ul>
                <li v-for="comic in comics" :key="comic.id">
                    <h3>{{ comic.title }}</h3>
                    <img v-bind:src="comic.thumbnail.path + '.' + comic.thumbnail.extension" height="300" :alt="comic.title" />
                </li>
            </ul>
        </div>
    </div>
-->

</div>
</template>

<script>
import axios from "axios";
import debunce from "debounce";

export default {
  name: "Search",
  data: function() {
    return {
      name: null,
      searchResults: [],
      hero1: null,
      isFetching: false,
      selected: null
    };
  },
  methods: {
    handleSearch: debunce(function() {
      if (!this.name.length) {
        this.searchResults = [];
        return;
      }
      this.ifFetching = true;
      axios
        .get(
          "https://gateway.marvel.com:443/v1/public/characters?apikey=***REMOVED***&orderBy=name&nameStartsWith=" +
            this.name
        )
        .then(response => (this.searchResults = response.data.data.results))
        .finally(() => (this.isFetching = false));
    }, 500),
    showHero: function(id) {
      this.searchResults = [];
      axios
        .get(
            "https://gateway.marvel.com:443/v1/public/characters/" + id + "?apikey=***REMOVED***"
        )
        // TODO: Es raro coger el primer dato del array aqui...
        .then(response => (this.hero1 = response.data.data.results[0]));
    },
    splitHeroName: function(name) {
        var regExp = /([a-zA-Z0-9_]+ ?[a-zA-Z0-9_]+)( ?(\(([^)]+)\)))?/
        var matches = regExp.exec(name)
        return matches
    }
  },
  computed: {
      firstName: function() {
          var firstName = this.splitHeroName(this.name)[1]
          return firstName
      },
      subName: function() {
          var firstName = this.splitHeroName(this.name)[4]
          return firstName
      },
  }
};
</script>

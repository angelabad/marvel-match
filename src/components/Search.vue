<template>
    <div id="Search">

    <section>
        <b-field label="Find a movie">
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
    </section>

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
      comics: null,
      isFetching: false,
      selected: null
    };
  },
  methods: {
    handleSearch: debunce(function() {
        if (!this.name.length) {
            this.searchResults = []
            return
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
          "https://gateway.marvel.com:443/v1/public/comics?apikey=***REMOVED***&characters=" +
            id
        )
        .then(response => (this.comics = response.data.data.results));
    }
  }
};
</script>

<template>
    <div id="Search">
    <div>
        <form @submit.prevent @submit="handleSearch()">
            <div>
                <input v-model="name"
                       placeholder="Marvel Character..."
                       type="text"
                       required
                        />

                <button type="submit">Buscar</button>
            </div>

        </form>
    </div>

    <div v-if="searchResults">
        <table align="center">
            <thead>
                <td>Nombre</td>
                <td>Id</td>
            </thead>
            <tbody>
            <tr v-for="searchResult in searchResults" :key="searchResult.id" @click="showHero(searchResult.id)">
                <td>{{ searchResult.name }}</td>
                <td>{{ searchResult.id }}</td>
            </tr>
            </tbody>
        </table>
    </div>

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

export default {
  name: "Search",
  data: function() {
    return {
      name: null,
      searchResults: null,
      comics: null
    };
  },
  methods: {
    handleSearch() {
      (this.comics = null),
        axios
          .get(
            "https://gateway.marvel.com:443/v1/public/characters?apikey=***REMOVED***&orderBy=name&nameStartsWith=" +
              this.name
          )
          .then(response => (this.searchResults = response.data.data.results));
    },
    showHero(id) {
      this.searchResults = null;
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

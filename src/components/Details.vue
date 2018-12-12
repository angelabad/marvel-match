<template>
  <div id="Details">
    <div v-if="comics" class="container">
      <div class="columns is-multiline">
        <div v-for="comic in comics" :key="comic.id" class="column is-third">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img
                  v-bind:src="comic.thumbnail.path + '.' + comic.thumbnail.extension"
                  :alt="comic.title"
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
                  <p class="title is-4">{{ comic.title }}</p>
                  <!-- <p class="subtitle is-6">{{ subName }}</p> -->
                </div>
              </div>

              <div class="content">{{ comic.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="container">
      <progress class="progress" :value="progress" :max="total"/>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Details",
  props: ["hero1", "hero2"],
  data: function() {
    return {
      total: 0,
      progress: 0,
      comics: null
    };
  },
  mounted: function() {
    Promise.all([this.getComics(this.hero1), this.getComics(this.hero2)]).then(
      values => {
        this.comics = values[0].filter(obj =>
          values[1].find(o => o.id === obj.id)
        );
      }
    );
  },
  methods: {
    getComics: function(hero) {
      // TODO: Mejorar control de errores
      return new Promise((resolve, reject) => {
        let offset = 100;

        let urlArray = [];
        let i = 0;
        for (i = 0; i <= hero.comicsAvailable; i += offset) {
          urlArray.push(
            "https://gateway.marvel.com:443/v1/public/characters/" +
              hero.id +
              "/comics?limit=100&offset=" +
              i +
              "&apikey=***REMOVED***"
          );
        }

        this.total += urlArray.length;

        let comicsArray = [];
        // TODO: No se si esto es concurrente
        urlArray.map(url =>
          axios
            .get(url)
            .then(results => {
              this.progress += 1;
              results.data.data.results.forEach(element => {
                comicsArray.push(element);
              });
            })
            .catch(() => {
              return reject("An error happens!");
            })
            .finally(() => {
              return resolve(comicsArray);
            })
        );
      });
    }
  }
};
</script>
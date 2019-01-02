<template>
  <div id="SearchResults">
    <div
      v-if="comics"
      class="container"
    >
      <div class="columns is-multiline">
        <div
          v-for="comic in comics"
          :key="comic.id"
          class="column is-one-quarter"
        >
          <div class="card is-shadowless">
            <div class="card-image">
              <figure class="image is-2by3 aa-card-image">
                <img
                  @click="showComicDetails(comic)"
                  v-bind:src="comic.thumbnail.path + '.' + comic.thumbnail.extension | convertToHttps"
                  :alt="comic.title"
                >
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <a
                    @click="showComicDetails(comic)"
                    class="title is-4 aa-card-title"
                  >{{ comic.title }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-else
      class="container"
    >
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Searching your superheroes!</p>
          </header>
          <section class="modal-card-body">
            <progress
              class="progress"
              :value="progress"
              :max="total"
            />
          </section>
          <footer class="modal-card-foot">
            <p>Please be patient...</p>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ComicDetails from './ComicDetails'

export default {
  name: 'SearchResults',
  props: {
    hero1: {
      type: Object,
      required: true
    },
    hero2: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      total: 0,
      progress: 0,
      comics: null
    }
  },
  beforeCreate: function () {
    if (!this.$route.params.hero1 || !this.$route.params.hero2) {
      this.$router.replace({ name: 'index' })
    }
  },
  mounted: function () {
    // TODO: Remove body-background specific style for backgrounds
    // TODO: Mejorar los diferentes estilos en paginas distintas
    const el = document.getElementById('app')
    el.classList.remove('body-background')

    let rawcomics

    Promise.all([this.getComics(this.hero1), this.getComics(this.hero2)]).then(
      values => {
        rawcomics = values[0].filter(obj =>
          values[1].find(o => o.id === obj.id)
        )
      }
    ).then(() => {
      this.comics = rawcomics.map(rawcomic => {
        var comic = {
          id: rawcomic.id,
          title: rawcomic.title,
          description: rawcomic.description,
          urls: rawcomic.urls,
          thumbnail: rawcomic.thumbnail,
          creators: rawcomic.creators,
          characters: rawcomic.characters,
          dates: rawcomic.dates,
          issueNumber: rawcomic.issueNumber,
          pageCount: rawcomic.pageCount,
          series: rawcomic.series
        }

        return comic
      })
    })
  },
  methods: {
    getComics: function (hero) {
      // TODO: Mejorar control de errores
      return new Promise((resolve, reject) => {
        let offset = 100

        let urlArray = []
        let i = 0
        for (i = 0; i <= hero.comicsAvailable; i += offset) {
          urlArray.push(
            'https://gateway.marvel.com:443/v1/public/characters/' +
            hero.id +
            '/comics?limit=100&offset=' +
            i +
            '&apikey=***REMOVED***'
          )
        }

        this.total += urlArray.length

        let comicsArray = []

        var getUrls = () => urlArray.map(url => axios.get(url)
          .then(results => {
            this.progress += 1
            results.data.data.results.forEach(element => {
              comicsArray.push(element)
            })
          })
          .catch(error => {
            return reject(new Error('An error happens! ' + error))
          })
        )

        axios.all(getUrls())
          .then(result => {
            return resolve(comicsArray)
          })
          .catch(error => {
            return reject(new Error('An error happens! ' + error))
          })
      })
    },
    getMarvelUrl: function (comic) {
      const result = comic.urls.find(comicUrl => comicUrl.type === 'detail')
      return result.url
    },
    showComicDetails: function (comic) {
      this.$modal.open({
        props: {
          comic: comic
        },
        parent: this,
        component: ComicDetails,
        hasModalCard: true,
        scroll: 'keep'
      })
    }
  }
}
</script>

<style>
.aa-card-image {
  border: none !important;
  -webkit-transition: none;
  transition: none;
  box-shadow: 0 26px 24px -16px rgba(0, 0, 0, 0.4) !important;
  cursor: pointer;
}
.aa-card-image:hover {
  -moz-transform: translate(0, -6px);
  -ms-transform: translate(0, -6px);
  -o-transform: translate(0, -6px);
  -webkit-transform: translate(0, -6px);
  transform: translate(0, -6px);
}
.aa-card-title {
  font-family: "DIN Next W01 Regular" !important;
  font-weight: bold !important;
  font-size: 18px !important;
}
.aa-card-title:hover {
  color: #eb2328;
}
</style>

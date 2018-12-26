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
          class="column is-one-third"
        >
          <div class="card aa--card-equal-height">
            <div class="card-image">
              <figure class="image is-4by3">
                <img
                  v-bind:src="comic.thumbnail.path + '.' + comic.thumbnail.extension | convertToHttps"
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

              <div class="content">{{ comic.description | readMore }}</div>
            </div>
            <footer class="card-footer">
              <a
                class="is-primary is-medium card-footer-item"
                @click="showComicDetails(comic)"
              >
                Details
              </a>
               <a
                class="is-primary is-medium card-footer-item" target="_blank"
                :href="getMarvelUrl(comic)"
              >Marvel</a>
            </footer>
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
  name: 'Details',
  props: ['hero1', 'hero2'],
  data: function () {
    return {
      total: 0,
      progress: 0,
      comics: null
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
.aa--card-equal-height {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.aa--card-equal-height .card-footer {
  margin-top: auto;
}
</style>

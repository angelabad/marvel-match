<template>
  <div id="SearchResults">

    <mm-header />

    <div
      v-if="loading"
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

    <div v-else>
      <div
        v-if="comics.length > 0"
        class="container"
      >
        <div class="section">
          <div class="level-right">
            <div class="level-item">
              <a
                class="button"
                @click="reverseOrder"
              >
                <span class="icon">
                  <i class="fas fa-sort"></i>
                </span>
                <span>Order</span>
              </a>
            </div>
          </div>
        </div>
        <div class="columns is-multiline is-mobile">
          <div
            v-for="comic in limitedComics"
            :key="comic.id"
            class="column is-one-quarter-tablet is-one-third-mobile"
          >
            <div class="card is-shadowless">
              <div class="card-image">
                <figure class="image is-2by3 aa-card-image">
                  <img
                    @click="showComicDetails(comic)"
                    v-bind:src="comic.thumbnail.path + '/portrait_uncanny.' + comic.thumbnail.extension | convertToHttps"
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
      <div v-else>
        <section class="hero is-medium is-bold">
          <div class="hero-body">
            <div class="container">
              <h1 class="title has-text-black">
                No results found
              </h1>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ComicDetails from './ComicDetails.vue'
import MmHeader from './ui/MmHeader.vue'
import utils from '@/common/utils'

export default {
  name: 'SearchResults',
  components: {
    MmHeader
  },
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
      loading: false,
      total: 0,
      progress: 0,
      comics: [],
      limitNumber: 12,
      bottom: false
    }
  },
  computed: {
    limitedComics: function () {
      return this.comics.slice(0, this.limitNumber)
    }
  },
  beforeCreate: function () {
    if (!this.$route.params.hero1 || !this.$route.params.hero2) {
      this.$router.replace({ name: 'index' })
    }
  },
  created: function () {
    window.addEventListener('scroll', () => {
      this.bottom = this.bottomVisible()
    })
  },
  mounted: function () {
    this.loading = true
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
      this.comics.sort(function (a, b) {
        // Get comics onsaleDate and convert to Date type
        var dateA = new Date(a.dates.find(date => date.type === 'onsaleDate').date)
        var dateB = new Date(b.dates.find(date => date.type === 'onsaleDate').date)

        return dateA - dateB
      })
    }).finally(() => {
      this.loading = false
    })
  },
  watch: {
    bottom: function (bottom) {
      if (bottom) {
        this.limitNumber += 4
      }
    }
  },
  methods: {
    reverseOrder: function () {
      this.comics = this.comics.reverse()
    },
    bottomVisible: function () {
      const scrollY = window.scrollY
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      return bottomOfPage || pageHeight < visible
    },
    getComics: function (hero) {
      // TODO: Mejorar control de errores
      return new Promise((resolve, reject) => {
        let offset = 100

        let urlArray = []
        let i = 0
        for (i = 0; i <= hero.comicsAvailable; i += offset) {
          urlArray.push(
            utils.getCharacterComics(hero.id, i)
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

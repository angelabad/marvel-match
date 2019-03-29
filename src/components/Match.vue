<template>
  <div id="Match">

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

      <mm-header />

      <div
        v-if="comics.length > 0"
        class="container"
      >
        <section class="section">
          <div class="columns is-multiline is-mobile is-variable is-1-mobile is-3-tablet">
            <div class="column is-full">
              <div class="level">
                <div class="level-left">
                  <p class="level-item title has-text-white">
                    {{ hero1.name }} - {{ hero2.name }}
                  </p>
                </div>
                <div class="level-right is-marginless">
                  <div class="level-item">
                    <strong class="has-text-white">
                      {{ comics.length }} comics available
                    </strong>

                    <a
                      class="button is-text has-text-white is-small is-outlined"
                      @click="reverseOrder"
                    >
                      <span class="icon">
                        <i class="fas fa-sort"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- TODO: This code ir repeated at the bottom of page -->
            <div class="column is-half has-text-white has-text-left pagination">
              Showing {{ firstComicInPage }} to {{ lastComicInPage }}
            </div>
            <div class="column is-half pagination">
              <b-pagination
                :total="comics.length"
                :current.sync="current"
                :order="order"
                :size="size"
                :simple="isSimple"
                :rounded="isRounded"
                :per-page="perPage"
              >
              </b-pagination>
            </div>

            <div
              v-for="comic in computedComics"
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
                        class="title is-size-7-mobile is-size-6-tablet aa-card-title"
                      >{{ comic.title }}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="column is-full pagination">
              <b-pagination
                :total="comics.length"
                :current.sync="current"
                :order="order"
                :size="size"
                :simple="isSimple"
                :rounded="isRounded"
                :per-page="perPage"
              >
              </b-pagination>
            </div>

          </div>
        </section>

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

      <mm-footer />

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import axiosRetry from 'axios-retry'
import ComicDetails from './ComicDetails.vue'
import MmHeader from './ui/MmHeader.vue'
import MmFooter from './ui/MmFooter.vue'
import utils from '@/common/utils'

export default {
  name: 'Match',
  metaInfo: function () {
    return {
      title: this.hero1.name + ' & ' + this.hero2.name,
      titleTemplate: 'MarvelMatch: %s',
      meta: [
        { name: 'description', content: 'All Marvel comics where ' + this.hero1.name + ' & ' + this.hero2.name + ' appear together.' }
      ]
    }
  },
  components: {
    MmHeader,
    MmFooter
  },
  data: function () {
    return {
      current: 1,
      perPage: 12,
      order: 'is-right',
      size: 'is-small',
      isSimple: true,
      isRounded: false,
      loading: false,
      total: 0,
      progress: 0,
      hero1: [],
      hero2: [],
      comics: [],
      errored: false
    }
  },
  computed: {
    firstComicInPage: function () {
      var page = (this.perPage * (this.current - 1)) + 1
      return page
    },
    lastComicInPage: function () {
      var page = (this.perPage * (this.current - 1)) + this.perPage
      // If page calculation is mayor that total comics, return total comics
      return (page < this.comics.length) ? page : this.comics.length
    },
    computedComics: function () {
      return this.comics.slice(this.firstComicInPage - 1, this.lastComicInPage)
    }
  },
  beforeCreate: function () {
    if (!this.$route.params.hero1 || !this.$route.params.hero2) {
      this.$router.replace({ name: 'index' })
    }
  },
  mounted: function () {
    // Set axios Retry 5 times if fetch fails
    axiosRetry(axios, {
      retries: 5,
      retryDelay: axiosRetry.exponentialDelay
    })

    this.loading = true

    Promise.all([this.getHero(this.$route.params.hero1), this.getHero(this.$route.params.hero2)])
      .then(heroesArray => {
        this.hero1 = heroesArray[0]
        this.hero2 = heroesArray[1]
        Promise.all([this.getComics(heroesArray[0]), this.getComics(heroesArray[1])])
          .then(
            values => {
              let rawcomics = values[0].filter(obj =>
                values[1].find(o => o.id === obj.id)
              )
              return rawcomics
            }
          ).then(rawcomics => {
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
          })
          .catch(error => {
            console.log(error)
            this.errored = true
            this.showErrorDialog()
          })
          .finally(() => {
            this.loading = false
          })
      })
      .catch(error => {
        console.log(error)
        this.errored = true
        this.showErrorDialog()
      })
  },
  methods: {
    showErrorDialog: function () {
      this.$dialog.alert({
        message: 'Something\'s not good, please try again later!',
        type: 'is-dark',
        hasIcon: true,
        icon: 'times-circle',
        iconPack: 'fa',
        comfirmText: 'Agree',
        onConfirm: () => this.$router.replace({ name: 'index' })
      })
    },
    reverseOrder: function () {
      this.comics = this.comics.reverse()
    },
    // TODO: This function is duplicated in SearchForm -> showHero
    getHero: function (id) {
      return new Promise((resolve, reject) => {
        let hero = []
        axios.get(utils.getCharacter(id))
          .then(response => {
            hero = {
              id: response.data.data.results[0].id,
              name: response.data.data.results[0].name,
              description: response.data.data.results[0].description,
              thumbnail: response.data.data.results[0].thumbnail,
              comicsAvailable: response.data.data.results[0].comics.available
            }
          })
          .then(response => {
            resolve(hero)
          })
          .catch(() => reject(new Error('Error getting superhero')))
      })
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
        hasModalCard: false,
        scroll: 'keep'
      })
    }
  }
}
</script>

<style>
/* pagination */
small.info {
  display: none;
}
a.pagination-next:focus,
a.pagination-previous:focus {
  border-color: white !important;
}
.pagination {
  padding-top: 0 !important;
  padding-bottom: 0.1rem !important;
}
/* end pagination */

#Match {
  background-color: #22262a;
  min-height: 100vh;
}
.section {
  padding-top: 1rem !important;
}
a.button {
  text-decoration: none !important;
}
a.button:hover {
  background: none !important;
}
@media only screen and (max-width: 768px) {
  .card {
    line-height: 1 !important;
  }
}
.card {
  background-color: #22262a !important;
}
.card-content {
  padding: 0.5rem !important;
  padding-top: 1rem !important;
  padding-left: 0 !important;
}
.media-content {
  overflow-y: hidden !important;
}
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
  color: white !important;
}
</style>

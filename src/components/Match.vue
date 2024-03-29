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
            <b-progress
              :value="progress"
              :max="total"
              size="is-medium"
            ></b-progress>
          </section>
          <footer class="modal-card-foot">
            <p>Please be patient...</p>
          </footer>
        </div>
      </div>
    </div>

    <div v-else>

      <mm-header />

      <main>
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
                      <social-sharing
                        :url="shareUrl"
                        :title="metaTitle"
                        :hashtags="hashtags"
                        twitter-user="matchmarvel"
                        inline-template
                      >
                        <div>
                          <network network="facebook">
                            <font-awesome-icon
                              :icon="['fab', 'facebook-square']"
                              size="lg"
                              class="aa-social"
                            />
                          </network>
                          &nbsp;
                          <network network="twitter">
                            <font-awesome-icon
                              :icon="['fab', 'twitter-square']"
                              size="lg"
                              class="aa-social"
                            />
                          </network>
                        </div>
                      </social-sharing>
                    </div>
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
                  icon-pack="fas"
                  aria-next-label="Next page"
                  aria-previous-label="Previous page"
                  aria-page-label="Page"
                  aria-current-label="Current page"
                  @change="updatePage"
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
                    <figure
                      class="image is-2by3 aa-card-image"
                      @click="showComicDetails(comic)"
                    >
                      <v-lazy-image
                        :src="comic.thumbnail.path + '/' + imageSize + '.' + comic.thumbnail.extension | convertToHttps"
                        :alt="comic.title"
                      />
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
                  icon-pack="fas"
                  aria-next-label="Next page"
                  aria-previous-label="Previous page"
                  aria-page-label="Page"
                  aria-current-label="Current page"
                  @change="updatePage"
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
      </main>

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
      title: this.metaTitle,
      meta: [
        { name: 'description', content: this.metaDescription }
      ],
      link: [
        { rel: 'preconnect', href: 'https://i.annihil.us', crossorigin: 'crossorigin' }
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
  beforeRouteEnter: function (to, from, next) {
    // Check if page is undefined or 0 and put 1 on url
    if (to.params.page === undefined || parseInt(to.params.page) === 0) {
      const page = 1
      to.params.page = page.toString()
      next(to)
    // Go if page is number
    } else if (Number.isInteger(parseInt(to.params.page))) {
      next()
    // Got error if inst a number
    } else {
      next({ name: 'notfound' })
    }
  },
  computed: {
    imageSize: function () {
      return this.$mq === 'sm' ? 'portrait_fantastic' : 'portrait_uncanny'
    },
    metaTitle: function () {
      const title = 'MarvelMatch: ' + this.hero1.name + ' vs ' + this.hero2.name
      return title
    },
    metaDescription: function () {
      const description = 'See all the Marvel comics where ' + this.hero1.name + ' and ' + this.hero2.name + ' appear together.'
      return description
    },
    shareUrl: function () {
      const url = process.env.VUE_APP_SOCIAL_SHARE_URL + '/match/' + this.hero1.id + '/' + this.hero2.id

      return encodeURI(url)
    },
    hashtags: function () {
      const hashtags = ['marvel']
      // Only use letters, numbers and underscore in twitter hashtags
      hashtags.push(this.hero1.name.toLowerCase().replace(/[^a-zA-Z0-9_]/g, ''))
      hashtags.push(this.hero2.name.toLowerCase().replace(/[^a-zA-Z0-9_]/g, ''))
      return hashtags.join()
    },
    firstComicInPage: function () {
      const page = (this.perPage * (this.current - 1)) + 1
      return page
    },
    lastComicInPage: function () {
      const page = (this.perPage * (this.current - 1)) + this.perPage
      // If page calculation is mayor that total comics, return total comics
      return (page < this.comics.length) ? page : this.comics.length
    },
    computedComics: function () {
      return this.comics.slice(this.firstComicInPage - 1, this.lastComicInPage)
    }
  },
  mounted: function () {
    // Set axios Retry 5 times if fetch fails
    axiosRetry(axios, {
      retries: 5,
      retryDelay: axiosRetry.exponentialDelay
    })

    this.$route.params.page == null ? this.current = 1 : this.current = parseInt(this.$route.params.page)

    this.loading = true

    Promise.all([this.getHero(this.$route.params.hero1), this.getHero(this.$route.params.hero2)])
      .then(heroesArray => {
        this.hero1 = heroesArray[0]
        this.hero2 = heroesArray[1]
        Promise.all([this.getComics(heroesArray[0]), this.getComics(heroesArray[1])])
          .then(
            values => {
              const rawcomics = values[0].filter(obj =>
                values[1].find(o => o.id === obj.id)
              )
              return rawcomics
            }
          ).then(rawcomics => {
            this.comics = rawcomics.map(rawcomic => {
              const comic = {
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
              const dateA = new Date(a.dates.find(date => date.type === 'onsaleDate').date)
              const dateB = new Date(b.dates.find(date => date.type === 'onsaleDate').date)

              return dateA - dateB
            })
          })
          .catch(error => {
            console.log(error)
            this.errored = true
            this.showErrorDialog()
          })
          .finally(() => {
            // Check if page number in url is higher than total pages
            const totalPages = Math.ceil(this.comics.length / this.perPage)
            if (this.current > totalPages) {
              this.current = 1
              this.$router.push({
                params: {
                  page: 1
                }
              })
            }

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
    updatePage: function (numPag) {
      this.$router.push({
        params: {
          page: numPag
        }
      })
    },
    showErrorDialog: function () {
      this.$buefy.dialog.alert({
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
          .then(() => {
            resolve(hero)
          })
          .catch((error) => reject(new Error('Error getting superhero: ' + error.message)))
      })
    },
    getComics: function (hero) {
      // TODO: Mejorar control de errores
      return new Promise((resolve, reject) => {
        const offset = 100

        const urlArray = []
        let i = 0
        for (i = 0; i <= hero.comicsAvailable; i += offset) {
          urlArray.push(
            utils.getCharacterComics(hero.id, i)
          )
        }

        this.total += urlArray.length

        const comicsArray = []

        const getUrls = () => urlArray.map(url => axios.get(url)
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
      this.$buefy.modal.open({
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

<style scoped>
.v-lazy-image {
  opacity: 0;
  transition: opacity 2s;
}
.v-lazy-image-loaded {
  opacity: 1;
}
</style>

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

/* social buttons */
.aa-social {
  color: grey;
  cursor: pointer;
}
/* end social buttons */

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

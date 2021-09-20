<template>
  <div id="ComicDetails">

    <mq-layout mq="sm">
      <section class="section">
        <div class="columns is-mobile is-multiline has-text-white">
          <div class="column is-half">
            <figure class="image">
              <v-lazy-image
                :src="comic.thumbnail.path + '.' + comic.thumbnail.extension | convertToHttps"
                :src-placeholder="comic.thumbnail.path + '/portrait_fantastic.' + comic.thumbnail.extension | convertToHttps"
                :alt="comic.title"
              />
            </figure>
          </div>
          <div class="column is-half">
            <p class="subtitle is-4 has-text-weight-bold has-text-white">{{ comic.title }}</p>
            <p><span class="has-text-weight-bold">Released:</span><br />{{ getReleaseDate }}</p>
          </div>

          <div class="column is-full is-paddingless has-text-centered">
            <p><a
                class="button is-small is-black"
                :href="getMarvelUrl"
                target="_blank"
              >Show in Marvel</a>
            </p>
          </div>

          <div
            v-if="comic.description"
            class="column is-full has-text-justified"
          >
            <p class="has-text-weight-bold">Summary</p>
            <p><span v-html="comic.description"></span></p>
          </div>

          <div
            v-if="comic.issueNumber"
            class="column is-half"
          >
            <p>
              <span class="has-text-weight-bold">Issue Number:</span> {{ comic.issueNumber }}
            </p>
          </div>
          <div
            v-if="comic.pageCount"
            class="column is-half"
          >
            <p><span class="has-text-weight-bold">Pages:</span> {{ comic.pageCount }}</p>
          </div>
          <div
            v-if="getWriterNames"
            class="column is-half"
          >
            <p><span class="has-text-weight-bold">Writers:</span><br />{{ getWriterNames }}</p>
          </div>
          <div
            v-if="getPencillerNames"
            class="column is-half"
          >
            <p><span class="has-text-weight-bold">Pencillers:</span><br />{{ getPencillerNames }}</p>
          </div>

          <div
            v-if="getCoverArtistNames"
            class="column is-half"
          >
            <p><span class="has-text-weight-bold">Cover Artist:</span><br />{{ getCoverArtistNames }}</p>
          </div>
          <div
            v-if="getColoristNames"
            class="column is-half"
          >
            <p><span class="has-text-weight-bold">Colorists:</span><br />{{ getColoristNames }}</p>
          </div>

          <div
            v-if="getCharacters"
            class="column is-full"
          >
            <p><span class="has-text-weight-bold">Characters:</span><br />{{ getCharacters }}</p>
          </div>
        </div>
      </section>
    </mq-layout>

    <mq-layout mq="md+">
      <section class="section">
        <div class="columns is-multiline has-text-white">
          <div class="column is-half">
            <figure class="image">
              <v-lazy-image
                :src="comic.thumbnail.path + '.' + comic.thumbnail.extension | convertToHttps"
                :src-placeholder="comic.thumbnail.path + '/portrait_uncanny.' + comic.thumbnail.extension | convertToHttps"
                :alt="comic.title"
                style="width: 100%; height: 80vh; object-fit: contain;"
              />
            </figure>
          </div>
          <div class="column is-half">
            <div class="columns is-multiline is-mobile">
              <div class="column is-full">
                <p class="title has-text-white">{{ comic.title }}</p>
              </div>
              <div
                v-if="getReleaseDate"
                class="column is-half"
              >
                <p><span class="has-text-weight-bold">Published:</span><br />{{ getReleaseDate }}</p>
              </div>
              <div class="column is-half">
                <a
                  class="button is-medium is-black"
                  :href="getMarvelUrl"
                  target="_blank"
                >Show in Marvel</a>
              </div>
              <div class="column is-half">
                <p><span class="has-text-weight-bold">Issue Number:</span> {{ comic.issueNumber }}</p>
              </div>
              <div class="column is-half">
                <p><span class="has-text-weight-bold">Pages:</span> {{ comic.pageCount }}</p>
              </div>

              <div
                v-if="getWriterNames"
                class="column is-half"
              >
                <p><span class="has-text-weight-bold">Writers:</span><br />{{ getWriterNames }}</p>
              </div>
              <div
                v-if="getPencillerNames"
                class="column is-half"
              >
                <p><span class="has-text-weight-bold">Pencillers:</span><br />{{ getPencillerNames }}</p>
              </div>

              <div
                v-if="getCoverArtistNames"
                class="column is-half"
              >
                <p><span class="has-text-weight-bold">Cover Artist:</span><br />{{ getCoverArtistNames }}</p>
              </div>
              <div
                v-if="getColoristNames"
                class="column is-half"
              >
                <p><span class="has-text-weight-bold">Colorists:</span><br />{{ getColoristNames }}</p>
              </div>
              <div
                v-if="getCharacters"
                class="column is-full"
              >
                <p><span class="has-text-weight-bold">Characters:</span><br />{{ getCharacters }}</p>
              </div>
              <div class="column is-full has-text-justified">
                <p class="has-text-weight-bold"><span v-html="comic.description"></span></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </mq-layout>

  </div>
</template>

<script>
export default {
  name: 'ComicDetails',
  props: ['comic'],
  methods: {
    getCreatorNames: function (role) {
      const writers = this.comic.creators.items.filter(creator => creator.role === role)
      if (writers.length === 0) return ''

      const names = []
      writers.forEach(writer => {
        names.push(writer.name)
      })
      return names.join(', ')
    }
  },
  mounted: function () {
    this.$ga.page('/details/' + this.comic.id)
  },
  computed: {
    getWriterNames: function () {
      return this.getCreatorNames('writer')
    },
    getColoristNames: function () {
      return this.getCreatorNames('colorist')
    },
    getPencillerNames: function () {
      return this.getCreatorNames('penciller')
    },
    getCoverArtistNames: function () {
      return this.getCreatorNames('penciller (cover)')
    },
    getReleaseDate: function () {
      if (!this.comic.dates) return ''
      const result = this.comic.dates.find(date => date.type === 'onsaleDate')
      const newDate = new Date(Date.parse(result.date))
      const options = { month: 'long', day: 'numeric', year: 'numeric' }

      return newDate.toLocaleDateString('en-US', options)
    },
    getCharacters: function () {
      const names = []
      this.comic.characters.items.forEach(character => names.push(character.name))

      return names.join(', ')
    },
    getMarvelUrl: function () {
      const url = this.comic.urls.find(url => url.type === 'detail')
      if (url.length === 0) return ''
      return url.url
    }
  }
}
</script>

<style scoped>
.v-lazy-image {
  filter: blur(10px);
  transition: filter 0.7s;
}
.v-lazy-image-loaded {
  filter: blur(0);
}
</style>

<style >
.modal-content {
  overflow-y: auto;
  /* Hide scrollbar */
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: none; /* Firefox 64 */
}
::-webkit-scrollbar {
  /* Hide scrollbar in chrome */
  width: 0px; /* remove scrollbar space */
  background: transparent; /* optional: just make scrollbar invisible */
}
</style>

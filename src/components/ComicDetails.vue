<template>
  <div id="ComicDetails">

    <div class="card is-horizontal">
      <div class="card-image">

        <figure class="image has-background-black-ter">
          <img
            v-bind:src="comic.thumbnail.path + '.' + comic.thumbnail.extension | convertToHttps"
            :alt="comic.title"
            style="width: 100%; height: 600px; object-fit: contain;"
          >
        </figure>
      </div>
      <div class="card-content has-background-black-ter">
        <div class="media">
          <div class="media-content has-text-white">
            <h1 class="title is-spaced">{{comic.title}}</h1>

            <div class="columns">
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
            </div>

            <div class="columns is-multiline">

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

            </div>

          </div>
        </div>

        <div class="content">
          <p class="has-text-justified">
            <span v-html="comic.description"></span>
          </p>
        </div>
      </div>

    </div>

  </div>

</template>

<script>
export default {
  name: 'ComicDetails',
  props: ['comic'],
  methods: {
    getCreatorNames: function (role) {
      var writers = this.comic.creators.items.filter(creator => creator.role === role)
      if (writers.length === 0) return ''

      let names = []
      writers.forEach(writer => {
        names.push(writer.name)
      })
      return names.join(', ')
    }
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
      let newDate = new Date(Date.parse(result.date))
      var options = { month: 'long', day: 'numeric', year: 'numeric' }

      return newDate.toLocaleDateString('en-US', options)
    },
    getCharacters: function () {
      let names = []
      this.comic.characters.items.forEach(character => names.push(character.name))

      return names.join(', ')
    },
    getMarvelUrl: function () {
      // const resultado = inventario.find( fruta => fruta.nombre === 'cerezas' );
      const url = this.comic.urls.find(url => url.type === 'detail')
      if (url.length === 0) return ''
      return url.url
    }
  }
}
</script>

<style scoped>
/* angel */

.title {
  font-weight: 500;
  font-size: 30px;
  font-family: DINNextW01-CondensedMed;
  color: white;
}

.subtitle {
  font-family: "DINNextW01-CondensedMed";
  font-size: 20px;
  color: white;
}

p {
  font-family: "DINNextW01-CondensedMed";
  font-size: 16px;
  color: white;
}

.content {
  font-family: "DINNextW01-CondensedMed";
  font-size: 16px;
  color: white;
}

/*
.media-content p {
  padding-bottom: 10px;
}
*/

/* otro */
.card .media:not(:last-child) {
  margin-bottom: 0.75rem;
}

.card.card--reverse-order {
  flex-direction: row-reverse;
}

.card.is-horizontal {
  display: flex;
  flex-basis: 50ex;
  flex-grow: 0;
  flex-shrink: 1;
  max-height: 90vh;
}
.card.is-horizontal .card-image {
  flex: 4;
  flex-shrink: 1;
}
.card.is-horizontal .card-image .image {
  display: block;
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
}

.card.is-horizontal .card-image .image img {
  height: 100% !important;
  object-fit: cover;
  object-position: center;
}

.card.is-horizontal .card-content {
  overflow-y: auto;
  flex: 3;
}

::-webkit-scrollbar {
    width: 0px;  /* remove scrollbar space */
    background: transparent;  /* optional: just make scrollbar invisible */
}
</style>

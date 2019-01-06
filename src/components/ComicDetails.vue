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
          <div class="media-content">
            <h1 class="title is-spaced">{{comic.title}}</h1>
            <h2 class="subtitle">Published: {{ getReleaseDate }}</h2>
            <p class="is-3 has-text-white">Issue Number: {{ comic.issueNumber }}</p>
            <p class="is-3 has-text-grey-light">Pages: {{ comic.pageCount }}</p>
            <p class="is-3 has-text-white">Series: {{ comic.series.name }}</p>
            <p
              v-if="getWriterNames"
              class="is-3 has-text-grey-light"
            >Writers: {{ getWriterNames }}</p>
            <p
              v-if="getColoristNames"
              class="is-3 has-text-white"
            >Colorists: {{ getColoristNames }}</p>
            <p
              v-if="getLettererNames"
              class="is-3 has-text-grey-light"
            >Letterers: {{ getLettererNames }}</p>
            <p
              v-if="getCoverArtistNames"
              class="is-3 has-text-white"
            >Cover Artist: {{ getCoverArtistNames }}</p>
            <p
              v-if="getEditorNames"
              class="is-3 has-text-grey-light"
            >Editors: {{ getEditorNames }}</p>
            <p
              v-if="getCharacters"
              class="is-3 has-text-white"
            >Characters: {{ getCharacters }}</p>
            <a
              class="is-3"
              :href="getMarvelUrl"
              target="_blank"
            >Go to Marvel</a>
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
    getLettererNames: function () {
      return this.getCreatorNames('letterer')
    },
    getCoverArtistNames: function () {
      return this.getCreatorNames('penciller (cover)')
    },
    getEditorNames: function () {
      return this.getCreatorNames('editor')
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
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.card.is-horizontal .card-content {
  flex: 3;
}
</style>

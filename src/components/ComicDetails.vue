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
          <div class="media-content has-text-white is-size-6">
            <h1 class="title is-spaced">{{comic.title}}</h1>

            <div class="level">
              <p>Published:<br />{{ getReleaseDate }}</p>
            </div>

            <div class="level">
              <div class="level-left">
                <p class="level-item">Issue Number: {{ comic.issueNumber }}</p>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <p class="level-item">Pages: {{ comic.pageCount }}</p>
                </div>
              </div>
            </div>

            <div class="level">
              <div class="level-left">
                <p v-if="getWriterNames" class="level-item">Writers:<br />{{ getWriterNames }}</p>
              </div>
              <div clasS="level-right">
                <p v-if="getColoristNames" class="level-item">Colorists:<br />{{ getColoristNames }}</p>
              </div>
            </div>

            <div class="level">
              <div class="level-left">
                 <p v-if="getCoverArtistNames" class="level-item">Cover Artist:<br />{{ getCoverArtistNames }}</p>
              </div>
            </div>

            <p v-if="getCharacters" class="has-text-white">Characters:<br />{{ getCharacters }}</p>

            <div class="section has-text-centered">
              <a class="button is-medium is-black" :href="getMarvelUrl" target="_blank">Marvel Site</a>
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

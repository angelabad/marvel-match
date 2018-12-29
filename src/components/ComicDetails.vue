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
            <p
              v-if="getWriterNames"
              class="is-3"
            >Writers: {{ getWriterNames }}</p>
            <p class="is-3">Colorists: {{ getColoristNames }}</p>
          </div>
        </div>

        <div class="content">
          <p class="has-text-justified">
            <span v-html="comic.description"></span>
          </p>

          <!--
              <span class="tag is-link">blackbird was a sailor</span>
              <span class="tag is-info">that's what you do</span>

              <br><br>

              <div class="field is-grouped is-grouped-multiline">
                <div class="control">
                  <div class="tags has-addons">
                    <span class="tag is-dark">npm</span>
                    <span class="tag is-info">0.5.0</span>
                  </div>
                </div>

                <div class="field is-grouped is-grouped-multiline">
                  <div class="control">
                    <div class="tags has-addons">
                      <span class="tag is-link">axiomaciae</span>
                      <span class="tag is-info">24. 07. 2020</span>
                    </div>
                  </div>
                  <br>
                  <time datetime="2018-5-8">15:51 PM - 8 May 2018</time>

                </div>
              </div>
              -->
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
    getReleaseDate: function () {
      if (!this.comic.dates) return ''
      const result = this.comic.dates.find(date => date.type === 'onsaleDate')
      let newDate = new Date(Date.parse(result.date))
      var formatDate = newDate.getFullYear() + '-' + newDate.getMonth() + '-' + newDate.getDay()
      return formatDate
    }
  },
  mounted: function () {
    console.log(this.comic)
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

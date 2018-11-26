<template>
    <div id="Page">

        <div class="columns is-centered" v-if="visible">
            <div class="column is-one-third">
                <Search v-on:sendHero="hero => this.hero1Id = hero" />
            </div>

            <div class="column is-one-fifth is-narrow">
                <div v-if="hero1Id && hero2Id">
                    <a class="button is-info">
                        Link
                    </a>
                </div>
            </div>

            <div class="column is-one-third">
                <Search v-on:sendHero="hero => this.hero2Id = hero" />
            </div>
        </div>

    </div>
</template>

<script>
import Search from './Search.vue'

export default {
  name: "Page",
  components: {
      Search
  },
  data: function (){
      return {
          detailsVisible: false,
          visible: true,
          hero1Id: null,
          hero2Id: null
      }
  }
};
</script>

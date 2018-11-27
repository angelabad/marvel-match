<template>
    <div id="Page">

        <section class="container">
            <div class="container" v-if="detailsVisible">
                <Details :hero1="hero1Id" :hero2="hero2Id" />
            </div>
        </section>

        <section class="container">
        <div class="columns is-centered" v-if="visible">
            <div class="column is-one-third">
                <Search v-on:sendHero="hero => this.hero1Id = hero" />
            </div>
            <div class="column is-one-fifth">
                <div v-if="hero1Id && hero2Id">
                    <a class="button is-info"  @click="showDetails(hero1Id, hero2Id)">
                        Match
                    </a>
                </div>
            </div>
            <div class="column is-one-third">
                <Search v-on:sendHero="hero => this.hero2Id = hero" />
            </div>
        </div>
        </section>
    </div>
</template>

<script>
import Search from './Search.vue'
import Details from './Details.vue'

export default {
  name: "Page",
  components: {
      Search,
      Details
  },
  data: function (){
      return {
          detailsVisible: false,
          visible: true,
          hero1Id: null,
          hero2Id: null
      }
  },
  methods: {
    showDetails: function(arg1, arg2) {
        this.visible = false
        this.detailsVisible = true
    }
  }
};
</script>

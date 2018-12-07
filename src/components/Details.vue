<template>
    <div id="Details">
      
        <div v-if="comics" class="container">
          <div v-for="comic in comics" :key="comic.id">
            <p>{{ comic.title }}</p>
          </div>
        </div>

        <div v-else class="container">
           <progress class="progress" :value="progress" :max="total" />
        </div>

    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Details",
  props: [
      'hero1',
      'hero2'
  ],
  data: function() {
    return {
      total: 0,
      progress: 0,
      comics: null
    }
  },
  mounted: function() {
    let offset = 100

    let url1Array = []
    let i = 0
    for (i = 0; i <= this.hero1.comicsAvailable; i += offset ) {
        url1Array.push("https://gateway.marvel.com:443/v1/public/characters/" + this.hero1.id + "/comics?limit=100&offset=" + i + "&apikey=***REMOVED***")
    }

    console.log("HERO1COMICS: " + this.hero1.comicsAvailable + " ID " + this.hero1.id)
    console.log("ARRAY1: " + url1Array)

    let url2Array = []
    let j = 0
    for (j = 0; j <= this.hero2.comicsAvailable; j += offset ) {
        url2Array.push("https://gateway.marvel.com:443/v1/public/characters/" + this.hero2.id + "/comics?limit=100&offset=" + j + "&apikey=***REMOVED***")
    }

    console.log("HERO2COMICS: " + this.hero2.comicsAvailable + " ID " + this.hero2.id)
    console.log("ARRAY2: " + url2Array)

    this.total = url1Array.length + url2Array.length;
    
    let newComics1Array = [];
    // TODO: No se si esto es concurrente
    let promise1Array = url1Array.map(url =>
      axios.get(url).then(results => {
        this.progress += 1;
        results.data.data.results.forEach(element => {
          console.log("HERO1")
          newComics1Array.push(element);
        });
      })
    );

    let newComics2Array = [];
    // TODO: No se si esto es concurrente
    let promise2Array = url2Array.map(url =>
      axios.get(url).then(results => {
        this.progress += 1;
        results.data.data.results.forEach(element => {
          console.log("HERO2")
          newComics2Array.push(element);
        });
      })
    );
     
     axios.all(promise1Array)
     .then(() => axios.all(promise2Array))
     .then(() => {
       this.comics = newComics1Array.filter(obj => newComics2Array.find(o => o.id === obj.id))
     })
  }
};
</script>
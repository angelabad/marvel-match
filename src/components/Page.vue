<template>
    <div id="Page">
        <div class="columns is-centered">
            <div class="column is-one-third">
                <Search />
            </div>
            <div class="column is-one-third">
                <Search />
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
  }
};
</script>

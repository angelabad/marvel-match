<template>
    <div id="Details">

        <div>
            <p>Hero1 : {{ hero1 }}</p>
            <p>Hero2 : {{ hero2 }}</p>
        </div>

    </div>
</template>

<script>
export default {
  name: "Details",
  props: [
      'hero1',
      'hero2'
  ],
  mounted: function() {
      console.log("HEROES: " + this.hero1 + " " + this.hero2)
  }
};
</script>
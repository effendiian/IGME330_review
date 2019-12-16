<template>
  <div>
    <img 
         alt="Pokemon logo"
         src="./../assets/pokemon.jpg"
    >
    <div>
      <h1 class="md-title">{{ title }}</h1>
    </div>
    <md-tooltip md-direction="top">What kind of music does your Pokemon like?</md-tooltip>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  props: {
    title: undefined
  }
}  
</script>

<style scoped>
  img {
    max-width: 300px;
  }
  
  h1 {
    font-size: 24px;
  }
  
</style>
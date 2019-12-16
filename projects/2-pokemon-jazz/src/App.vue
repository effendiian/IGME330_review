<template>
  <div id="app">
      <Navigation title="WHAT MUSIC DO THEY LOVE?" />
      <SearchBar @search="handleSearchResults($event)" placeholder="What Pokemon do you want to find?" />
    
      <md-snackbar :md-active.sync="results">{{ output }}</md-snackbar>
    
  </div>
</template>

<script>
  import Navigation from './components/Navigation.vue'
  import SearchBar from './components/Search.vue'    

  export default {
    name: 'app',
    data: function() {
      return {
        output: null,
        results: false
      }
    },
    methods: {
      handleSearchResults: function(e){
        [ this.results, this.output ] = e;
      }      
    },
    components: {
      Navigation,
      SearchBar
    }
  }
</script>

<style>
  html {
    background-image: url('./assets/doodles.png');
    background-repeat: repeat;
    background-color: #fff;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    margin: 60px;
    padding: 50px;
    border: 1px solid #ddd;
    border-radius: 50px;
    background-color: #fff;
  }

</style>

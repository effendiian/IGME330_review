<template>
  <div id="app">
      <Navigation title="WHAT MUSIC DO THEY LOVE?" />
      <SearchBar @search="searchPokemon($event)" placeholder="What Pokemon do you want to find?" />
      <Content v-if="hasResults" v-bind:pokemon="results" />
      <History />
  </div>
</template>

<script>
  
  // Vue Components.
  import Navigation from './components/Navigation.vue'
  import SearchBar from './components/Search.vue'    
  import Content from './components/Content.vue'   
  import History from './components/History.vue'
  
  // API services.
  // import PokeAPI from './app/poke-api.js';
  // import MusicAPI from './app/music-api.js';
  // import FirebaseAPI from './app/firebase-api.js';
    
  export default {
    name: 'app',
    data: function() {
      return {
        results: [],
        hasResults: false,
      }
    },
    created: function() {
            
      // Initialize when the application is created.
      /* FirebaseAPI.initialize();
      
      PokeAPI.getURL("ditto").then((e) => {
        this.url = e;
        
        PokeAPI.getData(this.url).then((e) => {
          let json = JSON.parse(e.target.responseText);
          this.payload = {
            pokemon: json.name,
            sprite: json.sprites.front_default
          };
        }).catch((error) => {
          this.payload = error;
        });
        
        
      }).catch((error) => {
        this.url = error;
      });
      
      MusicAPI.getGenre().then((e) => {
        this.music = e.target.responseText;
      }); */
      
      
    },
    methods: {
      searchPokemon: function(e) {
        
        // Get valid search keyword.
        [ this.results ] = e;
        
        // Check if results exist.
        this.hasResults = (this.results) && (!(this.results.error) || (this.results.length > 0));
        
      },  
    },
    components: {
      Navigation,
      SearchBar,
      Content,
      History
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

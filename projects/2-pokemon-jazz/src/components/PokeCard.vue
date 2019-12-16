<template>
  <md-card class="md-info">
    <md-card-header>
      <md-card-header-text>
        <div class="md-title">{{ pokemon }}</div>
        <div class="md-subhead">{{ pokemon }} loves to listen to {{ genre }}!</div>
      </md-card-header-text>
      
      <md-card-media>
        <img v-bind:src="sprite" alt="Pokemon" />
      </md-card-media>
    </md-card-header>

    <md-card-actions>
        <md-button v-if="liked" class="md-icon-button md-primary" v-on:click="likeEntry">
          <md-icon>favorite</md-icon>
        </md-button>
        <md-button v-else class="md-icon-button" v-on:click="likeEntry">
          <md-icon>favorite</md-icon>
        </md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
export default {
  name: "PokeCard",
  props: {
    pokemon: null,
    sprite: null,
    genre: null 
  },
  data: function() {
    return {
      // pokemon: "Ditto",
      // genre: "Jazzy Ska",
      liked: false
    }
  }, 
  methods: {
    likeEntry: function() {
      this.liked = !this.liked;
      
      let key = `PokeCards`;
      let id = `${this.pokemon.name}${this.genre}`;
      let array = window.localStorage.getItem(key) || [];
      
      let contains = false;
      let index = 0;
      for( let i = array.length - 1; i >= 0; i--){
        if(array[i].id === id){
          contains = true;
          index = i;
          break;
        }
      }
      
      if(this.liked){
        if(!contains){
          array.push({
            id: id,
            name: this.pokemon.name,
            sprite: this.sprite,
            genre: this.genre
          });
        }
      } else {
        if(contains){
          array.splice(index, 1);          
        }
      }
      
      window.localStorage.setItem(key, array);
    }
  }
};
</script>

<style scoped>

</style>
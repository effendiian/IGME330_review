<template>
  <div class="md-layout md-gutter md-alignment-center">
    <md-content class="md-primary md-layout-item md-size-50 md-small-size-100">
      <h1 v-if="pokemon" class="md-title">Your pokemon "{{ pokemon.lastSearch }}" was caught!</h1>
      <carousel v-if="pokemon">
        <slide v-for="card in cards" v-bind:key="card.pokemon">
          <PokeCard v-bind:pokemon="card.pokemon" v-bind:genre="card.genre" v-bind:sprite="card.sprite" />
        </slide>
      </carousel>      
    </md-content>
  </div>
</template>

<script>
  
import PokeCard from './PokeCard.vue';
import MusicAPI from './../app/music-api.js';
  
  
export default {
  name: 'Content',
  props: {
    pokemon: null
  },
  data: function() {
    return {
      cards: []
    }    
  },
  created: function(){
    if(this.pokemon){     
      let entry = {
        pokemon: this.pokemon.name,
        sprite: this.pokemon.sprite,
        genre: null
      };
      
      MusicAPI.getGenre().then((e) => {
        entry.genre = JSON.parse(e.target.responseText);
        this.cards.push(entry);
      });
    }
  },
  components: {
    PokeCard
  }
};
</script>

<style scoped>
  .md-content {
    margin-top: 20px;
    justify-content: center;
    align-items: center;
  }  
</style>
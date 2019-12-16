<template>
  <div id="history" class="md-layout md-gutter md-alignment-center">
    <md-content class="md-primary md-layout-item md-size-50 md-small-size-100">
      <md-empty-state v-if="isEmpty"
            md-icon="access_time"
            md-label="Save pokemon music cards."
            md-description="You'll see cards appear here as you save them. Start by searching for a pokemon.">  
      </md-empty-state>      
      <h1 v-else-if="pokemon" class="md-title">Saved cards.</h1>
      <carousel v-if="pokemon">
        <slide v-for="card in cards" v-bind:key="card.pokemon">
          <PokeCard v-bind:pokemon="card.pokemon" v-bind:genre="card.genre" v-bind:sprite="card.sprite" />
        </slide>
      </carousel>      
    </md-content>
  </div>
</template>

<script>

  export default {    
    name: "History",        
    data: function() {
      return {
        isEmpty: true,
        cards: []
      }
    },
    created: function() {
      const key = "PokeCards";      
      const storedCards = window.localStorage.getItem(key);
      
      if(storedCards && storedCards.length > 0){
        this.isEmpty = false;
        storedCards.forEach((entry) => {
          this.cards.push({
            name: entry.name,
            sprite: entry.sprite,
            genre: entry.genre
          });          
        });        
      }
    }
  };
  
</script>

<style scoped>
  #history {
    margin-top: 50px;
  }
  
</style>
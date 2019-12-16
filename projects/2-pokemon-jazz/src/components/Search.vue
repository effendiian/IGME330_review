<template>

  <form novalidate class="search md-layout md-gutter md-alignment-center" @submit.prevent="validateName">
    <md-card md-with-hover class="md-primary md-layout-item md-size-35 md-small-size-100">
      
      <md-card-header>
        <div class="md-title">Find That Pokemon!</div>
        <div class="md-subhead">Pokemon with the matching name will return results!</div>
      </md-card-header>
      
      <md-card-content>
        <div class="md-layout md-gutter">          
          <div class="md-layout-item md-small-size-100">
            <md-field md-clearable :class="getValidationClass('pokemonName')">
              <label for="pokemonName">Search</label>
              <md-input name="pokemonName" id="search" v-model="form.pokemonName" :disabled="sending"></md-input>
              <span class="md-error" v-if="!$v.form.pokemonName.required">Pokemon name is required.</span>
              <span class="md-error" v-else-if="!$v.form.pokemonName.minLength">Too short of a Pokemon name.</span>
            </md-field>
          </div>
        </div>
      </md-card-content>  
      
      <md-progress-bar md-mode="indeterminate" v-if="sending" />
      
      <md-card-actions>
        <md-button type="submit" class="md-primary md-fab md-raised" :disabled="sending">
          <md-icon>search</md-icon>
        </md-button>
      </md-card-actions>
    </md-card>    
    
    <md-snackbar :md-active.sync="success">The pokemon "{{ lastSearch }}" was found.</md-snackbar>
    <md-snackbar :md-active.sync="error">No pokemon with the name "{{ lastSearch }}" could be found.</md-snackbar>

  </form>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, minLength } from 'vuelidate/lib/validators'
  import PokeAPI from './../app/poke-api.js'
    
  const LAST_KEY = "vue-lastSearchedPokemon";    
    
  export default {
    name: 'SearchBar',
    mixins: [ validationMixin ],
    data: function() {
      return {
        form: {
          pokemonName: null
        },
        results: null,
        lastSearch: null,
        success: false,
        error: false,
        sending: false
      }
    },
    validations: {
      form: {
        pokemonName: {
          required,
          minLength: minLength(2)
        }
      }
    },
    props: {
      placeholder: undefined,
    },
    watch: {
      results: {
        handler: function() {
          this.$emit('search', [ this.results ])
        },
        deep: true
      }
    },
    created: function() {      
      // Check if last stored name exists.
      let lastStoredName = window.localStorage.getItem(LAST_KEY) || null;
      
      if(lastStoredName){
        this.form.pokemonName = lastStoredName;
        this.lastSearch = lastStoredName;
      }      
    },
    methods: {
      search: function() {
        
        this.results = null;
        this.success = false;
        this.error = false;
        
        PokeAPI.getURL(this.form.pokemonName.toLowerCase()).then((url) => {
          let searchURL = url;
          
          this.lastSearch = this.form.pokemonName;
          this.sending = true;
          
          PokeAPI.getData(searchURL).then((e) => {    
            window.localStorage.setItem(LAST_KEY, this.form.pokemonName);
            let json = JSON.parse(e.target.responseText);
            this.results = {
              name: json.name,
              sprite: json.sprites.front_default,
              lastSearch: this.lastSearch
            };
            this.success = true;
          }).catch((error) => {
            this.results = { error };
            this.error = true;
          }).finally(() => {
            this.sending = false;
          });          
          
        }).catch(() => {
          this.sending = false;
          this.error = true;
        });
      },
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName];
        
        if(field){
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },      
      clearForm() {
        this.$v.$reset()
        this.form.pokemonName = null
      },
      validateName () {
        this.$v.$touch()
        if(!this.$v.$invalid){
          this.search()
        }
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
  #searchbar {
    padding: 6px;
    text-align: left;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin: 8px;
    font-size: 17px;
    color: #ddd;
    background: #fff;
  }
  
  #searchbar:active,
  #searchbar:focus {
    color: #fff;
    background: #212121;
    border: 1px solid #31c0ff;
    box-shadow: 0 0 0 2pt #31c0ff;
  }
  
</style>

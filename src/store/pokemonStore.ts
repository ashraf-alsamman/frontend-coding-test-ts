import { defineStore } from 'pinia'
import { fetchPokemons, fetchPokemonDetails } from '../services/pokemonService'

interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  sprites: {
    front_default: string
    back_default: string
    front_shiny: string
    back_shiny: string
  }
  abilities: any[]
  types: any[]
  stats: any[]
}

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: [] as Pokemon[],
    currentPokemon: null as Pokemon | null,
  }),

  getters: {
    getPokemonById: (state) => {
      return (pokemonId: number) =>
        state.pokemons.find((p) => p.id === pokemonId)
    },
  },

  actions: {
    async loadPokemons() {
      try {
        const results = await fetchPokemons();
    
        if (!Array.isArray(results)) {
          console.error('Invalid data structure:', results);
          return;
        }
    
        this.pokemons = results.map((pokemon: any) => {
          const urlParts = pokemon.url.split('/');
          const id = parseInt(urlParts[urlParts.length - 2]); // Parse the id to ensure it's a number
          return {
            id: id,
            name: pokemon.name,
            height: 0, // Provide default values for missing properties
            weight: 0,
            sprites: {
              front_default: '',
              back_default: '',
              front_shiny: '',
              back_shiny: '',
            },
            abilities: [],
            types: [],
            stats: [],
          };
        });
      } catch (error) {
        console.error('Error loading pokemons:', error);
      }
    },
    

    async loadPokemonDetails(pokemonId: number) {
      const details = await fetchPokemonDetails(pokemonId)
      if (details) {
        this.currentPokemon = {
          id: details.id,
          name: details.name,
          height: details.height,
          weight: details.weight,
          sprites: { ...details.sprites },
          abilities: { ...details.abilities },
          types: { ...details.types },
          stats: { ...details.stats },
        }
      }
    },
  },
})

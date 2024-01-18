import axios from 'axios'

import API_BASE_URL from '../config/config'

export async function fetchPokemons() {
  try {
    const response = await axios.get(`${API_BASE_URL}?limit=100`)
    return response.data.results
  } catch (error) {
    console.error('Failed to fetch pokemons:', error)
    return []
  }
}

export async function fetchPokemonDetails(pokemonId: number) {
  try {
    const response = await axios.get(`${API_BASE_URL}/${pokemonId}`)
    return response.data
  } catch (error) {
    console.error(`Failed to fetch details for pokemon ${pokemonId}:`, error)
    return null
  }
}

<template>
  <div class="pokemon-container">
    <div class="header">
      <router-link to="/" class="home-link">Home</router-link>
    </div>

    <div class="pokemon-details" v-if="!loading">
      <div class="pokemon-header">
        <h1>{{ pokemon?.name }}</h1>
      </div>
      <div class="pokemon-body">
        <div class="pokemon-image">
          <img :src="pokemon?.sprites.front_default" alt="front default" />
          <br />
          <img :src="pokemon?.sprites.back_default" alt="back default" />
          <br />
          <img :src="pokemon?.sprites.front_shiny" alt="front shiny" />
          <br />
          <img :src="pokemon?.sprites.back_shiny" alt="back shiny" />
        </div>
        <div class="pokemon-info">
          <p>
            <strong>Height:</strong>
            <span class="dimension_value"> {{ pokemon?.height }}</span>
          </p>
          <p>
            <strong>Weight:</strong>
            <span class="dimension_value"> {{ pokemon?.weight }}</span>
          </p>

          <div class="section">
            <h2>Abilities</h2>
            <ul>
              <li
                v-for="ability in pokemon?.abilities"
                :key="ability.ability.name"
              >
                {{ ability.ability.name }}
              </li>
            </ul>
          </div>

          <div class="section">
            <h2>Types</h2>
            <ul>
              <li v-for="type in pokemon?.types" :key="type.type.name">
                {{ type.type.name }}
              </li>
            </ul>
          </div>

          <div class="section">
            <h2>Stats</h2>
            <ul>
              <li v-for="stat in pokemon?.stats" :key="stat.stat.name">
                {{ stat.stat.name }}: {{ stat.base_stat }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="loading">Loading Pokémon data...</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePokemonStore } from '../store/pokemonStore'
import { useToastStore } from '../store/ToastStore'

export default defineComponent({
  setup() {
    const toastStore = useToastStore()
    const route = useRoute()
    const pokemonId = parseInt(route?.params.id as string)
    const store = usePokemonStore()
    const loading = ref(true)

    onMounted(async () => {
      if (!isNaN(pokemonId)) {
        try {
          await store.loadPokemonDetails(pokemonId)
          loading.value = false
          toastStore.showToast('Pokemon details been loaded', 3000)
        } catch (error) {
          console.error('Error fetching Pokémon data:', error)
          toastStore.showToast('Error fetching Pokémon data', 3000)
          loading.value = false
        }
      } else {
        loading.value = false
      }
    })

    return {
      pokemon: computed(() => store.currentPokemon),
      loading,
    }
  },
})
</script>

<style scoped>
.pokemon-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
h2 {
  font-size: 17px;
  color: rgb(75 131 184);
}
.dimension_value {
  color: #2eb5e3;
}
ul {
  font-size: 13px;
  color: #2eb5e3;
}
.capitalize {
  text-transform: capitalize;
}

.header {
  text-align: left;
  margin-bottom: 20px;
  margin-top: -62px;
}

.home-link {
  text-decoration: none;
  color: rgb(75 131 184);
  font-size: 1.2em;
}

.pokemon-details {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.pokemon-header {
  background-color: #f8f8f8;
  padding: 15px;
  text-align: center;
}

.pokemon-header h1 {
  margin: 0;
  color: rgb(75 131 184);
}

.pokemon-body {
  display: flex;
  padding: 15px;
}

.pokemon-image {
  flex: 1;
  text-align: center;
}

.pokemon-image img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.pokemon-info {
  flex: 1;
  padding-left: 20px;
  text-align: left;
}

.section {
  margin-top: 20px;
}

p {
  color: rgb(75 131 184);
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
}
.loading {
  text-align: center;
  font-size: 1.2em;
}
</style>

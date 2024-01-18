<template>
  <div class="title">
    <h4>Select a Pokémon to Receive Comprehensive Information</h4>
    <div class="glassmorphism-input">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Search Pokémon"
        class="search"
      />
    </div>
  </div>
  <div class="pokemon-list">
    <span v-if="filteredPokemons?.length > 0" class="pokemon-list">
      <div
        v-for="pokemon in filteredPokemons"
        :key="pokemon.id"
        class="pokemon-card"
      >
        <router-link :to="`/pokemon/${pokemon.id}`" class="link-full-width">
          <button class="md-button md-raised md-primary">
            {{ pokemon.name }}
          </button>
        </router-link>
      </div>
    </span>
    <div v-else>
      <p class="no-results-message">
        No Pokémon found. Try a different search term.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from 'vue';
import { usePokemonStore } from '../store/pokemonStore';
import { useToastStore } from '../store/ToastStore';

export default defineComponent({
  setup() {
    const toastStore = useToastStore();
    const store = usePokemonStore();
    const searchTerm = ref('');

    onMounted(async () => {
      await store.loadPokemons();
      toastStore.showToast('Pokemons list has been loaded', 3000);
    });

    const pokemons = computed(() => store.pokemons);

    const filteredPokemons = computed(() => {
      const term = searchTerm.value.toLowerCase();
      return pokemons.value ? pokemons.value.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(term)
      ) : [];
    });

    return {
      searchTerm,
      filteredPokemons,
    };
  },
});
</script>
 
<style scoped>
.search {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(46, 17, 17, 0.2);
  border-radius: 7px;
  text-align: center;
  padding: 10px 20px;
}

.search:focus {
  background: rgb(248, 248, 248);
  border: 1px solid rgba(73, 70, 70, 0.2);
  border-color: #888888;
  outline: none; /* Remove default focus outline */
}

.glassmorphism-input {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 10px;
}

.no-results-message {
  color: rgb(75 131 184);
  text-align: center;
  margin: 6px 0px 20px 0px;
}

a {
  text-decoration: none;
  background-color: transparent;
  font-size: 22px;
  height: inherit;
}
.link-full-width {
  display: block;
  text-decoration: none;
  color: inherit;
}
.title {
  color: rgb(75 131 184);
  margin: 12px 10px 9px 10px;
}

.md-primary {
  color: rgb(75 131 184);
}

.md-button {
  width: 100%;
  height: 100%;
}

.pokemon-list {
  padding-top: 14px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: rgb(248, 248, 248);
}

.pokemon-card {
  width: 300px;
  height: 80px;
  margin: 10px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.pokemon-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.pokemon-image {
  height: 200px;
  object-fit: cover;
}

.v-btn {
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  color: #007bff;
  font-weight: bold;
  font-size: 1.1em;
  border-radius: 20px;
  padding: 10px 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    transform 0.3s ease;
}

.v-btn:hover {
  background-color: rgba(255, 255, 255, 1);
  color: #0056b3;
  transform: scale(1.05);
  cursor: pointer;
}

.pokemon-animation {
  animation: fadeIn 1s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { shallowMount } from '@vue/test-utils';
import PokemonListComponent from '../components/PokemonList.vue';
import { usePokemonStore } from '../store/pokemonStore';
import { useToastStore } from '../store/ToastStore';

// Mock the store modules
jest.mock('../store/pokemonStore');
jest.mock('../store/ToastStore');

describe('PokemonListComponent', () => {
  it('renders with mock data', async () => {
    // Mocked data
    const mockPokemons = [
      { id: 1, name: 'Bulbasaur' },
      { id: 2, name: 'Charmander' },
    ];

    // Mock the loadPokemons action in the usePokemonStore
    (usePokemonStore as any).mockImplementation(() => {
      return {
        pokemons: mockPokemons,
        loadPokemons: jest.fn().mockResolvedValue(mockPokemons),
      };
    });

    // Mock the showToast method in the ToastStore
    (useToastStore as any).mockImplementation(() => {
      return {
        showToast: jest.fn(),
      };
    });

    const app = createApp(PokemonListComponent);
    const pinia = createPinia();
    app.use(pinia);

    const wrapper = shallowMount(PokemonListComponent, {
      global: {
        plugins: [usePokemonStore() as any, useToastStore() as any],
      },
    });

    // Wait for any asynchronous tasks to complete
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('Bulbasaur');
    expect(wrapper.text()).toContain('Charmander');
  });

});

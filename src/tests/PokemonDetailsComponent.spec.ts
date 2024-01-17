import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { shallowMount } from '@vue/test-utils';
import PokemonDetailsComponent from '../components/PokemonDetails.vue';
import { usePokemonStore } from '../store/pokemonStore';
import { useToastStore } from '../store/ToastStore';

// Mock the store modules
jest.mock('../store/pokemonStore');
jest.mock('../store/ToastStore');

describe('PokemonDetailsComponent', () => {
  it('renders with mock data', async () => {
    // Mocked data
    const mockPokemon = {
      id: 1,
      name: 'Bulbasaur',
      sprites: {
        front_default: 'mock_front_default_url',
        back_default: 'mock_back_default_url',
        front_shiny: 'mock_front_shiny_url',
        back_shiny: 'mock_back_shiny_url',
      },
      height: 7,
      weight: 69,
      abilities: [{ ability: { name: 'chlorophyll' } }],
      types: [{ type: { name: 'grass' } }],
      stats: [{ stat: { name: 'hp' }, base_stat: 45 }],
    };

    // Mock the loadPokemonDetails action in the usePokemonStore
    (usePokemonStore as any).mockImplementation(() => {
      return {
        currentPokemon: mockPokemon,
        loadPokemonDetails: jest.fn().mockResolvedValue(mockPokemon),
      };
    });

    // Mock the showToast method in the ToastStore
    (useToastStore as any).mockImplementation(() => {
      return {
        showToast: jest.fn(),
      };
    });

    const app = createApp(PokemonDetailsComponent);
    const pinia = createPinia();
    app.use(pinia);

    const wrapper = shallowMount(PokemonDetailsComponent, {
      global: {
        plugins: [usePokemonStore() as any, useToastStore() as any],
      },
    });

    // Wait for any asynchronous tasks to complete
    await wrapper.vm.$nextTick();

     expect(wrapper.text()).toContain('Bulbasaur');
   });

});

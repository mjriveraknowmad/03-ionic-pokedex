/**
 * Ejemplos de uso del generador de datos de Pokémon
 */

import {
  generatePokemonData,
  generateMultiplePokemon,
  generatePokemonDictionary,
  generateCustomPokemon,
} from './pokemonDataGenerator';

// ============================================
// EJEMPLO 1: Generar un Pokémon individual
// ============================================
export const example1_SinglePokemon = generatePokemonData(1);
// Resultado: {
//   id: 1,
//   name: 'bulbasaur',
//   base_experience: 64,
//   height: 7,
//   weight: 69,
//   types: [...],
//   sprites: {...},
//   stats: [...],
//   abilities: [...]
// }

// ============================================
// EJEMPLO 2: Generar múltiples Pokémon
// ============================================
export const example2_MultiplePokemon = generateMultiplePokemon(1, 10);
// Resultado: Array de 10 Pokémon (IDs 1-10)

// ============================================
// EJEMPLO 3: Diccionario de Pokémon (primera generación)
// ============================================
export const example3_PokemonDictionary = generatePokemonDictionary(1, 151);
// Resultado: { 1: {...}, 2: {...}, ..., 151: {...} }

// ============================================
// EJEMPLO 4: Pokémon personalizado
// ============================================
export const example4_CustomPokemon = generateCustomPokemon({
  id: 25,
  name: 'pikachu-special',
  types: ['electric'],
  height: 12,
  weight: 120,
  baseExperience: 112,
});

// ============================================
// EJEMPLO 5: Usar en el servicio Pokemon
// ============================================
export class EnhancedPokemonService {
  private pokemonDict = generatePokemonDictionary(1, 151);

  getPokemonById(id: number) {
    // Intentar obtener del servidor, si falla, usar mock generado
    return this.pokemonDict[id] || generatePokemonData(id);
  }

  getPokemonRange(startId: number, endId: number) {
    return generateMultiplePokemon(startId, endId - startId + 1);
  }

  searchPokemon(id: number) {
    return generatePokemonData(id);
  }
}

// ============================================
// EJEMPLO 6: En el componente de lista
// ============================================
export class PokemonDetailComponent {
  pokemonId = 1;
  pokemonData: any;

  ngOnInit() {
    this.loadPokemonData();
  }

  loadPokemonData() {
    // Simular llamada HTTP que falla
    this.pokemonData = generatePokemonData(this.pokemonId);
  }

  nextPokemon() {
    this.pokemonId++;
    this.loadPokemonData();
  }

  previousPokemon() {
    if (this.pokemonId > 1) {
      this.pokemonId--;
      this.loadPokemonData();
    }
  }
}

// ============================================
// EJEMPLO 7: Generar 100 Pokémon para testing
// ============================================
export const example7_BulkGeneration = generatePokemonDictionary(1, 100);

// ============================================
// EJEMPLO 8: Generar Pokémon con características específicas
// ============================================
export const example8_FireTypePokemon = generateCustomPokemon({
  id: 4,
  name: 'charmander-variant',
  types: ['fire'],
  height: 6,
  weight: 85,
  baseExperience: 62,
});

export const example8_WaterTypePokemon = generateCustomPokemon({
  id: 7,
  name: 'squirtle-variant',
  types: ['water'],
  height: 5,
  weight: 90,
  baseExperience: 63,
});

export const example8_GrassTypePokemon = generateCustomPokemon({
  id: 1,
  name: 'bulbasaur-variant',
  types: ['grass', 'poison'],
  height: 7,
  weight: 69,
  baseExperience: 64,
});

// ============================================
// EJEMPLO 9: Mock para testing
// ============================================
export const mockPokemonList = {
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
  ],
};

export const mockPokemonDataMap = generatePokemonDictionary(1, 10);

// ============================================
// EJEMPLO 10: Búsqueda y filtrado
// ============================================
export class PokemonSearchService {
  private allPokemons = generatePokemonDictionary(1, 151);

  getPokemonById(id: number) {
    return this.allPokemons[id];
  }

  getPokemonsByType(type: string) {
    return Object.values(this.allPokemons).filter(pokemon =>
      pokemon.types.some(t => t.type.name === type)
    );
  }

  getPokemonsById(ids: number[]) {
    return ids.map(id => this.allPokemons[id]);
  }
}

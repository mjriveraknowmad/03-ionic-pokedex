/**
 * Ejemplos de uso de las funciones generadoras de mocks
 * Este archivo muestra diferentes formas de utilizar mockGenerators.ts
 */

import {
  generateMockCharacterList,
  generateMultipleMockPages,
  generateCustomMockList,
} from './mockGenerators';

// ============================================
// EJEMPLO 1: Generar un mock simple (primera página)
// ============================================
export const example1_FirstPage = generateMockCharacterList();
// Resultado: {
//   count: 1351,
//   next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
//   previous: null,
//   results: [
//     { name: 'dragonite', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
//     { name: 'blastoise', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
//     ...
//   ]
// }

// ============================================
// EJEMPLO 2: Segunda página (con paginación)
// ============================================
export const example2_SecondPage = generateMockCharacterList(20, 20);
// Resultado: Segunda página con offset=20

// ============================================
// EJEMPLO 3: Tercera página con límite personalizado
// ============================================
export const example3_CustomLimit = generateMockCharacterList(40, 10);
// Resultado: Items 40-50 con límite de 10 items

// ============================================
// EJEMPLO 4: Generar todas las páginas de una sola vez
// ============================================
export const example4_AllPages = generateMultipleMockPages(5, 20);
// Resultado: {
//   mockPage0: { /* página 1 */ },
//   mockPage1: { /* página 2 */ },
//   mockPage2: { /* página 3 */ },
//   mockPage3: { /* página 4 */ },
//   mockPage4: { /* página 5 */ },
// }

// ============================================
// EJEMPLO 5: Personajes inventados con nombres específicos
// ============================================
export const example5_CustomCharacters = generateCustomMockList({
  characterNames: ['phoenix', 'dragon', 'kraken', 'griffin', 'basilisk'],
  offset: 0,
  limit: 20,
  totalCount: 100,
});
// Resultado: Lista con los nombres personalizados

// ============================================
// EJEMPLO 6: Usar en un servicio HTTP
// ============================================
export class MockPokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  // Simulando respuesta del servidor
  getPokemonList(offset: number = 0, limit: number = 20) {
    return generateMockCharacterList(offset, limit);
  }

  // Simulando búsqueda con nombres específicos
  searchCustomCharacters(names: string[]) {
    return generateCustomMockList({
      characterNames: names,
      limit: names.length,
    });
  }
}

// ============================================
// EJEMPLO 7: Usar en un componente Angular
// ============================================
export class PokemonListComponent {
  currentPage = 0;
  itemsPerPage = 20;
  pokemonList: any[] = [];

  ngOnInit() {
    this.loadPokemonList();
  }

  loadPokemonList() {
    const offset = this.currentPage * this.itemsPerPage;
    const mockData = generateMockCharacterList(offset, this.itemsPerPage);
    this.pokemonList = mockData.results;
  }

  nextPage() {
    this.currentPage++;
    this.loadPokemonList();
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadPokemonList();
    }
  }
}

// ============================================
// EJEMPLO 8: Nombres personalizados para diferentes temas
// ============================================

export const mythicalCreaturesNames = [
  'phoenix', 'dragon', 'kraken', 'griffin', 'basilisk',
  'chimera', 'cerberus', 'minotaur', 'pegasus', 'unicorn',
];

export const robotNames = [
  'sentinel', 'terminator', 'replicant', 'android', 'droid',
  'cyborg', 'automaton', 'golem', 'colossus', 'titan',
];

export const alienNames = [
  'zorgon', 'krell', 'vortian', 'xenos', 'mantis',
  'arachnid', 'reptilian', 'humanoid', 'grey', 'nordic',
];

export const example8_MythicalCreatures = generateCustomMockList({
  characterNames: mythicalCreaturesNames,
  limit: 10,
  totalCount: 100,
});

export const example8_Robots = generateCustomMockList({
  characterNames: robotNames,
  limit: 10,
  totalCount: 100,
});

export const example8_Aliens = generateCustomMockList({
  characterNames: alienNames,
  limit: 10,
  totalCount: 100,
});

/**
 * Generador dinámico de datos de Pokémon
 * Crea mocks realistas de Pokémon individuales basados en un ID
 */

import { PokemonResponse, Ability, Stat, Type, Species } from '../pages/models/pokemon.model';

/**
 * Nombres de Pokémon para generar variantes
 */
const pokemonBaseNames = [
  'bulbasaur', 'ivysaur', 'venusaur', 'charmander', 'charmeleon',
  'charizard', 'squirtle', 'wartortle', 'blastoise', 'caterpie',
  'metapod', 'butterfree', 'weedle', 'kakuna', 'beedrill',
  'pidgeot', 'pidgeotto', 'pidgeot', 'rattata', 'raticate',
  'spearow', 'fearow', 'ekans', 'arbok', 'pikachu',
  'raichu', 'pichu', 'clefairy', 'clefable', 'vulpix',
  'ninetales', 'jigglypuff', 'wigglytuff', 'zubat', 'golbat',
  'oddish', 'gloom', 'vileplume', 'paras', 'parasect',
];

/**
 * Tipos disponibles de Pokémon
 */
const pokemonTypes = [
  'normal', 'fire', 'water', 'electric', 'grass',
  'ice', 'fighting', 'poison', 'ground', 'flying',
  'psychic', 'bug', 'rock', 'ghost', 'dragon',
  'dark', 'steel', 'fairy',
];

/**
 * Habilidades disponibles
 */
const pokemonAbilities = [
  'overgrow', 'blaze', 'torrent', 'static', 'compound-eyes',
  'lightning-rod', 'water-absorb', 'battle-armor', 'serene-grace', 'swift-swim',
  'chlorophyll', 'illuminate', 'natural-cure', 'shed-skin', 'wonder-guard',
  'trace', 'klutz', 'filter', 'motor-drive', 'water-bubble',
  'schooling', 'symbiosis', 'alchemy', 'power-of-alchemy', 'aura-break',
];

/**
 * Nombres de estadísticas
 */
const statNames = [
  'hp', 'attack', 'defense', 'sp-atk', 'sp-def', 'speed'
];

/**
 * Obtiene un nombre de Pokémon basado en el ID
 */
function getPokemonName(id: number): string {
  return pokemonBaseNames[(id - 1) % pokemonBaseNames.length];
}

/**
 * Obtiene un tipo aleatorio
 */
function getRandomType(seed: number): string {
  return pokemonTypes[seed % pokemonTypes.length];
}

/**
 * Obtiene habilidades basadas en el ID
 */
function getPokemonAbilities(id: number): Ability[] {
  const abilities: Ability[] = [];
  const baseAbility = pokemonAbilities[id % pokemonAbilities.length];
  const secondAbility = pokemonAbilities[(id + 1) % pokemonAbilities.length];
  const hiddenAbility = pokemonAbilities[(id + 2) % pokemonAbilities.length];

  abilities.push({
    is_hidden: false,
    slot: 1,
    ability: {
      name: baseAbility,
      url: `https://pokeapi.co/api/v2/ability/${id}/`,
    },
  });

  abilities.push({
    is_hidden: false,
    slot: 2,
    ability: {
      name: secondAbility,
      url: `https://pokeapi.co/api/v2/ability/${id + 1}/`,
    },
  });

  abilities.push({
    is_hidden: true,
    slot: 3,
    ability: {
      name: hiddenAbility,
      url: `https://pokeapi.co/api/v2/ability/${id + 2}/`,
    },
  });

  return abilities;
}

/**
 * Genera estadísticas de batalla (IV: HP, Attack, Defense, Sp.Atk, Sp.Def, Speed)
 */
function generateStats(id: number): Stat[] {
  const baseStats = [45, 49, 49, 65, 65, 45];

  return statNames.map((statName, index) => {
    const baseStat = baseStats[index] + (id % 20);
    return {
      base_stat: baseStat,
      effort: Math.floor(Math.random() * 3),
      stat: {
        name: statName,
        url: `https://pokeapi.co/api/v2/stat/${index + 1}/`,
      },
    };
  });
}

/**
 * Genera tipos del Pokémon
 */
function generateTypes(id: number): Type[] {
  const type1 = getRandomType(id);
  const types: Type[] = [
    {
      slot: 1,
      type: {
        name: type1,
        url: `https://pokeapi.co/api/v2/type/${pokemonTypes.indexOf(type1) + 1}/`,
      },
    },
  ];

  // 70% de probabilidad de tener un segundo tipo
  if (id % 10 < 7) {
    const type2 = getRandomType(id + 1);
    if (type2 !== type1) {
      types.push({
        slot: 2,
        type: {
          name: type2,
          url: `https://pokeapi.co/api/v2/type/${pokemonTypes.indexOf(type2) + 1}/`,
        },
      });
    }
  }

  return types;
}

/**
 * Genera altura en decímetros
 */
function generateHeight(id: number): number {
  return 5 + (id % 20);
}

/**
 * Genera peso en hectogramos
 */
function generateWeight(id: number): number {
  return 60 + (id % 50) * 2;
}

/**
 * Genera URL de sprite del Pokémon
 */
function getSpriteUrl(id: number): string {
  // URL de sprite oficial de PokeAPI
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

/**
 * Genera un Pokémon individual completo
 */
export function generatePokemonData(id: number): PokemonResponse {
  const name = getPokemonName(id);

  return {
    id,
    name,
    base_experience: 64 + (id % 100),
    height: generateHeight(id),
    is_default: true,
    order: id,
    weight: generateWeight(id),
    abilities: getPokemonAbilities(id),
    past_abilities: [],
    forms: [
      {
        name,
        url: `https://pokeapi.co/api/v2/pokemon-form/${id}/`,
      },
    ],
    game_indices: [
      {
        game_index: id,
        version: {
          name: 'red',
          url: 'https://pokeapi.co/api/v2/version/1/',
        },
      },
    ],
    held_items: [],
    location_area_encounters: `https://pokeapi.co/api/v2/pokemon/${id}/encounters`,
    moves: [],
    species: {
      name,
      url: `https://pokeapi.co/api/v2/pokemon-species/${id}/`,
    },
    sprites: {
      front_default: getSpriteUrl(id),
      back_default: getSpriteUrl(id),
      front_shiny: getSpriteUrl(id),
      back_shiny: getSpriteUrl(id),
      front_female: null,
      back_female: null,
      front_shiny_female: null,
      back_shiny_female: null,
    },
    cries: {
      latest: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`,
      legacy: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/${id}.ogg`,
    },
    stats: generateStats(id),
    past_stats: [],
    types: generateTypes(id),
    past_types: [],
  };
}

/**
 * Genera múltiples Pokémon en un rango de IDs
 */
export function generateMultiplePokemon(
  startId: number,
  count: number
): PokemonResponse[] {
  const pokemons: PokemonResponse[] = [];

  for (let i = 0; i < count; i++) {
    pokemons.push(generatePokemonData(startId + i));
  }

  return pokemons;
}

/**
 * Genera un diccionario de Pokémon indexado por ID
 * Útil para simular búsquedas por ID
 */
export function generatePokemonDictionary(
  startId: number = 1,
  endId: number = 151
): Record<number, PokemonResponse> {
  const dictionary: Record<number, PokemonResponse> = {};

  for (let id = startId; id <= endId; id++) {
    dictionary[id] = generatePokemonData(id);
  }

  return dictionary;
}

/**
 * Genera datos de Pokémon con configuración personalizada
 */
export function generateCustomPokemon(options: {
  id: number;
  name?: string;
  types?: string[];
  height?: number;
  weight?: number;
  baseExperience?: number;
}): PokemonResponse {
  const pokemon = generatePokemonData(options.id);

  if (options.name) {
    pokemon.name = options.name;
    pokemon.species.name = options.name;
    pokemon.forms[0].name = options.name;
  }

  if (options.height) {
    pokemon.height = options.height;
  }

  if (options.weight) {
    pokemon.weight = options.weight;
  }

  if (options.baseExperience) {
    pokemon.base_experience = options.baseExperience;
  }

  if (options.types && options.types.length > 0) {
    pokemon.types = options.types.map((typeName, index) => ({
      slot: index + 1,
      type: {
        name: typeName,
        url: `https://pokeapi.co/api/v2/type/${pokemonTypes.indexOf(typeName) + 1}/`,
      },
    }));
  }

  return pokemon;
}

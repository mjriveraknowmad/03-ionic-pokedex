/**
 * Funciones generadoras de mocks para listados de personajes inventados
 */

interface MockCharacter {
  name: string;
  url: string;
}

interface MockCharacterListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: MockCharacter[];
}

/**
 * Lista de nombres inventados para generar personajes aleatorios
 */
const inventedCharacterNames = [
  'dragonite', 'blastoise', 'venomoth', 'arcanine', 'lapras',
  'snorlax', 'articuno', 'zapdos', 'moltres', 'dragonite',
  'mewtwo', 'mew', 'chikorita', 'bayleef', 'meganium',
  'cyndaquil', 'quilava', 'typhlosion', 'totodile', 'croconaw',
  'feraligatr', 'sentret', 'furret', 'hoothoot', 'noctowl',
  'ledyba', 'ledian', 'spinarak', 'girafarig', 'dunsparce',
  'girafarig', 'snubbull', 'granbull', 'qwilfish', 'corsola',
  'remoraid', 'octillery', 'mantine', 'skarmory', 'houndour',
  'houndoom', 'phanpy', 'donphan', 'porygon2', 'steelix',
  'scizor', 'shining', 'tyranitar', 'lugia', 'ho-oh',
];

/**
 * Genera un nombre único con variación
 */
function generateUniqueName(baseName: string, index: number): string {
  if (index === 0) return baseName;
  return `${baseName}-${index}`;
}

/**
 * Calcula el ID del Pokémon basado en el índice
 */
function calculatePokemonId(offset: number, itemIndex: number): number {
  return offset + itemIndex + 1;
}

/**
 * Genera un mock de personaje individual
 */
function generateMockCharacter(
  name: string,
  pokemonId: number,
  baseUrl: string = 'https://pokeapi.co/api/v2/pokemon'
): MockCharacter {
  return {
    name: name,
    url: `${baseUrl}/${pokemonId}/`,
  };
}

/**
 * Genera una lista de personajes inventados
 * @param offset - Número de items que ya se han recuperado
 * @param limit - Cantidad de items a generar en esta página
 * @param totalCount - Total de items disponibles (default: 1351)
 * @param baseUrl - URL base para los recursos
 * @returns Respuesta con formato similar a PokeAPI
 */
export function generateMockCharacterList(
  offset: number = 0,
  limit: number = 20,
  totalCount: number = 1351,
  baseUrl: string = 'https://pokeapi.co/api/v2/pokemon'
): MockCharacterListResponse {
  const results: MockCharacter[] = [];

  for (let i = 0; i < limit && offset + i < totalCount; i++) {
    const characterIndex = (offset + i) % inventedCharacterNames.length;
    const characterName = inventedCharacterNames[characterIndex];
    const uniqueName = generateUniqueName(characterName, Math.floor((offset + i) / inventedCharacterNames.length));
    const pokemonId = calculatePokemonId(offset, i);

    results.push(generateMockCharacter(uniqueName, pokemonId, baseUrl));
  }

  const currentOffset = offset;
  const nextOffset = offset + limit;
  const hasNextPage = nextOffset < totalCount;

  return {
    count: totalCount,
    next: hasNextPage ? `${baseUrl}?offset=${nextOffset}&limit=${limit}` : null,
    previous: offset > 0 ? `${baseUrl}?offset=${Math.max(0, offset - limit)}&limit=${limit}` : null,
    results,
  };
}

/**
 * Genera múltiples páginas de mocks de una sola vez
 * @param pageCount - Cantidad de páginas a generar
 * @param itemsPerPage - Items por página
 * @param totalCount - Total de items disponibles
 * @returns Objeto con claves "mockPage0", "mockPage1", etc.
 */
export function generateMultipleMockPages(
  pageCount: number = 5,
  itemsPerPage: number = 20,
  totalCount: number = 1351
): Record<string, MockCharacterListResponse> {
  const result: Record<string, MockCharacterListResponse> = {};

  for (let page = 0; page < pageCount; page++) {
    const offset = page * itemsPerPage;
    result[`mockPage${page}`] = generateMockCharacterList(
      offset,
      itemsPerPage,
      totalCount
    );
  }

  return result;
}

/**
 * Genera un mock específico con opciones personalizadas
 */
export function generateCustomMockList(options: {
  characterNames?: string[];
  offset?: number;
  limit?: number;
  totalCount?: number;
  baseUrl?: string;
}): MockCharacterListResponse {
  const {
    characterNames = inventedCharacterNames,
    offset = 0,
    limit = 20,
    totalCount = 1351,
    baseUrl = 'https://pokeapi.co/api/v2/pokemon',
  } = options;

  const results: MockCharacter[] = [];

  for (let i = 0; i < limit && offset + i < totalCount; i++) {
    const characterIndex = (offset + i) % characterNames.length;
    const characterName = characterNames[characterIndex];
    const uniqueName = generateUniqueName(characterName, Math.floor((offset + i) / characterNames.length));
    const pokemonId = calculatePokemonId(offset, i);

    results.push(generateMockCharacter(uniqueName, pokemonId, baseUrl));
  }

  const nextOffset = offset + limit;
  const hasNextPage = nextOffset < totalCount;

  return {
    count: totalCount,
    next: hasNextPage ? `${baseUrl}?offset=${nextOffset}&limit=${limit}` : null,
    previous: offset > 0 ? `${baseUrl}?offset=${Math.max(0, offset - limit)}&limit=${limit}` : null,
    results,
  };
}

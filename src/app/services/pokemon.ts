import { Service, signal } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { PokemonListResponse } from '../pages/models/pokemon-list.model';
import {
  Ability,
  IPokemon,
  IStat,
  PokemonResponse,
} from '../pages/models/pokemon.model';
import { generateMockCharacterList } from './mockGenerators';
import { generatePokemonData } from './pokemonDataGenerator';

@Service()
export class Pokemon {
  private readonly URL_BASE = 'https://pokeapi.co/api/v2/pokemon';
  private readonly nextUrl = signal(`${this.URL_BASE}?offset=0&limit=0`);
  readonly pokemons = signal<IPokemon[]>([]);
  private readonly limit = signal(10);
  private readonly offset = signal(0);

  getPokemons() {
    if (!this.nextUrl()) {
      return null;
    }
    const options = { url: this.nextUrl(), params: {} };
    return CapacitorHttp
      .get(options)
      .then(async (response) => {
        if (!response.data) return;

        const results = (response.data as PokemonListResponse).results;
        const pokemons = await this.getPokemonsDetails(results);
        this.pokemons.update((current) => [...current, ...pokemons]);
      })
      .catch(async (error) => {
        const page = generateMockCharacterList(this.offset(), this.limit());
        const pokemons = await this.getPokemonsDetails(page.results);
        const nextUrl = page.next;
        if (nextUrl) {
          const urlParams = new URLSearchParams(nextUrl.split('?')[1]);
          this.offset.set(+urlParams.get('offset')!);
          this.limit.set(+urlParams.get('limit')!);
        }
        this.pokemons.update((current) => [...current, ...pokemons]);
      });
  }

  private async getPokemonsDetails(
    results: PokemonListResponse['results']
  ): Promise<IPokemon[]> {
    const promises = results.map((pokemon) =>
      CapacitorHttp.get({ url: pokemon.url, params: {} })
        .then((response) =>
          this.mapperPokemon(response.data as PokemonResponse)
        )
        .catch(() => {
          const id = +(pokemon.url.split('/').slice(-2, -1)[0]);
          return this.mapperPokemon(generatePokemonData(id));
        })
    );

    return Promise.all(promises);
  }

  getPokemon(id: number) {
    const options = { url: `${this.URL_BASE}/${id}`, params: {} };

    return CapacitorHttp.get(options)
    .then((response) =>
      this.mapperPokemon(response.data)
    )
    .catch(() => {
      return this.mapperPokemon(generatePokemonData(id));
    });
  }

  private mapperPokemon(pokemonData: PokemonResponse): IPokemon {
    const pokemon: IPokemon = {
      id: pokemonData.id,
      name: pokemonData.name,
      type1: pokemonData.types[0].type.name,
      sprite: pokemonData.sprites.front_default,
      weight: pokemonData.weight / 10,
      height: pokemonData.height / 10,
      stats: pokemonData.stats.map((stat) => ({
        base_stat: stat.base_stat,
        name: stat.stat.name,
      })) as IStat[],
      abilities: pokemonData.abilities
        .filter((ability) => !ability.is_hidden && ability.ability)
        .map((ability: Ability) => ability.ability!.name),
    };

    if (pokemonData.types[1]) {
      pokemon.type2 = pokemonData.types[1].type.name;
    }

    const hiddenAbility = pokemonData.abilities.find(
      (ability) => ability.is_hidden
    );

    if (hiddenAbility) {
      pokemon.hiddenAbility = hiddenAbility.ability?.name;
    }

    return pokemon;
  }
}

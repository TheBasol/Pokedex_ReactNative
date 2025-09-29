import { Pokemon } from "../../domain/entities/pokemon";
import { pokeApi } from "../../config/api/pokeApi";
import { PokeAPIPaginatedResponse, PokeAPIPokemon } from "../../infrastructure/interfaces/pokeapi.interfaces";
import { PokemonMapper } from "../../infrastructure/mappers/pokemon.mapper";

export const getPokemons = async (page: number, limit: number = 20): Promise<Pokemon[]> => {

    try {
        const url = `/pokemon?offset=${(page * 10) * limit}&limit=${limit}`;
        const { data } = await pokeApi.get<PokeAPIPaginatedResponse>(url);


        const pokemonPromises = data.results.map((info) => {
            return pokeApi.get<PokeAPIPokemon>(info.url);
        });

        const pokeAPIPokemons = await Promise.all(pokemonPromises);
        const pokemons = await Promise.all(pokeAPIPokemons.map(item => PokemonMapper.pokeApiPokemonToEntity(item.data)));

        return pokemons;
    } catch (error) {
        console.error("Error fetching pokemons:", error);
        throw error;
    }
};
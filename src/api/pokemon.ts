import { minimumLoadingTime } from "@/lib/mininumLoadingTime";
import { Pokemon, PokemonListResponse } from "@/types/pokemon";
import axios from "axios";

export const fetchPokemonDetail = async (url: string): Promise<Pokemon> => {
  await minimumLoadingTime();
  const response = await axios.get(url);
  return response.data;
};

export const fetchPokemonList = async (
  currentPage: number
): Promise<PokemonListResponse> => {
  const itemsPerPage = 20;
  const offset = (currentPage - 1) * itemsPerPage;
  await minimumLoadingTime();
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${itemsPerPage}`
  );
  return response.data;
};

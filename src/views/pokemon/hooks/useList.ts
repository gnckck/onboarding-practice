import axios from "axios";
import { PokemonListItem, PokemonListResponse } from "@/types/pokemon";
import { useEffect, useState } from "react";
import { minimumLoadingTime } from "@/lib/mininumLoadingTime";

interface UserListProps {
  currentPage: number;
  isFirstLoaded: boolean;
}

const useList = ({ currentPage, isFirstLoaded }: UserListProps) => {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoadingPage, setLoadingPage] = useState<boolean>(false);
  const itemsPerPage = 20;

  useEffect(() => {
    if (!isFirstLoaded) {
      setLoadingPage(true);
    } /////////////////////////////////
    const fetchPokemonsByPage = async () => {
      try {
        await minimumLoadingTime();
        const offset = (currentPage - 1) * itemsPerPage;
        const response = await axios.get<PokemonListResponse>(
          `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${itemsPerPage}`
        );

        const pokemons = response.data.results;
        setPokemonList(pokemons);
        setTotalPages(Math.ceil(response.data.count / itemsPerPage));
        setLoadingPage(false);
      } catch (error) {
        console.error("", error);
      }
    };
    fetchPokemonsByPage();
  }, [currentPage]);

  return { pokemonList, totalPages, isLoadingPage };
};

export default useList;

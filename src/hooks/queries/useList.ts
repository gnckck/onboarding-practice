import { fetchPokemonList } from "@/api/pokemon";
import { useQuery } from "@tanstack/react-query";

export function useList(currentPage: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["currentPage", currentPage],
    queryFn: () => fetchPokemonList(currentPage),
    enabled: !!currentPage,
  });

  return {
    pokemonList: data?.results,
    pokemonCount: data?.count,
    loading: isLoading,
    error,
  };
}

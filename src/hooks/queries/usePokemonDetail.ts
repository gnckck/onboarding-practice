// hooks/queries/usePokemon.ts
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonDetail } from "@/api/pokemon";

export function usePokemonDetail(pokemonUrl?: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemon", pokemonUrl],
    queryFn: () => fetchPokemonDetail(pokemonUrl!),
    enabled: !!pokemonUrl,
  });

  return { pokemonDetail: data, isLoading, error };
}

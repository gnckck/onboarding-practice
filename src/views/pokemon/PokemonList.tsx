import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Pokemon, PokemonListItem } from "@/types/pokemon";
import { PaginationComponent } from "./components/PaginationComponent";
import useList from "./hooks/useList";
import { useState } from "react";
import axios from "axios";
import { minimumLoadingTime } from "@/lib/mininumLoadingTime";

interface PokemonListProps {
  isFirstLoaded: boolean;
  isPokemonInfoLoading: boolean;
  selectedPokemon: string | null;
  setPokemonDetail: React.Dispatch<React.SetStateAction<Pokemon | null>>;
  setPokemonInfoLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPokemon: React.Dispatch<React.SetStateAction<string | null>>;
}

export const PokemonList = ({
  isFirstLoaded,
  isPokemonInfoLoading,
  selectedPokemon,
  setPokemonDetail,
  setPokemonInfoLoading,
  setSelectedPokemon,
}: PokemonListProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { pokemonList, totalPages, isLoadingPage } = useList({
    currentPage,
    isFirstLoaded,
  });
  const togglePokemon = (pokemon: PokemonListItem) => {
    if (isPokemonInfoLoading) return;
    if (selectedPokemon === pokemon.name) {
      setSelectedPokemon(null);
      setPokemonDetail(null);
    } else {
      setSelectedPokemon(pokemon.name);
      fetchPokemonInfo(pokemon.url);
    }
  };

  const fetchPokemonInfo = async (pokemonUrl: string) => {
    setPokemonInfoLoading(true);
    try {
      await minimumLoadingTime();
      const response = await axios.get(pokemonUrl);
      setPokemonDetail(response.data);
    } catch (error) {
      console.error("", error);
    } finally {
      setPokemonInfoLoading(false);
    }
  };

  const PokemonListContent = () => {
    if (isFirstLoaded || isLoadingPage) {
      return (
        <div className="flex justify-center items-center h-full w-full">
          <LoadingSpinner size="lg" />
        </div>
      );
    }

    return (
      <div className="flex-1 flex flex-col">
        <div className="flex flex-wrap gap-2">
          {pokemonList.map((pokemon) => (
            <Badge
              key={pokemon.name}
              variant="outline"
              className={`m-1 cursor-pointer hover:bg-gray-100 ${
                selectedPokemon === pokemon.name ? "border-black" : ""
              } `}
              onClick={() => togglePokemon(pokemon)}
            >
              <span className="p-1">{pokemon.name}</span>
            </Badge>
          ))}
        </div>

        <PaginationComponent
          margin="mt-auto"
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    );
  };

  return (
    <Card className="p-5 w-150 mr-5">
      <h2 className="text-xl font-bold ">포켓몬 목록</h2>
      <PokemonListContent />
    </Card>
  );
};

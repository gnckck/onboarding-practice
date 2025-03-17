import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Pokemon, PokemonListItem } from "@/types/pokemon";
import { PaginationComponent } from "./components/PaginationComponent";
import usePokemonList from "./hooks/usePokemonList";

// import axios from "axios";
// import { minimumLoadingTime } from "@/lib/mininumLoadingTime";

interface PokemonListProps {
  selectedPokemonUrl: string | null;
  setPokemonDetail: React.Dispatch<React.SetStateAction<Pokemon | null>>;
  setSelectedPokemonUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

export const PokemonList = ({
  selectedPokemonUrl,
  setPokemonDetail,
  setSelectedPokemonUrl,
}: PokemonListProps) => {
  const {
    pokemonList,
    totalPages,
    isLoadingPage,
    currentPage,
    setCurrentPage,
  } = usePokemonList();

  const togglePokemon = (pokemon: PokemonListItem) => {
    if (selectedPokemonUrl === pokemon.url) {
      setSelectedPokemonUrl(null);
      setPokemonDetail(null);
    } else {
      setSelectedPokemonUrl(pokemon.url);
      // fetchPokemonInfo(pokemon.url);
    }
  };

  const PokemonListContent = () => {
    return (
      <div className="flex-1 flex flex-col">
        <div className="flex flex-wrap gap-2">
          {isLoadingPage ? (
            <div className="flex justify-center items-center h-full w-full">
              <LoadingSpinner size="lg" fullHeight={false} />
            </div>
          ) : (
            <>
              {pokemonList?.map((pokemon) => (
                <Badge
                  key={pokemon.name}
                  variant="outline"
                  className={`m-1 cursor-pointer hover:bg-gray-100 ${
                    selectedPokemonUrl === pokemon.url ? "border-black" : ""
                  } `}
                  onClick={() => togglePokemon(pokemon)}
                >
                  <span className="p-1">{pokemon.name}</span>
                </Badge>
              ))}
            </>
          )}
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

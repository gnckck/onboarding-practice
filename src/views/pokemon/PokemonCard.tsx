import { useState } from "react";
import { PokemonInfo } from "./index";
import { PokemonList } from "./PokemonList";
import { Pokemon } from "@/types/pokemon";
import useFirstLoaded from "./hooks/useFirstLoaded";

export const PokemonCard = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [pokemonDetail, setPokemonDetail] = useState<Pokemon | null>(null);
  const [isPokemonInfoLoading, setPokemonInfoLoading] =
    useState<boolean>(false);
  const { isFirstLoaded } = useFirstLoaded();

  return (
    <div className="p-5 flex h-[50vh] justify-center">
      <PokemonList
        isFirstLoaded={isFirstLoaded}
        isPokemonInfoLoading={isPokemonInfoLoading}
        selectedPokemon={selectedPokemon}
        setPokemonDetail={setPokemonDetail}
        setPokemonInfoLoading={setPokemonInfoLoading}
        setSelectedPokemon={setSelectedPokemon}
      />
      <PokemonInfo
        pokemonDetail={pokemonDetail}
        selectedPokemon={selectedPokemon}
        isPokemonInfoLoading={isPokemonInfoLoading}
      />
    </div>
  );
};

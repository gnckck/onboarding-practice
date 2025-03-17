import { useState } from "react";
import { PokemonInfo } from "./index";
import { PokemonList } from "./PokemonList";
import { Pokemon } from "@/types/pokemon";

export const PokemonCard = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [, setPokemonDetail] = useState<Pokemon | null>(null);

  return (
    <div className="p-5 flex h-[50vh] justify-center">
      <PokemonList
        selectedPokemonUrl={selectedPokemon}
        setPokemonDetail={setPokemonDetail}
        setSelectedPokemonUrl={setSelectedPokemon}
      />
      <PokemonInfo selectedPokemonUrl={selectedPokemon} />
    </div>
  );
};

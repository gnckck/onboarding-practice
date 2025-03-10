import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PokemonListItem } from "@/types/pokemon";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const pokemons: string[] = [
  "bulbasaur",
  "ivysaur",
  "venusaur",
  "charmander",
  "charmeleon",
  "charizard",
  "squirtle",
  "wartortle",
  "blastoise",
  "caterpie",
  "metapod",
  "butterfree",
  "weedle",
  "kakuna",
  "beedrill",
  "pidgey",
  "pidgeotto",
  "pidgeot",
  "rattata",
  "raticate",
];

export default function Pokemon() {
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  //   const [pokemonList, setPokemonList] = useState<PokemonListItem[]>();
  const [pokemonDetail, setPokemonDetail] = useState<PokemonListItem | null>(
    null
  );

  const togglePokemon = (pokemonName: string, index: number) => {
    if (selectedPokemon === pokemonName) {
      setSelectedPokemon(null);
    } else {
      setSelectedPokemon(pokemonName);
      pokemonInfo(index);
    }
  };

  const pokemonInfo = async (index: number) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${index}/`
      );
      const data = await response.json();
      setPokemonDetail(data);
      console.log(pokemonDetail);
    } catch {
      console.log("xxxx");
    }
  };

  return (
    <div className="p-5 flex h-[50vh] justify-center">
      <Card className="p-5 w-1/3 mr-5">
        <h2 className="text-2xl font-bold ">포켓몬 목록</h2>
        <div className="flex flex-wrap gap-2">
          {pokemons.map((pokemon, index) => (
            <Badge
              key={`pokemon-${pokemon}`}
              variant="outline"
              className={`m-1 cursor-pointer hover:bg-gray-100 ${
                selectedPokemon === pokemon ? "border-black" : ""
              } `}
              onClick={() => togglePokemon(pokemon, index)}
            >
              <span className="p-1">{pokemon}</span>
            </Badge>
          ))}
        </div>
      </Card>
      <Card className="p-5 w-1/4 items-center">
        <h2 className="text-2xl font-bold">포켓몬 상세정보</h2>
        {selectedPokemon === null ? (
          <>
            <InformationCircleIcon className="h-20 mt-20 text-gray-600" />
            <p className="text-gray-500">왼쪽 목록에서 포켓몬을 선택해주세요</p>
          </>
        ) : null}
      </Card>
    </div>
  );
}

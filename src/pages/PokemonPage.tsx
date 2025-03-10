import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PokemonListItem, Pokemon } from "@/types/pokemon";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import { minimumLoadingTime } from "@/lib/mininumLoadingTime";

export default function PokemonPage() {
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [pokemonDetail, setPokemonDetail] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태

  // 🔹 포켓몬 목록 가져오기
  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        await minimumLoadingTime();
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
        const pokemons: PokemonListItem[] = response.data.results;
        setPokemonList(pokemons);
      } catch (error) {
        console.error("", error);
      }
    };
    fetchPokemonList();
  }, []);

  const togglePokemon = (pokemon: PokemonListItem) => {
    if (selectedPokemon === pokemon.name) {
      setSelectedPokemon(null);
      setPokemonDetail(null);
    } else {
      setSelectedPokemon(pokemon.name);
      fetchPokemonInfo(pokemon.url);
    }
  };

  const fetchPokemonInfo = async (pokemonUrl: string) => {
    const response = await axios.get(pokemonUrl);
    setPokemonDetail(response.data);
    console.log(response.data);
  };

  return (
    <div className="p-5 flex h-[50vh] justify-center">
      <Card className="p-5 w-1/3 mr-5">
        <h2 className="text-2xl font-bold ">포켓몬 목록</h2>
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

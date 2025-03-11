import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PokemonListItem, Pokemon } from "@/types/pokemon";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import { minimumLoadingTime } from "@/lib/mininumLoadingTime";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { getTypeColor } from "@/lib/getTypeColor";

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
      } finally {
        setLoading(false);
      }
    };
    fetchPokemonList();
  }, []);

  // const getDefaultPokemon = (): Pokemon => ({
  //   id: 0,
  //   name: "",
  //   height: 0,
  //   weight: 0,
  //   sprites: {
  //     front_default: "",
  // back_default:  "",
  // front_shiny: "",
  // back_shiny: "",
  //   },
  //   types: [],
  //   stats: [],
  //   abilities: [],
  // });

  const togglePokemon = (pokemon: PokemonListItem) => {
    if (selectedPokemon === pokemon.name) {
      setSelectedPokemon(null);
      setPokemonDetail(null);
      // setPokemonDetail(getDefaultPokemon);
    } else {
      setSelectedPokemon(pokemon.name);
      fetchPokemonInfo(pokemon.url);
    }
  };

  const fetchPokemonInfo = async (pokemonUrl: string) => {
    setLoading(true);
    await minimumLoadingTime();
    const response = await axios.get(pokemonUrl);

    setPokemonDetail(response.data);
    setLoading(false);
  };

  return (
    <div className="p-5 flex h-[50vh] justify-center">
      <Card className="p-5 w-150 mr-5">
        <h2 className="text-xl font-bold ">포켓몬 목록</h2>
        {loading && pokemonList.length <= 0 ? (
          <div className="flex justify-center items-center h-full w-full">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
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
        )}
      </Card>
      <Card className="p-5 w-80 items-center">
        <h2 className="text-xl font-bold">포켓몬 상세정보</h2>
        {selectedPokemon === null ? (
          <>
            <InformationCircleIcon className="h-20 mt-20 text-gray-600" />
            <p className="text-gray-500">왼쪽 목록에서 포켓몬을 선택해주세요</p>
          </>
        ) : loading ? (
          <div className="flex justify-center items-center h-full w-full">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <p className=" text-3xl font-bold">{pokemonDetail?.name}</p>
              <p className=" text-xl text-gray-500 mt-5">
                {`#${String(pokemonDetail!.id).padStart(3, "0")}`}
              </p>
              <div className="flex flex-row">
                <img
                  src={pokemonDetail!.sprites.front_default}
                  className="w-32 h-32 object-contain mt-4"
                />
                <img
                  src={pokemonDetail!.sprites.back_default!}
                  className="w-32 h-32 object-contain mt-4"
                />
                <image></image>
              </div>
              <div className="flex flex-col items-center mt-5">
                <p className="text-xl font-bold">타입</p>
                <div className="flex flex-row">
                  {pokemonDetail!.types.map((types) => (
                    <Button>
                      <span>{types.type.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { getTypeColor } from "@/lib/getTypeColor";
import { usePokemonStore } from "@/store/usePokemonStore";
import { Pokemon } from "@/types/pokemon";

const InfoCard = ({ pokemonDetail }: { pokemonDetail: Pokemon }) => {
  const addFavoritePokemon = usePokemonStore(
    (state) => state.addFavoritePokemon
  );

  const favoritePokemonList = usePokemonStore(
    (state) => state.favoritePokemonList
  );

  const removeFavoritePokemon = usePokemonStore(
    (state) => state.removeFavoritePokemon
  );

  const isFavorite: boolean = favoritePokemonList.some(
    (pokemon) => pokemon == pokemonDetail
  );

  return (
    <div className="flex flex-col items-center">
      <p className=" text-3xl font-bold">{pokemonDetail!.name}</p>
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
      </div>
      <div className="flex flex-col items-center mt-5">
        <p className="text-xl font-bold">타입</p>
        <div className="flex flex-row">
          {pokemonDetail!.types!.map((types) => (
            <Button
              key={types.type.name}
              className={`m-1 mt-2 ${getTypeColor(types.type.name)}`}
            >
              <span>{types.type.name}</span>
            </Button>
          ))}
        </div>
        {isFavorite ? (
          <Button
            className="bg-red-500 hover:bg-red-400"
            onClick={() => removeFavoritePokemon(pokemonDetail!)}
          >
            즐겨찾기 삭제
          </Button>
        ) : (
          <Button
            className="bg-blue-500"
            onClick={() => addFavoritePokemon(pokemonDetail!)}
          >
            즐겨찾기 추가
          </Button>
        )}
      </div>
    </div>
  );
};

export default InfoCard;

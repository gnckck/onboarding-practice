import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getTypeColor } from "@/lib/getTypeColor";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { usePokemonDetail } from "@/hooks/queries/usePokemonDetail";

interface PokemonInfoProps {
  selectedPokemonUrl: string | null;
}

export const PokemonInfo = ({ selectedPokemonUrl }: PokemonInfoProps) => {
  const {
    pokemonDetail,
    isLoading: isPokemonInfoLoading,
    // error,
  } = usePokemonDetail(selectedPokemonUrl || "");

  const PokemonInfoContent = () => {
    if (selectedPokemonUrl === null) {
      return (
        <>
          <InformationCircleIcon className="h-20 mt-20 text-gray-600" />
          <p className="text-gray-500">왼쪽 목록에서 포켓몬을 선택해주세요</p>
        </>
      );
    }

    if (isPokemonInfoLoading) {
      return (
        <div className="flex justify-center items-center h-full w-full">
          <LoadingSpinner size="lg" />
        </div>
      );
    }

    return (
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
        </div>
        <div className="flex flex-col items-center mt-5">
          <p className="text-xl font-bold">타입</p>
          <div className="flex flex-row">
            {pokemonDetail?.types?.map((types) => (
              <Button
                key={types.type.name}
                className={`m-1 mt-2 ${getTypeColor(types.type.name)}`}
              >
                <span>{types.type.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="p-5 w-80 items-center">
      <h2 className="text-xl font-bold">포켓몬 상세정보</h2>
      <PokemonInfoContent />
    </Card>
  );
};

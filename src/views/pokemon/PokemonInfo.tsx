import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Card } from "@/components/ui/card";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { usePokemonDetail } from "@/hooks/queries/usePokemonDetail";
import InfoCard from "./components/InfoCard";

interface PokemonInfoProps {
  selectedPokemonUrl?: string | null;
}

export const PokemonInfo = ({ selectedPokemonUrl }: PokemonInfoProps) => {
  const { pokemonDetail, isLoading: isPokemonInfoLoading } = usePokemonDetail(
    selectedPokemonUrl || ""
  );

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

    return <InfoCard pokemonDetail={pokemonDetail!} />;
  };

  return (
    <Card className="p-5 w-80 items-center">
      <h2 className="text-xl font-bold">포켓몬 상세정보</h2>
      <PokemonInfoContent />
    </Card>
  );
};

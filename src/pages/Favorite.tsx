import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usePokemonStore } from "@/store/usePokemonStore";
import InfoCard from "@/views/pokemon/components/InfoCard";
import { Link } from "react-router-dom";

export default function Favorite() {
  const favoritePokemonList = usePokemonStore(
    (state) => state.favoritePokemonList
  );

  return (
    <div className="mt-5">
      <div className="flex flex-col h-[55vh] justify-between">
        <Link to="/pokemon">
          <Button>포켓몬 목록</Button>
        </Link>
        {favoritePokemonList!.map((favorite) => (
          <Card className="p-5 w-80 items-center">
            <h2 className="text-xl font-bold self-start">즐겨찾기 포켓몬</h2>
            <InfoCard pokemonDetail={favorite} />
          </Card>
        ))}
      </div>
    </div>
  );
}

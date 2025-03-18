import { Button } from "@/components/ui/button";
import { PokemonCard } from "@/views/pokemon/PokemonCard";
import { Link } from "react-router-dom";

const PokemonPage = () => {
  return (
    <div className="mt-5">
      <Link to="/pokemon-favorite">
        <Button>즐겨찾기</Button>
      </Link>
      <PokemonCard />;
    </div>
  );
};

export default PokemonPage;

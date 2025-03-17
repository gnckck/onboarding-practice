import { useEffect, useState } from "react";
import { useList } from "@/hooks/queries/useList";

const usePokemonList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const itemsPerPage = 20;
  const { pokemonList, pokemonCount, loading } = useList(currentPage);

  useEffect(() => {
    setTotalPages(Math.ceil(pokemonCount! / itemsPerPage));
  }, [currentPage, pokemonCount]);

  return {
    pokemonList,
    totalPages,
    isLoadingPage: loading,
    currentPage,
    setCurrentPage,
  };
};

export default usePokemonList;

import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PokemonListItem, Pokemon } from "@/types/pokemon";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

import { minimumLoadingTime } from "@/lib/mininumLoadingTime";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { getTypeColor } from "@/lib/getTypeColor";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PokemonPage() {
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [pokemonDetail, setPokemonDetail] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const itemsPerPage = 20;

  // 🔹 포켓몬 목록 가져오기
  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        if (loading) {
          await minimumLoadingTime();
        }
        const offset = (currentPage - 1) * itemsPerPage;
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${itemsPerPage}`
        );
        const pokemons: PokemonListItem[] = response.data.results;
        setPokemonList(pokemons);
        setTotalPages(Math.ceil(response.data.count / itemsPerPage));
      } catch (error) {
        console.error("", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemonList();
  }, [currentPage]);

  const LoadingState = () => (
    <div className="flex justify-center items-center h-full w-full">
      <LoadingSpinner size="lg" />
    </div>
  );

  const handlePageChange = (page: number) => {
    setSelectedPokemon(null);
    setPokemonDetail(null);
    setCurrentPage(page);
  };

  const togglePokemon = (pokemon: PokemonListItem) => {
    if (selectedPokemon === pokemon.name) {
      setSelectedPokemon(null);
      setPokemonDetail(null);
    } else {
      setSelectedPokemon(pokemon.name);
      if (!loading) {
        fetchPokemonInfo(pokemon.url);
      }
    }
  };

  const fetchPokemonInfo = async (pokemonUrl: string) => {
    try {
      setLoading(true);
      await minimumLoadingTime();
      const response = await axios.get(pokemonUrl);

      setPokemonDetail(response.data);
    } catch (error) {
      console.error("", error);
    } finally {
      setLoading(false);
    }
  };

  const generatePaginationItems = () => {
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - 2); // 4 부터 startPage 바뀌도록 적용
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return [...Array(maxVisiblePages)].map((_, index) => {
      const pageNumber = startPage + index;
      if (startPage + index <= totalPages) {
        return (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              onClick={() => handlePageChange(pageNumber)}
              isActive={currentPage === pageNumber}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        );
      }
    });
  };

  return (
    <div className="p-5 flex h-[50vh] justify-center">
      <Card className="p-5 w-150 mr-5">
        <h2 className="text-xl font-bold ">포켓몬 목록</h2>
        {loading && pokemonList.length <= 0 ? (
          <LoadingState />
        ) : (
          <div className="flex-1 flex flex-col">
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
            <div className="mt-auto">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => {
                        if (currentPage === 1) {
                          return handlePageChange(totalPages);
                        }
                        handlePageChange(currentPage - 1);
                      }}
                    />
                  </PaginationItem>

                  {generatePaginationItems()}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => {
                        if (currentPage === totalPages) {
                          return handlePageChange(1);
                        }
                        handlePageChange(currentPage + 1);
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
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
          <LoadingState />
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
              </div>
              <div className="flex flex-col items-center mt-5">
                <p className="text-xl font-bold">타입</p>
                <div className="flex flex-row">
                  {pokemonDetail!.types.map((types) => (
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
          </>
        )}
      </Card>
    </div>
  );
}

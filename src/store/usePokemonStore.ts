import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { Pokemon } from "@/types/pokemon";

interface PokemonState {
  favoritePokemonList: Pokemon[];
}

interface PokemonActions {
  addFavoritePokemon: (pokemon: Pokemon) => void;
  removeFavoritePokemon: (pokemon: Pokemon) => void;
}

const initialState: PokemonState = {
  favoritePokemonList: [],
};
export const usePokemonStore = create<PokemonState & PokemonActions>()(
  devtools(
    immer((set) => ({
      ...initialState,
      addFavoritePokemon: (pokemon) =>
        set((state) => {
          state.favoritePokemonList.push(pokemon);
        }),
      removeFavoritePokemon: (pokemon) =>
        set((state) => {
          state.favoritePokemonList = state.favoritePokemonList.filter(
            (p: Pokemon) => p.id !== pokemon.id
          );
        }),
    }))
  )
);

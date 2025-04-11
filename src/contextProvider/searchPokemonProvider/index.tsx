import { createContext, useEffect, useState } from "react";
import { fetchPokemon } from "../../services/api";

export const searchPokemonContext = createContext<{
  searchPokemon: string;
  setSearchPokemon: React.Dispatch<React.SetStateAction<string>>;
  pokemon: PokemonTypes | null;
}>({
  searchPokemon: "",
  setSearchPokemon: () => {},
  pokemon: null,
});

interface PokemonTypes {
  name: string | undefined;
  id: number | undefined;
  image: string | undefined;
  types: string[] | undefined;
  stats: {
    name: string | undefined;
    base_stat: number | undefined;
  }[];
  abilities?: {
    ability: {
      name: string;
    };
  }[];
  experience: number;
  generation?: string;
}

export function SearchPokemonProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchPokemon, setSearchPokemon] = useState("");
  const [pokemon, setPokemon] = useState<PokemonTypes | null>(null);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchPokemon.length > 2) {
        fetchPokemon(searchPokemon).then((data) => {
          setPokemon(data);
        });
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchPokemon]);

  return (
    <searchPokemonContext.Provider
      value={{ searchPokemon, setSearchPokemon, pokemon }}
    >
      {children}
    </searchPokemonContext.Provider>
  );
}

import { useContext } from "react";
import { searchPokemonContext } from "../../../../contextProvider/searchPokemonProvider";

export function SearchPokemon() {
  const { searchPokemon, setSearchPokemon } = useContext(searchPokemonContext);

  return (
    <div>
      <input
        type='text'
        placeholder='Encontre seu pokémon'
        className='w-full pl-8 py-4 rounded-[40px] shadow-[4px_4px_16px_0_rgba(1,28,64,20%)] placeholder:text-dark placeholder:opacity-80 mt-8 outline-none'
        value={searchPokemon}
        onChange={(e) => setSearchPokemon(e.target.value)}
      />
    </div>
  );
}

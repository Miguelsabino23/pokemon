import { SearchPokemon } from "./components/searchPokemon";
import { SearchRenderPokemon } from "../pokedex/components/searchRenderPokemon";
import { NextAndPreviwPagePoke } from "./components/nextAndPreviwPagePoke";

export function Pokedex() {
  return (
    <section className='px-40'>
      <h1 className='px-40 mt-20 text-3xl text-center'>
        800 <span className='font-semibold'>pokemons</span> for you to choose
        your favorite
      </h1>
      <div>
        <SearchPokemon />
      </div>
      <div>
        <SearchRenderPokemon />
      </div>
      <div>
        <NextAndPreviwPagePoke />
      </div>
    </section>
  );
}

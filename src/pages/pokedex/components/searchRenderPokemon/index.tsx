import { useContext, useEffect, useState } from "react";
import { fetchRenderAllPokes } from "../../../../services/api";
import { NextPageContext } from "../../../../contextProvider/nextPagePokesProvider";
import { searchPokemonContext } from "../../../../contextProvider/searchPokemonProvider";
import { PokemonCard } from "../pokemonCard";

const typeColors: Record<string, string> = {
  grass: "bg-gradient-to-r from-[#3FA34D] via-45% to-[#5ECD60] via-100%",
  fire: "bg-gradient-to-r from-[#732119] via-45% to-[#D93E30] via-100%",
  water: "bg-gradient-to-r from-[#1479FB] via-45% to-[#82B1FF] via-100%",
  electric: "bg-gradient-to-r from-[#E0E722] via-45% to-[#FAFA72] via-100%",
  bug: "bg-gradient-to-r from-[#3B9950] via-45% to-[#A7DB8D] via-100%",
  normal: "bg-gradient-to-r from-[#73525B] via-45% to-[#A8A77A] via-100%",
  poison: "bg-gradient-to-r from-[#5B3184] via-45% to-[#A040A0] via-100%",
  ground: "bg-gradient-to-r from-[#654008] via-45% to-[#E0C068] via-100%",
  fairy: "bg-gradient-to-r from-[#971B45] via-45% to-[#F4BDC9] via-100%",
  rock: "bg-gradient-to-r from-[#7E7E7E] via-45% to-[#B8A038] via-100%",
  ghost: "bg-gradient-to-r from-[#323569] via-45% to-[#705898] via-100%",
  dragon: "bg-gradient-to-r from-[#478A93] via-45% to-[#6F35FC] via-100%",
  dark: "bg-gradient-to-r from-[#0D1211] via-45% to-[#705848] via-100%",
  steel: "bg-gradient-to-r from-[#5E736C] via-45% to-[#B8B8D0] via-100%",
  fighting: "bg-gradient-to-r from-[#96402A] via-45% to-[#C03028] via-100%",
  ice: "bg-gradient-to-r from-[#6FBEDF] via-45% to-[#98D8D8] via-100%",
  psychic: "bg-gradient-to-r from-[#A32B6C] via-45% to-[#F85888] via-100%",
  flying: "bg-gradient-to-r from-[#3692DC] via-45% to-[#A890F0] via-100%",
};

interface Pokemon {
  name: string;
  id: number;
  image: string;
  types: string[];
  stats: {
    base_stat: number;
    stat: { name: string };
  }[];
  abilities?: { ability: { name: string } }[];
  experience?: number;
  generation?: string;
}

interface RenderTypes {
  results: Pokemon[];
  previous: string;
  next: string;
}

export function SearchRenderPokemon() {
  const { nextPagePokes } = useContext(NextPageContext);
  const { pokemon, searchPokemon } = useContext(searchPokemonContext);
  const [pokemons, setPokemons] = useState<RenderTypes | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      const data = await fetchRenderAllPokes(nextPagePokes, 8);
      setPokemons(data);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [nextPagePokes]);

  const handleOpenModal = (pokemon: Pokemon) => {
    if (!pokemon) return null;
    setSelectedPokemon(pokemon);
  };

  const handleCloseModal = () => {
    setSelectedPokemon(null);
  };

  const romanToDecimal: Record<
    "i" | "ii" | "iii" | "iv" | "v" | "vi" | "vii" | "viii" | "ix" | "x",
    number
  > = {
    i: 1,
    ii: 2,
    iii: 3,
    iv: 4,
    v: 5,
    vi: 6,
    vii: 7,
    viii: 8,
    ix: 9,
    x: 10,
  };

  function getGenerationNumber(generationName: string): number | string {
    const match = generationName
      ?.split("-")[1]
      ?.toLowerCase() as keyof typeof romanToDecimal;
    return romanToDecimal[match] || "?";
  }

  return (
    <div className='flex flex-wrap gap-2 justify-between items-center mt-7 w-full'>
      {searchPokemon.length > 2 && pokemon ? (
        <PokemonCard
          pokemon={{
            name: pokemon.name || "",
            id: pokemon.id || 0,
            image: pokemon.image || "",
            types: pokemon.types || [],
            stats:
              pokemon.stats?.map((stat) => ({
                base_stat: stat.base_stat || 0,
                stat: { name: stat.name || "" },
              })) || [],
            abilities: pokemon.abilities || [],
            experience: pokemon.experience,
            generation: pokemon.generation,
          }}
          onClick={() =>
            handleOpenModal({
              name: pokemon.name || "",
              id: pokemon.id || 0,
              image: pokemon.image || "",
              types: pokemon.types || [],
              stats:
                pokemon.stats?.map((stat) => ({
                  base_stat: stat.base_stat || 0,
                  stat: { name: stat.name || "" },
                })) || [],
              abilities: pokemon.abilities || [],
              experience: pokemon.experience,
              generation: pokemon.generation,
            })
          }
        />
      ) : searchPokemon.length > 2 ? (
        <div className='flex justify-center items-center w-full'>
          <h2 className='text-3xl text-dark'>Pokémon não encontrado</h2>
        </div>
      ) : (
        pokemons?.results.map((poke) => (
          <PokemonCard
            key={poke.id}
            pokemon={poke}
            onClick={() => handleOpenModal(poke)}
          />
        ))
      )}

      {!pokemons && (
        <div className='flex justify-center items-center w-full'>
          <h2 className='text-3xl text-dark'>Loading...</h2>
        </div>
      )}

      {selectedPokemon ? (
        <div className='z-20 h-full w-full bg-[rgba(33,33,33,.5)] absolute left-0 top-0 flex items-center justify-center'>
          <div
            className={`flex px-5 ${
              typeColors[selectedPokemon.types[0]] || "bg-white"
            } gap-4 rounded-2xl `}
          >
            <div
              className={`h-full w-full relative py-7 shadow-[4px_4px_8px_0] shadow-[rgba(1,28,64,20%)] `}
            >
              <div
                className='absolute top-0 text-2xl'
                onClick={handleCloseModal}
              >
                x
              </div>
              <img
                src={selectedPokemon.image}
                className='bg-contain w-[342px] h-[304px]'
              />
              <div className='flex gap-2 absolute bottom-8 right-2 '>
                {selectedPokemon.types.map((type) => (
                  <span
                    key={type}
                    className={`${typeColors[type]} px-2 rounded-md relative `}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
            <div className='flex flex-col gap-3 py-7 justify-between'>
              <div className='flex justify-between items-center'>
                <h2
                  className={`text-xl font-bold ${
                    selectedPokemon.types[0] === "electric"
                      ? "text-dark"
                      : "text-white"
                  }`}
                >
                  {selectedPokemon.name[0].toUpperCase() +
                    selectedPokemon.name.substring(1)}
                </h2>
                <div className=''>
                  <span
                    className={`${
                      selectedPokemon.types[0] === "electric"
                        ? "text-dark"
                        : "text-white"
                    } mr-2`}
                  >
                    {selectedPokemon.generation
                      ? `Geração ${getGenerationNumber(
                          selectedPokemon.generation
                        )}`
                      : "Geração indefinida"}
                  </span>
                  <span className='bg-third py-2 px-4 rounded-full'>
                    {selectedPokemon.id}
                  </span>
                </div>
              </div>
              <div className='bg-white rounded-md px-5 py-1 w-max'>
                <p>Abilities</p>
                <ul className='flex w-full gap-3'>
                  {selectedPokemon.abilities?.map((ability, index) => (
                    <li key={index}>{ability.ability.name}</li>
                  ))}
                </ul>
              </div>
              <div className='flex justify-between bg-white rounded-md px-5 py-1'>
                {selectedPokemon.stats
                  .filter((stat) => stat.stat.name === "hp")
                  .map((stat) => (
                    <div className='flex flex-col w-[40%]' key={stat.base_stat}>
                      <h3>Healthy Points</h3>
                      <span>{stat.base_stat}</span>
                      <div className='w-full h-1 bg-dark rounded-xl'>
                        <div
                          className='h-full bg-primaryColor rounded max-w-full'
                          style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                <div className='flex flex-col w-[40%]'>
                  <h3>Experience</h3>
                  <span>{selectedPokemon.experience}</span>
                  <div className='w-full h-1 bg-dark rounded-xl'>
                    <div
                      className='h-full bg-third rounded-xl max-w-full'
                      style={{
                        width: `${
                          ((selectedPokemon.experience || 0) / 255) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className='flex gap-3'>
                {selectedPokemon.stats
                  .filter(
                    (stat) =>
                      stat.stat.name !== "hp" && stat.stat.name !== "speed"
                  )
                  .map((stat, index) => (
                    <div
                      className='bg-white flex flex-col p-3 rounded-md items-center w-full min-w-24'
                      key={index}
                    >
                      <span className='border-2 py-1 px-2 rounded-full'>
                        {stat.base_stat}
                      </span>
                      <span className='w-max'>
                        {stat.stat.name.replace("special", "SP")}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='hidden'></div>
      )}
    </div>
  );
}

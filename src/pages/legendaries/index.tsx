import { useEffect, useRef, useState } from "react";
import { fetchLegendaryPokes } from "../../services/api";
import { CarrouselPoke } from "./components/carrouselPoke";

interface LegendariesProps {
  id: number;
  name: string;
  image: string;
  stats: {
    base_stat: number;
    name: string;
  }[];
  experience: number;
}

export function Legendaries() {
  const [legendariesPokes, setLegendaryPokes] = useState<LegendariesProps[]>(
    []
  );

  const [pokemonInfo, setPokemonInfo] = useState<LegendariesProps | null>(null);
  const carrouselRef = useRef<HTMLDivElement>(null);

  console.log(pokemonInfo);

  useEffect(() => {
    async function loadLegendary() {
      const data = await fetchLegendaryPokes();
      if (data) {
        setLegendaryPokes(data);
        setPokemonInfo(data[0]); // <- aqui!
      }
    }

    loadLegendary();
  }, []);

  function scrollCarrousel(direction: "left" | "right") {
    if (carrouselRef.current) {
      const scrollAmount = 144 + 16;
      carrouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  }

  return (
    <section className='bg-dark h-max'>
      <div className='px-40'>
        <h1 className='text-white text-3xl pt-10 pb-3 border-b '>
          Legendaries
        </h1>
        <div>
          <div>
            {!pokemonInfo && (
              <div className='flex justify-center items-center h-screen'>
                <h2 className='text-white text-3xl'>Loading...</h2>
              </div>
            )}
            {pokemonInfo && (
              <div className='w-full'>
                <div className='flex gap-5 py-10 w-full'>
                  <div className='w-1/2'>
                    <img src={pokemonInfo.image} alt={pokemonInfo.name} />
                  </div>
                  <div className='w-1/2 flex flex-col gap-5 justify-center'>
                    <h2 className='text-3xl text-white uppercase spacing tracking-wider'>
                      {pokemonInfo.name}
                    </h2>
                    <p className='text-white text-sm'>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Inventore natus consequuntur explicabo vel saepe quisquam
                      porro culpa, suscipit voluptatum perferendis aperiam
                      beatae voluptate modi fugiat ut. Ipsum saepe libero
                      quisquam?
                    </p>
                    <div className='flex gap-5 py-5 w-full flex-wrap items-center'>
                      {pokemonInfo.stats
                        .filter(
                          (stats) =>
                            stats.name === "attack" ||
                            stats.name === "defense" ||
                            stats.name === "hp" ||
                            stats.name === "special-attack" ||
                            stats.name === "special-defense"
                        )
                        .map((stats, index) => (
                          <div className='w-1/3 text-white' key={index}>
                            <h3>{stats.name}</h3>
                            <span>{stats.base_stat}</span>
                            <div className='w-full h-1 bg-white rounded-xl'>
                              <div
                                className='h-full bg-third rounded max-w-full'
                                style={{
                                  width: `${(stats.base_stat / 255) * 100}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      <div className='text-white w-1/3'>
                        <h3>Experience</h3>
                        <span>{pokemonInfo.experience}</span>
                        <div className='w-full h-1 bg-white rounded-xl'>
                          <div
                            className='h-full bg-third rounded max-w-full'
                            style={{
                              width: `${(pokemonInfo.experience / 255) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='relative px-40'>
        <div className='flex gap-5 items-center'>
          <button
            className='text-white text-3xl'
            onClick={() => scrollCarrousel("left")}
          >
            &lt;
          </button>
          <div className='flex gap-4 overflow-hidden w-full' ref={carrouselRef}>
            {legendariesPokes.map((poke) => (
              <CarrouselPoke
                img={poke.image}
                name={poke.name}
                key={poke.id}
                onClick={() =>
                  setPokemonInfo({
                    id: poke.id,
                    name: poke.name,
                    image: poke.image,
                    stats: poke.stats,
                    experience: poke.experience,
                  })
                }
              />
            ))}
          </div>
          <button
            className='text-white text-3xl'
            onClick={() => scrollCarrousel("right")}
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
}

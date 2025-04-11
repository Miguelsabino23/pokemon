interface PokemonProps {
  pokemon: {
    name: string;
    id: number;
    image: string;
    types: string[];
    stats: { base_stat: number; stat: { name: string } }[];
    abilities?: { ability: { name: string } }[];
    experience?: number;
    generation?: string;
  };
  onClick?: () => void;
}

const typeColors: Record<string, string> = {
  grass: "bg-grassColor",
  fire: "bg-fireColor",
  water: "bg-waterColor",
  electric: "bg-electricColor",
  bug: "bg-bugColor",
  normal: "bg-normalColor",
  poison: "bg-poisonColor",
  ground: "bg-groundColor",
  fairy: "bg-fairyColor",
  rock: "bg-rockColor",
  ghost: "bg-ghostColor",
  dragon: "bg-dragonColor",
  dark: "bg-darkColor",
  steel: "bg-steelColor",
  fighting: "bg-fightingColor",
  ice: "bg-iceColor",
  psychic: "bg-psychicColor",
  flying: "bg-flyingColor",
};

export function PokemonCard({ pokemon, onClick }: PokemonProps) {
  return (
    <div key={pokemon.id} className='flex relative w-60 gap-2'>
      <div className='flex flex-col'>
        <h3 className='mb-2'>{pokemon.name}</h3>

        {pokemon.stats
          .filter(
            (stat) =>
              stat.stat.name === "attack" || stat.stat.name === "defense"
          )
          .map((stat) => (
            <div key={stat.stat.name} className='flex gap-2 items-center mb-1'>
              <span className='border-2 rounded-full py-1 px-2 gap-2'>
                {stat.base_stat}
              </span>
              <span>{stat.stat.name}</span>
            </div>
          ))}
        <div className='flex gap-2 absolute bottom-1'>
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`text-center rounded-md px-4 py-0 text-xs ${
                typeColors[type] || "bg-white"
              }`}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
      <div
        className={`${
          typeColors[pokemon.types[0]] || "bg-white"
        } w-32 h-36 flex justify-center items-center rounded-e-md`}
      >
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className='cursor-pointer'
          onClick={onClick}
        />
      </div>
    </div>
  );
}

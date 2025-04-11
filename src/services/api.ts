export async function fetchPokemon(name: string) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) throw new Error("Erro ao buscar os dados da api");

    const data = await response.json();

    const speciesResponse = await fetch(data.species.url);
    if (!speciesResponse.ok)
      throw new Error("Erro ao buscar a espécie do Pokémon");

    const speciesData = await speciesResponse.json();

    return {
      name: data.name,
      id: data.id,
      image: data.sprites.other["official-artwork"].front_default,
      types: data.types.map(
        (type: { type: { name: string } }) => type.type.name
      ),
      stats: data.stats.map(
        (stat: { base_stat: number; stat: { name: string } }) => ({
          name: stat.stat.name,
          base_stat: stat.base_stat,
        })
      ),
      abilities: data.abilities || [],
      experience: data.base_experience,
      generation: speciesData.generation.name,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchRenderAllPokes(offset: number, limit: number) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    );
    if (!response.ok) throw new Error("Erro ao buscar os dados da API");

    const data = await response.json();

    const results = await Promise.all(
      data.results.map(async (pokemon: { name: string; url: string }) => {
        const pokemonId = pokemon.url.split("/")[6];
        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png
`;

        const pokemonResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );
        if (!pokemonResponse.ok)
          throw new Error(`Erro ao buscar detalhes do Pokémon ${pokemon.name}`);

        const pokemonData = await pokemonResponse.json();

        const speciesResponse = await fetch(pokemonData.species.url);
        if (!speciesResponse.ok)
          throw new Error(`Erro ao buscar espécie do Pokémon ${pokemon.name}`);

        const speciesData = await speciesResponse.json();

        const stats = pokemonData.stats.filter(
          (stat: { stat: { name: string } }) =>
            [
              "attack",
              "defense",
              "hp",
              "special-attack",
              "special-defense",
            ].includes(stat.stat.name)
        );

        const types = pokemonData.types.map(
          (type: { type: { name: string } }) => type.type.name
        );

        const abilities = pokemonData.abilities || [];

        const experience = pokemonData.base_experience;

        const generation = speciesData.generation.name;

        return {
          name: pokemon.name,
          id: Number(pokemonId),
          image,
          stats,
          types,
          abilities,
          experience,
          generation,
        };
      })
    );

    return {
      results,
      previous: data.previous,
      next: data.next,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchLegendaryPokes() {
  const legendaryNames = [
    "articuno",
    "zapdos",
    "moltres",
    "mewtwo",
    "raikou",
    "entei",
    "suicune",
    "lugia",
    "ho-oh",
    "regirock",
    "regice",
    "registeel",
    "latias",
    "latios",
    "kyogre",
    "groudon",
    "rayquaza",
    "uxie",
    "mesprit",
    "azelf",
    "dialga",
    "palkia",
    "heatran",
    "regigigas",
    "giratina-altered",
    "cresselia",
    "cobalion",
    "terrakion",
    "virizion",
    "tornadus-incarnate",
    "thundurus-incarnate",
    "reshiram",
    "zekrom",
    "landorus-incarnate",
    "kyurem",
    "xerneas",
    "yveltal",
    "tapu-koko",
    "tapu-lele",
    "tapu-bulu",
    "tapu-fini",
    "solgaleo",
    "lunala",
    "necrozma",
    "zacian",
    "zamazenta",
    "eternatus",
    "regieleki",
    "regidrago",
    "glastrier",
    "spectrier",
    "calyrex",
    "koraidon",
    "miraidon",
  ];

  try {
    const legendaryPromises = legendaryNames.map(async (name) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!res.ok) throw new Error(`Erro ao buscar ${name}`);
      const data = await res.json();

      return {
        id: data.id,
        name: data.name,
        image: data.sprites.other["official-artwork"].front_default,
        stats: data.stats.map(
          (stat: { base_stat: number; stat: { name: string } }) => ({
            name: stat.stat.name,
            base_stat: stat.base_stat,
          })
        ),
        experience: data.base_experience,
      };
    });

    const legendaryResults = await Promise.all(legendaryPromises);
    return legendaryResults;
  } catch (error) {
    console.error("Erro ao buscar pokémons lendários:", error);
    return null;
  }
}

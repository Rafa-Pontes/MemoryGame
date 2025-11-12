// js/apiService.js
export async function fetchPokemonData(limit = 10) {
  const API_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
  try {
    const resp = await fetch(API_URL);
    const data = await resp.json();

    const detailPromises = data.results.map(pokemon =>
      fetch(pokemon.url).then(res => res.json())
    );

    const allDetails = await Promise.all(detailPromises);
    return allDetails.map(details => ({
      name: details.name,
      image: details.sprites.front_default
    }));
  } catch (error) {
    console.error('Erro ao buscar dados dos Pokémon:', error);
    return [];
  }
}

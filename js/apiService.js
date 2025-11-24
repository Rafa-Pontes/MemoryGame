// js/apiService.js


function convertToCDN(url) {
  if (!url) return null;
  return url.replace(
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/', 
    'https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/'
  );
}

const BACKUP_POKEMON = [
    { name: "bulbasaur", image: "https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/1.png" },
    { name: "charmander", image: "https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/4.png" },
    { name: "squirtle", image: "https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/7.png" },
    { name: "pikachu", image: "https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/25.png" },
    { name: "jigglypuff", image: "https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/39.png" },
    { name: "meowth", image: "https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/52.png" },
    { name: "psyduck", image: "https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/54.png" },
    { name: "machop", image: "https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/66.png" },
    { name: "gengar", image: "https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/94.png" },
    { name: "eevee", image: "https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/133.png" },
    { name: "snorlax", image: "https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/143.png" },
    { name: "mewtwo", image: "https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/150.png" },
    { name: "togepi", image: "https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/175.png" },
    { name: "wobbuffet", image: "https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/202.png" },
    { name: "rayquaza", image: "https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/384.png" }
];

async function fetchWithRetry(url, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
            return await response.json();
        } catch (err) {
            console.warn(`Tentativa ${i + 1} falhou para ${url}. Tentando novamente...`);
            if (i === retries - 1) throw err; 
            await new Promise(res => setTimeout(res, delay)); 
        }
    }
}



export async function fetchPokemonData(limit = 10) {
  const API_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;

  try {
    const data = await fetchWithRetry(API_URL);

    const detailPromises = data.results.map(pokemon =>
      fetchWithRetry(pokemon.url).then(details => {
          
          let rawImage = 
            details.sprites.other['official-artwork'].front_default || 
            details.sprites.front_default;

          const safeImage = convertToCDN(rawImage);
          
          const finalImage = safeImage || 'https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/items/poke-ball.png';

          return {
              name: details.name,
              image: finalImage
          };
      })
    );

    const allDetails = await Promise.all(detailPromises);
    return allDetails;

  } catch (error) {
    console.error('A API falhou. Usando Backup Local.', error);
    
    return BACKUP_POKEMON.slice(0, limit);
  }
}
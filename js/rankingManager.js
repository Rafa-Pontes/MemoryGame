// js/rankingManager.js

const API_URL = 'http://localhost:3000/api/ranking'; // Endereço do seu Back-End

export async function saveToRanking(name, time) {
  try {
    // Em vez de salvar local, mandamos para o servidor (POST)
    await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, time })
    });
    
    // Após salvar, recarregamos a lista para garantir que está atualizada
    // Opcional: só chamar loadRanking se quiser atualizar a UI imediatamente
  } catch (error) {
    console.error("Erro ao salvar no servidor:", error);
    // Fallback: Se o servidor cair, você poderia salvar no localStorage aqui como backup
  }
}

export async function loadRanking() {
  const rankingElement = document.querySelector("#ranking-list");
  rankingElement.innerHTML = '<li>Carregando ranking global... 🌍</li>';

  try {
    // Pedimos os dados ao servidor (GET)
    const response = await fetch(API_URL);
    const rankingData = await response.json();

    rankingElement.innerHTML = '';

    if (rankingData.length === 0) {
      rankingElement.innerHTML = "<li>Seja o primeiro a vencer! 🏆</li>";
      return;
    }

    const medals = ["🥇", "🥈", "🥉"];
    
    rankingData.forEach((r, i) => {
      const li = document.createElement("li");
      li.innerHTML = `${medals[i] || "🏅"} ${r.name} — <b>${r.time}s</b>`;
      rankingElement.appendChild(li);
    });

  } catch (error) {
    console.error("Erro ao carregar ranking:", error);
    rankingElement.innerHTML = "<li>Erro ao conectar ao servidor 🔌</li>";
  }
}
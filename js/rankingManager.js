// js/rankingManager.js
export function saveToRanking(name, time) {
  const rankingList = JSON.parse(localStorage.getItem("pokemonRanking")) || [];
  rankingList.push({ name, time });
  rankingList.sort((a, b) => a.time - b.time);
  const top5 = rankingList.slice(0, 5);
  localStorage.setItem("pokemonRanking", JSON.stringify(top5));
}

export function loadRanking() {
  const rankingData = JSON.parse(localStorage.getItem("pokemonRanking")) || [];
  const rankingElement = document.querySelector("#ranking-list");
  rankingElement.innerHTML = '';

  if (rankingData.length === 0) {
    rankingElement.innerHTML = "<li>Nenhum treinador ainda 😢</li>";
    return;
  }

  const medals = ["🥇", "🥈", "🥉"];
  rankingData.forEach((r, i) => {
    const li = document.createElement("li");
    li.innerHTML = `${medals[i] || "🏅"} ${r.name} — <b>${r.time}s</b>`;
    rankingElement.appendChild(li);
  });
}

// js/uiManager.js
export function showTeamRocket() {
  const overlay = document.createElement("div");
  overlay.classList.add('rocket_overlay');
  overlay.innerHTML = `
    <img src="assets/image.png" alt="Equipe Rocket">
    <h2>GAME OVER</h2>
    <p>A Equipe Rocket venceu desta vez!</p>
    <button id="restart-btn">Tentar Novamente</button>
  `;
  document.body.appendChild(overlay);
  document.querySelector("#restart-btn").addEventListener("click", () => {
    document.body.removeChild(overlay);
    location.reload(); // recarrega jogo
  });
}

export function showVictory(playerName, timer) {
  const overlay = document.createElement("div");
  overlay.classList.add('rocket_overlay');
  overlay.innerHTML = `
    <h2>🔥 Parabéns, ${playerName}! 🔥</h2>
    <p>Você venceu em ${timer}s!</p>
    <button id="restart-btn">Jogar Novamente</button>
  `;
  document.body.appendChild(overlay);
  document.querySelector("#restart-btn").addEventListener("click", () => {
    document.body.removeChild(overlay);
    location.reload();
  });
}

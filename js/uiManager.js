// js/uiManager.js

export function showTeamRocket(onRestart) {
  const overlay = document.createElement("div");
  overlay.classList.add('rocket_overlay');
  overlay.innerHTML = `
    <img src="assets/image.png" alt="Equipe Rocket">
    <h2>GAME OVER</h2>
    <p>A Equipe Rocket venceu desta vez!</p>
    <button id="restart-btn">Tentar Novamente</button>
  `;
  document.body.appendChild(overlay);
  
  // Associa o evento ao callback de reinício (Soft Reset)
  // Importante: usamos o id #restart-btn que definimos no HTML acima
  const btn = overlay.querySelector("#restart-btn");
  btn.addEventListener("click", () => {
    document.body.removeChild(overlay);
    if (onRestart) onRestart();
  });
}

export function showVictory(playerName, timer, onRestart) {
  const overlay = document.createElement("div");
  overlay.classList.add('rocket_overlay');
  
  // Estrutura base HTML
  overlay.innerHTML = `
    <h2 id="victory-title"></h2>
    <p>Você venceu em ${timer}s!</p>
    <button id="restart-btn">Jogar Novamente</button>
  `;
  
  // INJEÇÃO SEGURA DE TEXTO (Previne XSS)
  const titleElement = overlay.querySelector("#victory-title");
  titleElement.textContent = `🔥 Parabéns, ${playerName}! 🔥`; // O navegador trata isso apenas como texto

  document.body.appendChild(overlay);
  
  const btn = overlay.querySelector("#restart-btn");
  btn.addEventListener("click", () => {
    document.body.removeChild(overlay);
    if (onRestart) onRestart();
  });
}
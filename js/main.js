// js/main.js
import { fetchPokemonData } from "./apiService.js";
import { createGame } from "./gameLogic.js";
import { loadRanking } from "./rankingManager.js";


const loginScreen = document.querySelector("#login-screen");
const gameScreen = document.querySelector("#game-screen");
const startBtn = document.querySelector("#start-btn");
const playerInput = document.querySelector("#player-name");
const difficultySelect = document.querySelector("#difficulty");

const rankingBtn = document.querySelector("#ranking-btn");
const rankingModal = document.querySelector("#ranking-modal");
const closeRankingBtn = document.querySelector("#close-ranking-btn");

loadRanking();

rankingBtn.addEventListener("click", () => {
    loadRanking(); 
    rankingModal.style.display = "flex"; 
});

closeRankingBtn.addEventListener("click", () => {
    rankingModal.style.display = "none"; 
});

rankingModal.addEventListener("click", (e) => {
    if (e.target === rankingModal) {
        rankingModal.style.display = "none";
    }
});

startBtn.addEventListener("click", async () => {
  const name = playerInput.value.trim();

  // --- VALIDAÇÃO ROBUSTA ---
  if (name === "") {
    alert("⚠️ Por favor, digite seu nome, treinador!");
    playerInput.focus();
    playerInput.style.border = "2px solid red"; 
    setTimeout(() => playerInput.style.border = "none", 2000); 
    return; 
  }
  // -------------------------

  // 1. Feedback de Carregamento
  startBtn.textContent = "Capturando...";
  startBtn.disabled = true;
  startBtn.style.cursor = "wait";
  startBtn.style.backgroundColor = "#ccc"; 

  try {
    const limit = parseInt(difficultySelect.value) || 10;
    const pokemonData = await fetchPokemonData(limit);
    
    if (!pokemonData || pokemonData.length === 0) {
        throw new Error("Nenhum Pokémon encontrado.");
    }

    // Sucesso: troca tela e cria jogo
    // IMPORTANTE: Forçamos o display correto aqui também
    loginScreen.style.display = "none";
    gameScreen.style.display = "block";
    
    createGame(pokemonData, name);

  } catch (error) {
    console.error(error);
    alert("Erro ao carregar o jogo. Verifique sua conexão.");
  } finally {
    // Restaura o botão
    startBtn.textContent = "Começar Jogo";
    startBtn.disabled = false;
    startBtn.style.cursor = "pointer";
    startBtn.style.backgroundColor = ""; 
  }
});
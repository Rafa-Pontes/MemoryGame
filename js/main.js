// js/main.js
import { fetchPokemonData } from "./apiService.js";
import { createGame } from "./gameLogic.js";
import { loadRanking } from "./rankingManager.js";

const loginScreen = document.querySelector("#login-screen");
const gameScreen = document.querySelector("#game-screen");
const startBtn = document.querySelector("#start-btn");
const playerInput = document.querySelector("#player-name");

loadRanking();

startBtn.addEventListener("click", async () => {
  const name = playerInput.value.trim();
  if (!name) {
    alert("Digite seu nome, treinador!");
    return;
  }
  loginScreen.style.display = "none";
  gameScreen.style.display = "block";

  const pokemonData = await fetchPokemonData(10);
  createGame(pokemonData, name);
});

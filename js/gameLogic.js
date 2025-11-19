// js/gameLogic.js
import { saveToRanking, loadRanking } from "./rankingManager.js";
import { showTeamRocket, showVictory } from "./uiManager.js";
import { audioManager } from "./audioManager.js";

let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let timerInterval;
let timer = 0;
let gameStarted = false;
const limitTimer = 60;
let playerName = '';

const gameContainer = document.querySelector('.container');
const timerDisplay = document.querySelector("#timer");
const loginScreen = document.querySelector("#login-screen");
const gameScreen = document.querySelector("#game-screen");

// --- PROTEÇÃO DE ERRO NO BOTÃO ---
// Verifica se o botão existe antes de adicionar o evento para não travar o JS
const backBtn = document.querySelector("#back-menu-btn");
if (backBtn) {
    backBtn.addEventListener("click", resetGameFull);
}

export function createGame(pokemonList, player) {
  playerName = player;
  resetBoardState(); // Limpa variáveis internas
  
  // --- ATUALIZAÇÃO CRÍTICA AQUI ---
  gameContainer.innerHTML = ""; 
  gameContainer.className = 'container'; // Reseta para não acumular classes antigas
  
  const totalCards = pokemonList.length * 2;

  // Aplica a classe CSS correta baseada no número de cartas
  if (totalCards === 12) {
      gameContainer.classList.add('grid-easy');   // Força 4 colunas
  } else if (totalCards === 20) {
      gameContainer.classList.add('grid-medium'); // Força 5 colunas
  } else if (totalCards === 30) {
      gameContainer.classList.add('grid-hard');   // Força 6 colunas
  }
  // ----------------------------------
  
  const shuffled = shuffleArray([...pokemonList, ...pokemonList]);

  shuffled.forEach(pokemon => {
    const card = createCard(pokemon.name, pokemon.image);
    cards.push(card);
    gameContainer.appendChild(card);
  });
}

function createCard(name, imageSrc) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;
  card.innerHTML = `
    <div class="front"><img src="${imageSrc}" alt="${name}"></div>
    <div class="back"></div>
  `;
  card.addEventListener('click', flipCard);
  return card;
}

function flipCard() {
  if (lockBoard || this === firstCard) return;
  this.classList.add('flip');
  if (!gameStarted) {
    startTimer();
    gameStarted = true;
  }
  if (!firstCard) {
    firstCard = this;
    return;
  }
  secondCard = this;
  lockBoard = true;
  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.name === secondCard.dataset.name;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();

  // Vitória
  if (document.querySelectorAll('.flip').length === cards.length) {
    clearInterval(timerInterval);
    setTimeout(() => {
      saveToRanking(playerName, timer);
      loadRanking();
      // Passamos resetGameFull como callback
      showVictory(playerName, timer, resetGameFull); 
    }, 500);
  }
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
}

function startTimer() {
  timer = 0;
  timerDisplay.textContent = `Tempo: 0s`;
  
  timerInterval = setInterval(() => {
    timer++;
    timerDisplay.textContent = `Tempo: ${timer}s`;
    
    if (timer >= limitTimer) {
      clearInterval(timerInterval);
      lockBoard = true;
      
      audioManager.playRocket();
      
      showTeamRocket(() => {
          audioManager.stopRocket(); 
          resetGameFull(); 
      });
      
    }
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function resetBoardState() {
  cards = [];
  lockBoard = false;
  firstCard = null;
  secondCard = null;
  timer = 0;
  gameStarted = false;
  clearInterval(timerInterval);
  timerDisplay.textContent = `Tempo: 0s`;
}

// Função de Reset Completo (Soft Reset)
export function resetGameFull() {
  resetBoardState();
  gameContainer.innerHTML = "";
  
  // Troca de telas
  gameScreen.style.display = "none";
  loginScreen.style.display = "flex"; 
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}



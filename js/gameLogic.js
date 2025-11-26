// js/gameLogic.js
import { saveToRanking, loadRanking } from "./rankingManager.js";
import { showTeamRocket, showVictory } from "./uiManager.js";
import { audioManager } from "./audioManager.js";

let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let timerInterval;
let timer = 60; 
let gameStarted = false;
const limitTimer = 60;
let playerName = '';

const gameContainer = document.querySelector('.container');
const timerDisplay = document.querySelector("#timer");
const loginScreen = document.querySelector("#login-screen");
const gameScreen = document.querySelector("#game-screen");

// Verifica se o botão existe
const backBtn = document.querySelector("#back-menu-btn");
if (backBtn) {
    backBtn.addEventListener("click", resetGameFull);
}

export function createGame(pokemonList, player) {
  playerName = player;
  resetBoardState();
  
  gameContainer.innerHTML = ""; 
  gameContainer.className = 'container'; 
  
  const totalCards = pokemonList.length * 2;

  if (totalCards === 12) {
      gameContainer.classList.add('grid-easy');   
  } else if (totalCards === 20) {
      gameContainer.classList.add('grid-medium'); 
  } else if (totalCards === 30) {
      gameContainer.classList.add('grid-hard');   
  }
  
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

  const fallbackImage = 'https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/items/poke-ball.png';

  card.innerHTML = `
    <div class="front">
        <img 
            src="${imageSrc}" 
            alt="${name}" 
            loading="lazy" 
            onerror="this.onerror=null; this.src='${fallbackImage}'; this.classList.add('error-img');"
        >
    </div>
    <div class="back"></div>
  `;
  
  card.addEventListener('click', flipCard);
  return card;
}

function flipCard() {
  try {
    if (audioManager && typeof audioManager.playFlip === 'function') {
        audioManager.playFlip();
    }
  } catch (error) {
    console.log("Erro som:", error);
  }

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
    setTimeout(async () => { // Adicione ASYNC aqui
      
      const timeTaken = limitTimer - timer; 
      
      // Adicione AWAIT aqui para garantir que salvou antes de carregar
      await saveToRanking(playerName, timeTaken); 
      
      loadRanking();
      
      showVictory(playerName, timeTaken, resetGameFull); 
      if (audioManager.playRocket) audioManager.playRocket(); 
      if (audioManager.stopGameSound) audioManager.stopGameSound();
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

// --- TIMER ---
function startTimer() {
  timer = limitTimer; 
  
  timerDisplay.textContent = `Tempo: ${timer}s`;
  
  timerInterval = setInterval(() => {
    timer--; 
    timerDisplay.textContent = `Tempo: ${timer}s`;
    
    if (timer <= 0) {
      clearInterval(timerInterval);
      lockBoard = true;
      
      audioManager.stopGameSound(); 
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
  timer = limitTimer; 
  gameStarted = false;
  clearInterval(timerInterval);
  timerDisplay.textContent = `Tempo: ${limitTimer}s`; 
}

export function resetGameFull() {
  resetBoardState();
  gameContainer.innerHTML = "";
  
  gameScreen.style.display = "none";
  loginScreen.style.display = "flex"; 

  audioManager.stopGameSound();
  audioManager.playBGM();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
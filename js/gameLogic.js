// js/gameLogic.js
import { saveToRanking, loadRanking } from "./rankingManager.js";
import { showTeamRocket, showVictory } from "./uiManager.js";

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

export function createGame(pokemonList, player) {
  playerName = player;
  resetGameState();
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

  if (document.querySelectorAll('.flip').length === cards.length) {
    clearInterval(timerInterval);
    setTimeout(() => {
      showVictory(playerName, timer);
      saveToRanking(playerName, timer);
      loadRanking();
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
      showTeamRocket();
    }
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function resetGameState() {
  cards = [];
  gameContainer.innerHTML = "";
  lockBoard = false;
  firstCard = null;
  secondCard = null;
  timer = 0;
  gameStarted = false;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

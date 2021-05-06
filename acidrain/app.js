let userScore = 0;
let failScore = 100;
let userLevel = 1;
let levelUp = 1;
let matchedList = [];
let failList = [];

let appearSpeed = 5000; //ms
let dropSpeed = 10000; //ms
let userInputList = [];

let fullWords = [];

//DOMs
const gameArea = document.querySelector(".game-area");
const scoreBoard = document.querySelector(".score-board");
const currentLevel = document.querySelector(".level-num");
const currentScore = document.querySelector(".score-num");

const startScreen = document.querySelector(".start-wrap");
const gameScreen = document.querySelector(".game-wrap");
function gameStart() {
  startScreen.style.display = "none";
  gameScreen.style.visibility = "visible";
  getFullWords();
}

//Get new words from randon word api
function getFullWords() {
  if (fullWords.length === 0) {
    fetch("https://random-word-api.herokuapp.com/word?number=50")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        fullWords = json;
      });
      makeItRains();
  } else {
    makeItRains();
  }
}

let rain = null; //setting interval

function makeItRains() {
  let i = 0; //Array index number
  rain = setInterval(() => {
    //make raindrops
    if (i > fullWords.length - 1 || fullWords.length === 0) {
      clearInterval(rain);
    } else {
      const newDiv = document.createElement("div");
      newDiv.classList.add("rain-drop");
      newDiv.classList.add(fullWords[i]);
      newDiv.innerText = fullWords[i];
      gameArea.appendChild(newDiv);
      i++;
      if (fullWords[i] === "undefined") {
        fullWords.pop();
      }
      makeItFalls(newDiv);
    }
  }, appearSpeed);
}

function makeItFalls(raindrop) {
  //Set start X location
  const xLimit = gameArea.offsetWidth;
  const randomColumn = Math.floor(Math.random() * 8);
  const columnWidth = (xLimit / 8) * randomColumn;
  raindrop.style.transform = `translateX(${columnWidth}px)`;
  //make it fall
  const yLimit = gameArea.clientHeight;

  const falls = raindrop.animate(
    [
      // keyframes
      { transform: `translateX(${columnWidth}px) translateY(${yLimit}px)` },
    ],
    {
      // timing options
      duration: dropSpeed,
    }
  );

  falls.addEventListener("finish", () => {
    raindrop.style.transform = `translateX(${columnWidth}px) translateY(${yLimit}px)`;
    const endingPosition = raindrop.getBoundingClientRect().y;
    if (endingPosition >= yLimit) {
      failWords(raindrop);
    }
  });
}

//(raindrop.classList[1] === raindrop.innerText) 
function failWords(raindrop) {
  if ((failList.length-1) >= 10) {
    gameOver();
  } else {
    failList.push(raindrop.innerText);
    raindrop.remove();
  }
}

function gameOver() {
  clearInterval(rain);
  startScreen.style.display = "flex";
  startScreen.children[0].innerText = "GAME OVER"
  startScreen.children[1].innerText = "Do you want to restart?"
  startScreen.children[2].innerText = "RESTART"
  gameScreen.style.visibility = "hidden";
}

const userInput = document.querySelector(".user-input");
const submitBtn = document.getElementById("enter-btn");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const inputText = userInput.value;
  userInputList.push(inputText);
  userInput.value = "";
  if (fullWords.includes(inputText) === true) {
    matched(inputText);
  } else {
    console.log("unmatch");
  }
});

function matched(word) {
  const index = fullWords.indexOf(word);
  //remove word from display
  const correctDiv = document.querySelector(`.${word}`);
  correctDiv.remove();
  //move word to matched list
  matchedList.push(fullWords[index]);
  //add score
  userScore+=10;
  levelUp++
  currentScore.innerHTML = userScore;
  if (levelUp > 2) {
    userLevel++;
    levelUp = 1;
    currentLevel.innerHTML = userLevel;
    appearSpeed-=500;
    dropSpeed-=1000;
  }
}

function makeAllEmpty() {
  userScore = 0;
  failScore = 100;
  userLevel = 1;

  currentLevel.innerHTML = userLevel;
  currentScore.innerHTML = userScore;

  fullWords = [];
  failList = [];
  appearSpeed = 5000; //ms
  dropSpeed = 10000; //ms
  userInputList = [];

  getFullWords();
}

function restart() {
  if (gameArea.hasChildNodes()) {
    gameArea.innerHTML = "";
    makeAllEmpty();
  } else {
    gameStart();
  }
}
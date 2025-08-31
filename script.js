let randButtonId;
let currentPlayer = 1;
let p1Score = 0;
let p2Score = 0;

document.addEventListener("DOMContentLoaded", () => {
  setBoard();
  document.getElementById("button1").addEventListener("click", () => checkCorrect("button1"));
  document.getElementById("button2").addEventListener("click", () => checkCorrect("button2"));
  document.getElementById("button3").addEventListener("click", () => checkCorrect("button3"));
  document.getElementById("button4").addEventListener("click", () => checkCorrect("button4"));
  document.getElementById("button5").addEventListener("click", resetGame);
});

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setBoard() {
  const R = randomNumber(0, 235);
  const G = randomNumber(0, 235);
  const B = randomNumber(0, 235);
  const baseColor = `rgb(${R}, ${G}, ${B})`;
  const offColor = `rgb(${R + 15}, ${G + 15}, ${B + 15})`;

  // Set colors for all buttons
  for (let i = 1; i <= 4; i++) {
    document.getElementById("button" + i).style.backgroundColor = baseColor;
  }

  // Choose random button for "off" color
  randButtonId = "button" + randomNumber(1, 4);
  document.getElementById(randButtonId).style.backgroundColor = offColor;

  console.log("Correct button is: " + randButtonId);
}

function checkCorrect(buttonId) {
  if (buttonId === randButtonId) {
    console.log("You Are Right");
    updateScoreBy(1);
  } else {
    console.log("You Are Wrong!");
    updateScoreBy(-3);
  }
  checkGameOver();
  setBoard();
  switchPlayer();
}

function switchPlayer() {
  if (currentPlayer === 1) {
    currentPlayer = 2;
    document.getElementById("player1_box").classList.remove("active-player");
    document.getElementById("player2_box").classList.add("active-player");
  } else {
    currentPlayer = 1;
    document.getElementById("player2_box").classList.remove("active-player");
    document.getElementById("player1_box").classList.add("active-player");
  }
  console.log("Current player is: " + currentPlayer);
}

function updateScoreBy(amt) {
  if (currentPlayer === 1) {
    p1Score += amt;
    document.getElementById("score1_label").textContent = p1Score;
  } else {
    p2Score += amt;
    document.getElementById("score2_label").textContent = p2Score;
  }
  console.log("P1 Score: " + p1Score);
  console.log("P2 Score: " + p2Score);
}

function checkGameOver() {
  if (p1Score >= 10) {
    document.getElementById("gameOver_screen").classList.remove("d-none");
    document.getElementById("player1Win_label").classList.remove("d-none");
    document.getElementById("player2Win_label").classList.add("d-none");
  }
  if (p2Score >= 10) {
    document.getElementById("gameOver_screen").classList.remove("d-none");
    document.getElementById("player2Win_label").classList.remove("d-none");
    document.getElementById("player1Win_label").classList.add("d-none");
  }
}

function resetGame() {
  p1Score = 0;
  p2Score = 0;
  currentPlayer = 1;

  document.getElementById("score1_label").textContent = p1Score;
  document.getElementById("score2_label").textContent = p2Score;

  document.getElementById("gameOver_screen").classList.add("d-none");
  document.getElementById("player1Win_label").classList.add("d-none");
  document.getElementById("player2Win_label").classList.add("d-none");

  document.getElementById("player1_box").classList.add("active-player");
  document.getElementById("player2_box").classList.remove("active-player");

  setBoard();
}
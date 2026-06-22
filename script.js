// Select DOM elements for game control and interface
let play = document.querySelector(".playGame");
let playDiv = document.querySelector(".button");
let inputArea = document.querySelector(".guessInput");
let heading = document.querySelector(".heading");
let checkGuess = document.querySelector(".guessBtn");
let detsDiv = document.querySelector(".gameDets");
let quitBtn = document.querySelector(".quitBtn");
let restartBtn = document.querySelector(".restartBtn");

// Initialize core game variables
let count = 0;
let numberToGuess = Math.floor(Math.random() * 100) + 1;

// Setup the UI and focus input when the game starts
play.addEventListener("click", function startGame() {
    heading.textContent = "Guess the Number...you have 7 tries";
    heading.style.color = "black";
    play.setAttribute("hidden", "");
    playDiv.setAttribute("hidden", "");

    inputArea.removeAttribute("hidden");
    checkGuess.removeAttribute("hidden");
    quitBtn.removeAttribute("hidden");
    inputArea.focus();
});

// Process the user's guess and update game state
function processGuess() {
    if (count >= 7 || checkGuess.disabled) return;

    let userGuess = Number(inputArea.value);

    // Validate that the input is a valid number
    if (inputArea.value.trim() === "" || isNaN(userGuess)) {
        let errorPara = document.createElement("p");
        errorPara.textContent = "Please enter a valid number.";
        detsDiv.append(errorPara);
        inputArea.value = "";
        return;
    }

    let currentPara = document.createElement("p");
    count++;

    // Check if the user guessed the correct number
    if (userGuess === numberToGuess) {
        heading.textContent = `You Won, ${numberToGuess} was the number.`;
        heading.style.color = "green";
        detsDiv.innerHTML = "";
        endGame();
        return;
    }
    // Provide feedback for a high guess
    else if (userGuess > numberToGuess) {
        currentPara.textContent = `(${count}/7) ${userGuess} is too High, try again.`;
        currentPara.style.color = "red";
    }
    // Provide feedback for a low guess
    else if (userGuess < numberToGuess) {
        currentPara.textContent = `(${count}/7) ${userGuess} is too Low, try again.`;
        currentPara.style.color = "black";
    }

    detsDiv.append(currentPara);

    // Handle game over condition when out of tries
    if (count >= 7 && userGuess !== numberToGuess) {
        heading.textContent = `You Are Out Of Tries. The number was ${numberToGuess}.`;
        heading.style.color = "darkred";
        endGame();
    }

    // Reset input field and retain focus for the next turn
    inputArea.value = "";
    if (!checkGuess.disabled) {
        inputArea.focus();
    }
}

// Hide gameplay elements and reveal the restart option
function endGame() {
    checkGuess.setAttribute("hidden", "");
    inputArea.setAttribute("hidden", "");
    quitBtn.setAttribute("hidden", "");
    restartBtn.removeAttribute("hidden");
}

// Reset variables and UI elements for a new round
function resetGame() {
    count = 0;
    numberToGuess = Math.floor(Math.random() * 100) + 1;

    heading.textContent = "Guess the Number...you have 7 tries";
    heading.style.color = "black";
    detsDiv.innerHTML = "";

    restartBtn.setAttribute("hidden", "");
    inputArea.removeAttribute("hidden");
    checkGuess.removeAttribute("hidden");
    quitBtn.removeAttribute("hidden");

    inputArea.value = "";
    inputArea.focus();
}

// Exit the game and return to the main landing layout
function quitGame() {
    count = 0;
    heading.textContent = "Number Guessing Game...";
    heading.style.color = "black";
    detsDiv.innerHTML = "";

    inputArea.setAttribute("hidden", "");
    checkGuess.setAttribute("hidden", "");
    quitBtn.setAttribute("hidden", "");

    play.removeAttribute("hidden");
    playDiv.removeAttribute("hidden", "");
}

// Attach event listeners for user interactions
checkGuess.addEventListener("click", processGuess);

inputArea.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        processGuess();
    }
});

restartBtn.addEventListener("click", resetGame);
quitBtn.addEventListener("click", quitGame);

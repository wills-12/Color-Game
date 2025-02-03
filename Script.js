// Function to generate shades of a base color
function generateShades(baseColor, count) {
  const shades = [];
  const baseR = parseInt(baseColor.slice(1, 3), 16);
  const baseG = parseInt(baseColor.slice(3, 5), 16);
  const baseB = parseInt(baseColor.slice(5, 7), 16);

  for (let i = 0; i < count; i++) {
    const r = Math.min(
      255,
      Math.max(0, baseR + Math.floor(Math.random() * 50 - 25))
    )
      .toString(16)
      .padStart(2, "0");
    const g = Math.min(
      255,
      Math.max(0, baseG + Math.floor(Math.random() * 50 - 25))
    )
      .toString(16)
      .padStart(2, "0");
    const b = Math.min(
      255,
      Math.max(0, baseB + Math.floor(Math.random() * 50 - 25))
    )
      .toString(16)
      .padStart(2, "0");
    shades.push(`#${r}${g}${b}`);
  }
  return shades;
}

const colorBox = document.querySelector('[data-testid="colorBox"]');
const colorOptionsContainer = document.querySelector(
  '[data-testid="colorOptions"]'
);
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreElement = document.querySelector('[data-testid="score"] span');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');

let score = 0;
let targetColor;

function initGame() {
  // Generate a random base color
  const baseColor = `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
  const shades = generateShades(baseColor, 6); // Generate 6 shades of the base color

  // Select a random shade as the target color
  targetColor = shades[Math.floor(Math.random() * shades.length)];
  colorBox.style.backgroundColor = targetColor;

  // Shuffle the shades and create buttons
  const shuffledShades = [...shades].sort(() => Math.random() - 0.5);
  colorOptionsContainer.innerHTML = "";

  shuffledShades.forEach((shade) => {
    const button = document.createElement("button");
    button.className = "color-option";
    button.style.backgroundColor = shade;
    button.dataset.color = shade;
    button.setAttribute("data-testid", "colorOption");
    button.addEventListener("click", handleGuess);
    colorOptionsContainer.appendChild(button);
  });

  gameStatus.textContent = "";
}

function handleGuess(e) {
  const guessedColor = e.target.dataset.color;
  const buttons = document.querySelectorAll(".color-option");

  buttons.forEach((button) => {
    button.disabled = true; // Disable all buttons after a guess
  });

  if (guessedColor === targetColor) {
    score++; // Increment the score
    scoreElement.textContent = score; // Update the score display
    gameStatus.textContent = "Correct! Well done!";
    gameStatus.style.color = "#4CAF50";
    e.target.classList.add("correct");

    // Automatically start a new round after a short delay
    setTimeout(() => {
      initGame();
    }, 1000);
  } else {
    gameStatus.textContent = "Wrong! Try again!";
    gameStatus.style.color = "#FF5252";
    e.target.classList.add("wrong");
    buttons.forEach((button) => {
      if (button.dataset.color === targetColor) {
        button.classList.add("correct"); // Highlight the correct shade
      }
    });
  }
}

newGameButton.addEventListener("click", () => {
  score = 0; // Reset the score
  scoreElement.textContent = score; // Update the score display
  initGame(); // Reinitialize the game
});

// Initialize the game when the page loads
initGame();

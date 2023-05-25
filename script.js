// JavaScript code for the game logic
let currentPlayer = "superman";
const cells = document.querySelectorAll(".cell");

function makeMove(cellIndex) {
  const cell = cells[cellIndex];
  if (cell.textContent === "") {
    cell.textContent = currentPlayer === "superman" ? "S" : "B";
    cell.classList.add(currentPlayer);
    checkWin();
    currentPlayer = currentPlayer === "superman" ? "batman" : "superman";
  }
}

function checkWin() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    const cellA = cells[a].textContent;
    const cellB = cells[b].textContent;
    const cellC = cells[c].textContent;

    if (cellA !== "" && cellA === cellB && cellB === cellC) {
      showModal(
        currentPlayer === "superman" ? "Superman Wins!" : "Batman Wins!"
      );
      return;
    }
  }

  if (Array.from(cells).every((cell) => cell.textContent !== "")) {
    showModal("It's a Draw!");
  }
}

function showModal(message) {
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-content");
  const closeBtn = document.getElementById("close-button");

  if (message !== "It's a Draw!") {
    modal.classList.add("show");
    modalContent.innerHTML = `
    <h2>${message}</h2>
      <img src="${
        currentPlayer === "superman" ? "superman.jpg" : "batman.jpg"
      }" alt="${
      currentPlayer === "superman" ? "Superman" : "Batman"
    }" class="player-image">
    <p> ${
      currentPlayer === "superman" ? "Justice prevails!" : "I am Vengeance"
    }</p>
    <button onclick="resetGame()">Play Again</button>
  `;

    closeBtn.onclick = closeModal;
  } else {
    modal.classList.add("show");
    modalContent.innerHTML = `
    <h2>${message}</h2>
    <button onclick="resetGame()">Play Again</button>
  `;

    closeBtn.onclick = closeModal;
  }
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("show");
}

function resetGame() {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("superman", "batman");
  });
  closeModal();
  currentPlayer = "superman";
}

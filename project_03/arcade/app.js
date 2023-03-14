// // Initialize game variables
// const board = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => ''));
// let currentPlayer = '';
// let winner = null;
// let isSinglePlayer = false;
// const computerName = 'Computer';


// create the board function 
// Function to create the table with the specified number of rows and columns
// function createTable(rows, cols) {
//     // Remove any existing rows from the table
//     while (board.hasChildNodes()) {
//       board.removeChild(board.lastChild);
//     }

//     // Add the specified number of rows and columns to the table
//     for (let i = 0; i < rows; i++) {
//       const row = document.createElement("tr");
//       for (let j = 0; j < cols; j++) {
//         const cell = document.createElement("td");
//         row.appendChild(cell);
//       }
//       board.appendChild(row);
//     }
//   }

//   // Call the createTable function with the initial values of the rows and cols inputs
//   createTable(rowsInput.value, colsInput.value);

//   // Add an event listener to the rows and cols inputs to update the table when the values change
//   rowsInput.addEventListener("input", () => {
//     createTable(rowsInput.value, colsInput.value);
//   });

//   colsInput.addEventListener("input", () => {
//     createTable(rowsInput.value, colsInput.value);
//   });

//   if (player2Name === 'Computer' && currentPlayer === 'O') {
//     playerTurnEl.textContent = 'Computer wins!';
//     break;
// }

// Get references to HTML elements
const player1NameInput = document.getElementById("player1-name");
const player2NameInput = document.getElementById("player2-name");
const playerTurnEl = document.getElementById("player-turn");

// Set up game variables
let player1Name = "";
let player2Name = "";
let currentPlayer = "X";
let gameOver = false;

//isSingle player function to check if it is single player 

function isSinglePlayer() {
    return player2NameInput.value.trim() === "";
}

// Event listener for "Start Game" button
document.getElementById("start-button").addEventListener("click", () => {

    if (!player1NameInput.value) {

        player1NameInput.value = "Player 1";
    }
    player1Name = player1NameInput.value;
    if (isSinglePlayer()) {
        player2Name = "Computer";
    } else {
        player2Name = player2NameInput.value;
    }
    startGame();
});

// Event listener for "Reset Game" button and refresh the page
document.getElementById("reset-button").addEventListener("click", () => {
    location.reload();
});


//Choose random order of players

function startGame() {
    if (Math.random() > 0.5) {
        playerTurnEl.textContent = `${player2Name}'s turn`;
        currentPlayer = "O";
    } else {
        playerTurnEl.textContent = `${player1Name}'s turn`;
        currentPlayer = "X";
    }
    if (player2Name === "Computer" && currentPlayer === "O") {
        computerMove();
    }

}


// Set up event listeners for each cell
const cells = document.getElementsByTagName("td");
for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", () => {
        if (!gameOver && cells[i].textContent === "") {
            cells[i].textContent = currentPlayer;
            var win = checkWin();
            var draw = checkDraw();
            if (!win && !draw) {
                switchPlayer();
                if (player2Name === "Computer" && currentPlayer === 'O' && !gameOver) {
                    computerMove();
                }
            }
        }
    });
}

//Switch players after the current player mark. 

function switchPlayer() {
    if (currentPlayer === 'X') {
        currentPlayer = 'O';
        playerTurnEl.textContent = `${player2Name}'s turn`;
    } else {
        currentPlayer = 'X';
        playerTurnEl.textContent = `${player1Name}'s turn`;
    }
}

// Function to check if there is a win or draw
function checkWin() {
    const winningMoves = [
        // Horizontal
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Vertical
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagonal
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < winningMoves.length; i++) {
        const [a, b, c] = winningMoves[i];
        if (cells[a].textContent === cells[b].textContent && 
            cells[b].textContent === cells[c].textContent && 
            cells[a].textContent !== "") {
            gameOver = true;
            
            if (currentPlayer === 'X') {
                playerTurnEl.textContent = `${player1Name} wins!`;
            }
            else {
                playerTurnEl.textContent = `${player2Name} wins!`;
            }
            setTimeout(resetGame, 5000);
            return true;
        }
    }
    return false;
}

// display "draw" when players didn't win 

function checkDraw() {
    let draw = true;
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].textContent === "") {
            checkWin()
            draw = false;
            break;
        }
    }
    if (draw) {
        const win = checkWin();
        if (!win) {
            playerTurnEl.textContent = "Draw!";
            gameOver = true;
            setTimeout(resetGame, 5000);
            return true;

        }
    }
    return false;
}

// computer logic move function 
function computerMove() {
    //Generate a random index for the computer move
    let index = Math.floor(Math.random() * 9);
    let cell = cells[index];


    // If the chosen cell is already taken, generate a new index until an empty cell is found
    while (cell.textContent !== "") {
        index = Math.floor(Math.random() * 9);
        cell = cells[index];
    }


    // Make the computer move by setting the cell's text content to 'O'

    cell.textContent = currentPlayer = 'O'

    if(checkWin() == false){
        switchPlayer()
        playerTurnEl.textContent = `${player2Name} placed an O at cell ${index + 1}. ${player1Name}'s turn.`;
    }
}
function resetGame() {
    
    // Clear the board by setting each cell's text content to an empty string
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = "";
    }
    
    // Reset the game variables

    player1Name = "";
    player2Name = "";
    currentPlayer = "X";
    player1NameInput.value = player1Name;
    player2NameInput.value = player2Name;
    currentPlayer = "X";
    gameOver = false;

    alert("The game has been reset.");

}

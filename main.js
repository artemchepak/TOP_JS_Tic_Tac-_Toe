let turnTracker = 1;
let winner = null;

const Gameboard = {
    gameboard: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    boardMarker: ['a', 'b', 'c'],
    drawBoard() {
        this.gameboard.forEach((row, i) => {
            row.forEach((cell, j) => {
                const cellId = `${this.boardMarker[j]}${i + 1}`;
                const cellElement = document.querySelector(`[data-cell="${cellId}"]`);
                cellElement.textContent = cell === 0 ? '' : cell;
            });
        });
    },
    resetBoard() {
        this.gameboard = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        this.drawBoard();
    }
};

const Game = {
    startGame() {
        document.getElementById('start-game').addEventListener('click', () => {
            const playerOneName = document.getElementById('player-one-name').value.trim();
            const playerTwoName = document.getElementById('player-two-name').value.trim();

            if (playerOneName && playerTwoName) {
                Players.playerOne.name = playerOneName;
                Players.playerTwo.name = playerTwoName;
                Players.pickPlayer();
                Gameboard.drawBoard();
                document.getElementById('turn-info').textContent = `Player ${turnTracker === 1 ? Players.playerOne.name : Players.playerTwo.name}'s turn`;
                this.runGame();
            } else {
                alert('Please enter names for both players.');
            }
        });
    },
    makeChoice(cell) {
        const cellId = cell.getAttribute('data-cell');
        const [letter, number] = cellId;
        const rowIndex = number - 1;
        const colIndex = Gameboard.boardMarker.indexOf(letter);

        if (this.isValidMove(Gameboard.gameboard[rowIndex][colIndex])) {
            const marker = turnTracker === 1 ? Players.playerOne.marker : Players.playerTwo.marker;
            Gameboard.gameboard[rowIndex][colIndex] = marker;
            turnTracker = turnTracker === 1 ? 2 : 1;

            Gameboard.drawBoard();
            document.getElementById('turn-info').textContent = `Player ${turnTracker === 1 ? Players.playerOne.name : Players.playerTwo.name}'s turn`;

            if (this.checkWinner() || this.checkTie()) {
                this.endGame();
            }
        } else {
            alert('The cell is already chosen. Pick another cell');
        }
    },
    runGame() {
        document.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', () => {
                if (!winner) {
                    this.makeChoice(cell);
                }
            });
        });
    },
    isValidMove(boardCell) {
        return boardCell === 0;
    },
    checkWinner() {
        const lines = [
            ...Gameboard.gameboard, // Rows
            ...Gameboard.boardMarker.map((_, i) => Gameboard.gameboard.map(row => row[i])), // Columns
            [0, 1, 2].map(i => Gameboard.gameboard[i][i]), // Diagonal 1
            [0, 1, 2].map(i => Gameboard.gameboard[i][2 - i]) // Diagonal 2
        ];

        for (const line of lines) {
            if (line.every(cell => cell === Players.playerOne.marker)) {
                winner = Players.playerOne.name;
                break;
            } else if (line.every(cell => cell === Players.playerTwo.marker)) {
                winner = Players.playerTwo.name;
                break;
            }
        }

        if (winner) {
            document.getElementById('result-info').textContent = `Winner is ${winner}`;
            return true;
        }
        return false;
    },
    checkTie() {
        if (Gameboard.gameboard.flat().every(cell => cell !== 0)) {
            document.getElementById('result-info').textContent = `It's a tie!`;
            return true;
        }
        return false;
    },
    endGame() {
        document.querySelectorAll('.cell').forEach(cell => {
            cell.removeEventListener('click', this.makeChoice);
        });
        setTimeout(() => {
            Gameboard.resetBoard();
            document.getElementById('result-info').textContent = '';
            winner = null;
            this.startGame();
        }, 3000);
    }
};

const Players = {
    playerOne: {
        name: "Player 1",
        marker: "X"
    },
    playerTwo: {
        name: "Player 2",
        marker: "O"
    },
    pickPlayer() {
        const marker = prompt('Pick the player who plays first. Enter X or O').trim().toUpperCase();
        if (marker === 'X') {
            turnTracker = 1;
        } else if (marker === 'O') {
            turnTracker = 2;
        } else {
            alert('Enter valid marker');
            this.pickPlayer();
        }
    }
};

Game.startGame();

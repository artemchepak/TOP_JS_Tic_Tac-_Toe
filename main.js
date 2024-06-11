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
        console.log('   a b c');
        this.gameboard.forEach((row, i) => {
            console.log(`${i + 1} |${row.join('|')}|`);
        });
    },
    resetBoard() {
        this.gameboard = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
    }
};

const Game = {
    startGame() {
        const input = prompt('To start the game prompt enter START');
        if (input.trim().toUpperCase() === 'START') {
            Gameboard.drawBoard();
            this.runGame();
        } else {
            this.startGame();
        }
    },
    makeChoice() {
        const userChoice = prompt('Choose cell to put your marker in. Use LetterNumber id - a1, c3, etc');
        const [letter, number] = userChoice;
        const rowIndex = number - 1;
        const colIndex = Gameboard.boardMarker.indexOf(letter);

        if (this.isValidMove(Gameboard.gameboard[rowIndex][colIndex])) {
            const marker = turnTracker === 1 ? Players.playerOne.marker : Players.playerTwo.marker;
            Gameboard.gameboard[rowIndex][colIndex] = marker;
            turnTracker = turnTracker === 1 ? 2 : 1;

            Gameboard.drawBoard();
            if (this.checkWinner() || this.checkTie()) {
                this.restartGame();
            }
        } else {
            alert('The cell is already chosen. Pick another cell');
            this.makeChoice();
        }
    },
    runGame() {
        Players.pickPlayer();
        while (winner === null) {
            this.makeChoice();
        }
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
            console.log(`Winner is ${winner}`);
            return true;
        }
        return false;
    },
    checkTie() {
        if (Gameboard.gameboard.flat().every(cell => cell !== 0)) {
            console.log(`It's a tie!`);
            return true;
        }
        return false;
    },
    restartGame() {
        winner = null;
        Gameboard.resetBoard();
        this.startGame();
    }
};

const Players = {
    playerOne: {
        name: "tim",
        marker: "X"
    },
    playerTwo: {
        name: "jenn",
        marker: "O"
    },
    pickPlayer() {
        const input = prompt('Pick the player who plays first. Enter X or O');
        if (input.trim().toUpperCase() === 'X') {
            turnTracker = 1;
        } else if (input.trim().toUpperCase() === 'O') {
            turnTracker = 2;
        } else {
            alert('Enter valid marker');
            this.pickPlayer();
        }
    }
};

Game.startGame();
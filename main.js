let turnTracker = 1;
let winner = null;

let Gameboard = {
    gameboard: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    boardMarker: ['a', 'b', 'c'],
    drawBoard: function () {
        let i = 1;
        console.log(`   a b c`);
        this.gameboard.forEach(element => {
            console.log(`${i} |${element[0]}|${element[1]}|${element[2]}|`);
            i++;
        });
    }
}

let Game = {
    startGame: function () {
        let input = prompt('To start the game promt enter START');
        if (input.trim().toUpperCase() === 'START') {
            Gameboard.drawBoard();
            this.runGame();
        }
        else {
            this.startGame();
        }
    },
    makeChoice: function () {
        let userChoice = prompt('Choose cell to put your marker in. Use LetterNumber id - a1, c3, etc');
        let arrayIndexOne = userChoice[1] - 1;
        let arrayIndexTwo = Gameboard.boardMarker.indexOf(userChoice[0]);
        let boardCell = Gameboard.gameboard[arrayIndexOne][arrayIndexTwo];
        if (this.userInputValidation(boardCell)) {
            let value;
            if (turnTracker === 1) {
                value = Players.playerOne.marker;
                turnTracker++;
            } else if (turnTracker === 2) {
                value = Players.playerTwo.marker;
                turnTracker--;
            }
            Gameboard.gameboard[arrayIndexOne][arrayIndexTwo] = value;
            Gameboard.drawBoard();
            this.checkWinner();
            this.checkTie();
        }
        else {
            alert('The cell is already chosen. Pick Another cell');
            this.makeChoice();
        }
    },
    runGame: function () {
        Players.pickPlayer();
        while (winner === null) {
            this.makeChoice();
        }
    },
    userInputValidation: function (boardCell) {
        if (boardCell === 0) {
            return true;
        }
        else {
            return false;
        }
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
    checkTie: function () {
        if (winner === null) {
            let isItTie;
            Gameboard.gameboard.forEach(element => {
                if (element.includes('X') && !element.includes(0)) {
                    isItTie = true;
                }

                if (isItTie) {
                    console.log(`It's a tie!`);
                    this.restartGame();
                }
            });
        }
    },
    restartGame: function () {
        winner = null;
        Gameboard.gameboard = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        this.startGame();
    }
}

const Players = {
    playerOne: {
        name: "tim",
        marker: "X"
    },
    playerTwo: {
        name: "jenn",
        marker: "O"
    },
    pickPlayer: function () {
        let input = prompt('Pick the player who plays first. Enter X or O');
        if (input.trim().toUpperCase() === 'X') {
            turnTracker = 1;
        }
        else if (input.trim().toUpperCase() === 'O') {
            turnTracker = 2;
        }
        else {
            alert('Enter valid marker');
            this.pickPlayer();
        }
    }
}

Game.startGame();
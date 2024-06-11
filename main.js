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
        }
        else {
            alert('The cell is already chosen. Pick Another cell');
            this.makeChoice();
        }
    },
    runGame: function () {
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
    checkWinner: function () {
        let lines = [];
        //Adding horizontal lines to array of lines 
        for (let i = 0; i < Gameboard.gameboard.length; i++) {
            lines.push(Gameboard.gameboard[i]);
        }
        //Adding vertical lines to array of lines 
        for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
            let array = [];
            for (let i = 0; i < 3; i++) {
                array.push(Gameboard.gameboard[i][columnIndex]);
            }
            lines.push(array);
        }
        //Adding diagonal lines to array of lines 
        lines.push([
            Gameboard.gameboard[0][0],
            Gameboard.gameboard[1][1],
            Gameboard.gameboard[2][2]
        ]);
        lines.push([
            Gameboard.gameboard[2][0],
            Gameboard.gameboard[1][1],
            Gameboard.gameboard[0][2]
        ]);

        function checkPlayerOne(element) {
            return element === Players.playerOne.marker;
        }
        function checkPlayerTwo(element) {
            return element === Players.playerTwo.marker;
        }

        for (let i = 0; i < lines.length; i++) {
            if (lines[i].every(checkPlayerOne)) {
                winner = Players.playerOne.name;
                break;
            }
        }

        if (winner === null) {
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].every(checkPlayerTwo)) {
                    winner = Players.playerTwo.name;
                    break;
                }
            }
        }

        if (winner) {
            console.log(`Winner is ${winner}`);
            this.restartGame();
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
    }


}

Game.startGame();
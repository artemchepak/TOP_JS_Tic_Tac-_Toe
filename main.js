let turnTracker = 0;

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
            this.makeChoice();
        }
    },
    makeChoice: function () {
        let userChoice = prompt('Choose cell to put your marker in. Use LetterNumber id - a1, c3, etc');
        Gameboard.gameboard[userChoice[1]-1][Gameboard.boardMarker.indexOf(userChoice[0])] = Players.playerOne.marker;
        Gameboard.drawBoard();
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
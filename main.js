const Gameboard = {
    gameboard: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    drawBoard: function () {
        let i = 1;
        console.log(`   a b c`);
        this.gameboard.forEach(element => {
            console.log(`${i} |${element[0]}|${element[1]}|${element[2]}|`);
            i++;
        });
    }
}


Gameboard.drawBoard();
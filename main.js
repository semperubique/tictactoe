const createPlayer = (name, marker) => {
    return {name, marker};
}

const game = (() => {
    const playerOne = createPlayer('Player 1', 'x');
    const playerTwo = createPlayer('Player 2', 'o');

    let activePlayer = playerOne;
    let winnerDeclared = false;
    let remainingSpots = 9;

    let subtext = document.querySelector('.subtext'); 
    let playerName = document.querySelector('.player-name');

    const winningAxes = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    function checkWinner() {
        winningAxes.forEach((item) => {
            if (gameBoard.board[item[0]] === this.activePlayer.marker && gameBoard.board[item[1]] === this.activePlayer.marker && gameBoard.board[item[2]] === this.activePlayer.marker) {
                subtext.innerHTML = `<b>${this.activePlayer.name} wins!</b>`;
                this.winnerDeclared = true;
            } 
        })
    }

    function alertNextPlayer() {
        this.activePlayer === playerOne ? playerName.textContent = 'Player 2' : playerName.textContent = 'Player 1';
    }

    // next player
    function nextPlayer() {
        this.activePlayer === playerOne ? this.activePlayer = playerTwo : this.activePlayer = playerOne;
    }

    // declare tie
    function declareTie() {
        subtext.innerHTML = "<b>Tie game!</b>";
    }

    return {
        activePlayer,
        remainingSpots,
        checkWinner,
        alertNextPlayer,
        nextPlayer,
        declareTie,
        winnerDeclared
    };
})();

const gameBoard = (() => {
    let board = ['','','','','','','','',''];

    const squares = document.querySelector('.squares');

    board.forEach(() => {
        const square = document.createElement('div');
        square.className = 'square';
        squares.appendChild(square);
    })

    game.alertNextPlayer();

    Array.from(squares.children).forEach((square,index) => {
        square.addEventListener('click', () => {
            square.textContent = game.activePlayer.marker;

            board[index] = game.activePlayer.marker;
            
            square.style.pointerEvents = 'none';
            
            game.remainingSpots -= 1;
            
            game.checkWinner();
            
            if (game.winnerDeclared == false) {
                if (game.remainingSpots > 0) {
                    game.alertNextPlayer();
                    game.nextPlayer();
                } else if (game.remainingSpots == 0) {
                    game.declareTie();
                }
            }
            else {
                Array.from(squares.children).forEach((square, index) => {square.style.pointerEvents = 'none'});
            }
        });
    });
    
    return {board};
})();
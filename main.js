const gameBoard = (() => {
    let gameBoardArray = ["","","","","","","","",""];

    const mark = (sideChoice, indexOfMark) => {
            if(gameBoardArray[indexOfMark-1] === ""){
                gameBoardArray[indexOfMark-1]=sideChoice; 
                return true;
            }
            else {
                return false;
            }
    };

    const testIfGameEnded = () => {
        if(gameBoardArray[0] !== "" && (gameBoardArray[0] === gameBoardArray[1] && gameBoardArray[1] === gameBoardArray[2])) {
            console.log('END');
        }
        else if(gameBoardArray[3] !== "" && (gameBoardArray[3] === gameBoardArray[4] && gameBoardArray[4] === gameBoardArray[5])) {
            console.log('END');
        }
        else if(gameBoardArray[6] !== "" && (gameBoardArray[6] === gameBoardArray[7] && gameBoardArray[7] === gameBoardArray[8])) {
            console.log('END');
        }
        else if(gameBoardArray[0] !== "" && (gameBoardArray[0] === gameBoardArray[3] && gameBoardArray[3] === gameBoardArray[6])) {
            console.log('END');
        }
        else if(gameBoardArray[1] !== "" && (gameBoardArray[1] === gameBoardArray[4] && gameBoardArray[4] === gameBoardArray[7])) {
            console.log('END');
        }
        else if(gameBoardArray[2] !== "" && (gameBoardArray[2] === gameBoardArray[5] && gameBoardArray[5] === gameBoardArray[8])) {
            console.log('END');
        }
        else if(gameBoardArray[0] !== "" && (gameBoardArray[0] === gameBoardArray[4] && gameBoardArray[4] === gameBoardArray[8])) {
            console.log('END');
        }
        else if(gameBoardArray[2] !== "" && (gameBoardArray[2] === gameBoardArray[4] && gameBoardArray[4] === gameBoardArray[6])) {
            console.log('END');
        }
    }

    const waitForMarking = (player1, player2) => {
        const markPlaces = document.querySelectorAll(".mark-place");

        markPlaces.forEach(markPlace => markPlace.addEventListener('click', () => {
            if(player1.isMyTurn) {
                const canCantinue = player1.playTurn(markPlace.id); 
                if(canCantinue) {
                    player1.isMyTurn = false; 
                    player2.isMyTurn = true;    
                }
            }
            else if(player2.isMyTurn) {
                const canCantinue = player2.playTurn(markPlace.id); 
                if(canCantinue) {
                    player2.isMyTurn = false; 
                    player1.isMyTurn = true;    
                }
            };
            displayController.displayGameBoard();
            testIfGameEnded();
        })); 
    };

    const clear = () => gameBoardArray = ["","","","","","","","",""];
    return {gameBoardArray, mark, clear, waitForMarking};
})();

const displayController = (() => {
    const displayGameBoard = () => {
        for(i in gameBoard.gameBoardArray) {
            const markPlace = document.getElementById(`${Number(i)+1}`);
            markPlace.textContent = gameBoard.gameBoardArray[i];
        }
    };

    // const clearGameboard = () => {
    //     const resetButton = document.querySelector('#restart_button');
    //     resetButton.addEventListener('click', () => {
    //         console.log("HAAAAAAAAa")
    //         gameBoard.clear();
    //         displayGameBoard();    
    //     });
    // }

    return {displayGameBoard};
})();

const Player = (sideChoice, isMyTurn) => { 
    const playTurn = (indexOfMark) => {
        return gameBoard.mark(sideChoice, indexOfMark);
    };

    return {sideChoice: sideChoice, playTurn: playTurn, isMyTurn: isMyTurn};
}

function playGame() {
    const player1 = Player('x', true);
    const player2 = Player('o', false);
    displayController.displayGameBoard();    
    gameBoard.waitForMarking(player1, player2);
}

playGame();

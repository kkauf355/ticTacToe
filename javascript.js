const Player = (playerName, playerMarker) => {
    const getName = () => playerName;
    const getMarker = () => playerMarker;
    return {
        getName, getMarker
    }
}

const Gameboard = (() => {
    let gameboard = ["","","","","","","","",""];

    const getGameboard = () => {
        return(gameboard);
    }

    const resetGameboard = () => {
        gameboard = ["","","","","","","","",""];
    }

    const setGameboard = (i,marker) => {
        gameboard[i] = marker;
    }
    return {
        getGameboard, resetGameboard, setGameboard
    }

})();

const displayController = (() => {
    let round = 1;
    let gameOver = false;

    const _squares = document.querySelectorAll('.GameSquare');
    const _Round = document.querySelector('#RoundNum');
    const _Results = document.querySelector('.Results');
    const _Players = document.querySelectorAll('.Players');
    const _Winner = document.querySelector('#Winner');
    const _PlayAgain = document.querySelector('#PlayAgain');
    
    const initGame = () => {
        _squares.forEach(GameSquare => {
            GameSquare.addEventListener('click', setMarker);
        });
        _PlayAgain.addEventListener('click', resetGame);

        const player1 = Player("Player 1", "X");
        const player2 = Player("Player 2", "O");

        Gameboard.resetGameboard();
    };

    function resetGame() {
        Gameboard.resetGameboard();
        let gameboard = Gameboard.getGameboard();
        _squares.forEach((GameSquare, ind) => {
            console.log(gameboard[ind]);
            GameSquare.textContent = gameboard[ind];
        });
        
        round = 1;
        _Round.textContent = round;
        gameOver = false;
        _Results.classList.toggle('HideResults');
        document.querySelector('#P1').classList.add('MyTurn');
        document.querySelector('#P2').classList.remove('MyTurn');
    };

    function setMarker() {
        // at some point I would like to put <p> inside the GameSquare divs. I need to figure out how to query for <p> from inside this function.
        if(!gameOver & this.textContent.length === 0) {
            let marker = getMarker();
            this.textContent = marker;

            let id = this.id;
            let idInt = id.substr(id.length-1, 1);
            Gameboard.setGameboard(idInt, marker);

            console.log(Gameboard.getGameboard());
            if (checkWin(Gameboard.getGameboard())) {
                gameOver = true;
                _Results.classList.toggle('HideResults')
                if (marker === 'x') {
                    _Winner.textContent = 'Player 1';
                } else {
                    _Winner.textContent = 'Player 2';
                }
            }

            incRound();
        }
    };

    function incRound() {
        round++;
        _Players.forEach(Players => {
            Players.classList.toggle('MyTurn');
        });
        _Round.textContent = round;
        if(round === 10) {
            gameOver = true;
            _Results.classList.toggle('HideResults');
        }
        
    }
    _squares.forEach(GameSquare => {
        GameSquare.addEventListener('click', setMarker);
    });

    function getMarker() {
        if (round % 2 === 0) {
            return 'o';
        } else {
            return 'x';
        }
    }

    function checkWin(gameboard) {
        return checkVerticalWin(gameboard) || checkHorizontalWin(gameboard) || checkDiagonalWin(gameboard);
    }

    function checkVerticalWin(gameboard) {
        for(i=0;i<3;i++) {
            let x = gameboard[i+3*0];
            if (x === "") {
                continue;
            }
            let y = gameboard[i+3*1];
            let z = gameboard[i+3*2];
            // console.log("x = y = z: " + (x === y & y === z))
            if(x === y & y === z) {
                console.log('Vertical win on column ' + (i+1))
                return true;
            }
        }
    }

    function checkHorizontalWin(gameboard) {
        for(i=0;i<3;i++) {
            let x = gameboard[3*i+0];
            if (x === "") {
                continue;
            }
            let y = gameboard[3*i+1];
            let z = gameboard[3*i+2];
            // console.log("x = y = z: " + (x === y & y === z))
            if(x === y & y === z) {
                console.log('Horizontal win on row ' + (i+1))
                return true;
            }
        }
    }

    function checkDiagonalWin(gameboard) {
        if ((gameboard[4] != "") & ((gameboard[0] === gameboard[4] & gameboard[4] === gameboard[8]) || (gameboard[2] === gameboard[4] & gameboard[4] === gameboard[6]))) {
            console.log('Diagonal win')
            return true;
        }
    }

    return {
        initGame
    }
})();


displayController.initGame();

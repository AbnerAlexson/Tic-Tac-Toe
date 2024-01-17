// get user data from the game settings option

// attach gametile to event listner.

// and then start the game

// program need to check what gamemode we're playing

// we need to set win condition

// we need to determine current player

// after each players move check if win condition is meant.
// HvH, HvEAI, HvHAI

const form = document.querySelector('#settingForm');

// collects user data
form.addEventListener('submit', (event) => {
    event.preventDefault() // prevent submit button from refreshing the page

    // function that extracts data and turns it to an object
    function collectData () {
        const player1Name = document.querySelector('#form1').value;
        const player2Name = document.querySelector('#form2').value;
        let choice = document.querySelector('input[name="choice"]:checked').value;
        return { player1Name, player2Name, choice }
    };

    gameData = collectData(); //store data
    document.querySelector('.modal-wrapper').setAttribute('hidden', true); // closes the modal after submiting data
    //console.log(gameData) // for testing should be removed
    startGame(gameData)
});

const initializeVariable = (varData) => {
    // initializing game variable
    varData.choice = +gameData.choice;
    varData.board = [1, 1, 2, 3, 4, 5, 6, 7, 8];
    varData.player1 = 'X';
    varData.player2 = 'O';
    varData.round = 0;
    varData.currentPlayer = 'X';
    varData.gameOver = false;
}

const addEventlistenersIntoGameboard = (data) => {
    document.querySelectorAll('.tile').forEach((tile) => {
        tile.addEventListener('click', (event) => {
            playMoves(event.target, data);
        })
    })
}

const startGame = (gameData) => {
    initializeVariable(gameData) // initialize game variables
    addEventlistenersIntoGameboard(gameData) // atached event listeners to gameboard
}

const playMoves = (tile, data) => {
    //check if game is finish, if it is then dont do anything
    if (data.gameOver || data.round > 9) {
        return;
    }

    //check if tile is marked, if so, don't do anything
    if (data.board[tile.id] === 'X' || data.board[tile.id] === 'O') {
        return;
    }
    
    // manipulate the dom for each tile, and then check win condition
    data.board[tile.id] = data.currentPlayer;
    tile.textContent = data.currentPlayer;

    // increment round
    data.round++;
}
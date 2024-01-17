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
    varData.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    varData.player1 = 'X';
    varData.player2 = 'O';
    varData.round = 0;
    varData.currentPlayer = 'X';
    varData.gameOver = false;
}

const startGame = (gameData) => {
    // initialize game variables
    // atached event listeners to gameboard
    initializeVariable(gameData)
    console.log(gameData)
    
}
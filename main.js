// get user data from the game settings option

// attach gametile to event listner.

// and then start the game

// program need to check what gamemode we're playing

// we need to set win condition

// we need to determine current player

// after each players move check if win condition is meant.
// HvH, HvEAI, HvHAI

const endGameCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const form = document.querySelector("#settingForm");

// collects user data
form.addEventListener("submit", (event) => {
  event.preventDefault(); // prevent submit button from refreshing the page

  // function that extracts data and turns it to an object
  function collectData() {
    const player1Name = document.querySelector("#form1").value;
    const player2Name = document.querySelector("#form2").value;
    let choice = document.querySelector('input[name="choice"]:checked').value;
    return { player1Name, player2Name, choice };
  }

  gameData = collectData(); //store data
  document.querySelector(".modal-wrapper").setAttribute("hidden", true); // closes the modal after submiting data
  //console.log(gameData) // for testing should be removed
  console.log(gameData)
  startGame(gameData);
});

const initializeVariable = (varData) => {
  // initializing game variable
  varData.choice = +varData.choice;
  varData.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  varData.player1 = "X";
  varData.player2 = "O";
  varData.round = 0;
  varData.currentPlayer = "X";
  varData.gameOver = false;
};

const addEventlistenersIntoGameboard = (data) => {
  document.querySelectorAll(".tile").forEach((tile) => {
    tile.addEventListener("click", (event) => {
      playMoves(event.target, data);
    });
  });
};

const startGame = (gameData) => {
manipulateDom('displayTurn', `${gameData.player1Name}'s turn`)
  initializeVariable(gameData); // initialize game variables
  addEventlistenersIntoGameboard(gameData); // atached event listeners to gameboard
};

const playMoves = (tile, data) => {
  //check if game is finish, if it is then dont do anything
  if (data.gameOver || data.round > 9) {
    return;
  }

  //check if tile is marked, if so, don't do anything
  if (data.board[tile.id] === "X" || data.board[tile.id] === "O") {
    return;
  }

  // manipulate the dom for each tile, and then check win condition
  data.board[tile.id] = data.currentPlayer;
  tile.textContent = data.currentPlayer;

  // increment round
  data.round++;

  //check end conditions
  if (endConditions(data)) {
    return;
  }

  // switch turns of players between rounds
  // change Displaytun, and change data.currentplayer from "X" to 'O' and vice versa
  switchPlayer(data);
};

const endConditions = (data) => {
  // check game conditions below
  // check for a winner
  // check if game is tied
  // game in not over
  if (checkWinner(data)) {
    //display winner through the dom to annouce the winner
    let winningPlayer = data.currentPlayer === "X" ? data.player1Name : data.player2Name
    manipulateDom('displayTurn', winningPlayer + ' has won the game!')
    return true;
  } else if (data.round === 9) {
    manipulateDom('displayTurn', 'it\'s a Tie Game!') //display tie through the dom to reflect a tie game situation
    data.gameOver = true;
    return true;
  }
  return false;
};

const checkWinner = (data) => {
  let result = false;
  endGameCondition.forEach(condition => {
    if (data.board[condition[0]] === data.board[condition[1]] && data.board[condition[1]] === data.board[condition[2]]) {
        console.log('winner')
        data.gameOver = true;
        result = true;
    }
  })
  return result;
};

// Function to manipulate dom
const manipulateDom = (className, textContent) => {
    const elem = document.querySelector(`.${className}`);
    elem.setAttribute('display', 'block');
    elem.textContent = textContent;
}

// function to switch player 
const switchPlayer = (data) => {
    if (data.currentPlayer === "X") {
        data.currentPlayer = "O"
        manipulateDom('displayTurn', `${data.player2Name}'s turn`) // change displayTurn
    } else if (data.currentPlayer === "O") {
        data.currentPlayer = "X"
        manipulateDom('displayTurn', `${data.player1Name}'s turn`) // change displayTurn
    }

}
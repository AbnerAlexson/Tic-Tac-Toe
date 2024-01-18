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
const newGamebtn = document.querySelector('#newGameBtn');
const restartGameBtn = document.querySelector('#resetGameBtn');



newGamebtn.addEventListener('click', () => {
  location.reload()
})

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

// reset the tiles to empthy
const resetDom = () => {
  document.querySelectorAll('.tile').forEach((tile) => {
    tile.textContent = '';
  })
}

const addEventlistenersIntoGameboard = (data) => {
  document.querySelectorAll(".tile").forEach((tile) => {
    tile.addEventListener("click", (event) => {
      playMoves(event.target, data);
    });
  });
  restartGameBtn.addEventListener('click', () => { // button that reset's the game
  initializeVariable(data);
  resetDom();
  manipulateDom('displayTurn', `${gameData.player1Name}'s turn`) // testing
  })
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
  if (data.choice === 0) {
    switchPlayer(data); // human vs human mode
  } else if (data.choice === 1) {
    easyAiTurn(data); // easy ai 
    data.currentPlayer = "X" //change player1
  } else if (data.choice === 2) {
    switchPlayer(data);
    impossibleAIMove(data);
    if (endConditions(data)) {
      return;
    }
    switchPlayer(data);
  }
  
};

const endConditions = (data) => {
  // check game conditions below
  // check for a winner
  // check if game is tied
  // game in not over
  if (checkWinner(data, data.currentPlayer)) {
    //display winner through the dom to annouce the winner
    let winningPlayer = data.currentPlayer === "X" ? data.player1Name : data.player2Name
    manipulateDom('displayTurn', winningPlayer + ' has won the game!')
    data.gameOver = true;
    return true;
  } else if (data.round === 9) {
    manipulateDom('displayTurn', 'it\'s a Tie Game!') //display tie through the dom to reflect a tie game situation
    data.gameOver = true;
    return true;
  }
  return false;
};

const checkWinner = (data, player) => {
  let result = false;
  endGameCondition.forEach((condition) => {
    if (data.board[condition[0]] === player && 
        data.board[condition[1]] === player && 
        data.board[condition[2]] === player
        ) {
        result = true;
    }
  });
  return result;
};

// Function to manipulate dom
const manipulateDom = (className, textContent) => {
    const elem = document.querySelector(`.${className}`);
    //elem.setAttribute('display', 'block');
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

const easyAiTurn = (data) => {
    switchPlayer(data)
    data.round++;

    // filter marked tiles and return a single index representing the ai's move 
    let availableIndex = data.board.filter((index) => 
    index !== "X" && index !== "O"
    )
    let availableTiles = availableIndex[Math.floor(Math.random() * availableIndex.length)];
    data.board[availableTiles] = data.player2;

    setTimeout(() => { // make so the ai does not repond instantly to mark the tiles
      let tile = document.getElementById(`${availableTiles}`)
      tile.textContent = data.player2;
    }, 200)

    if (endConditions(data)) {
      return
    };
    switchPlayer(data);
};

const impossibleAIMove = (data) => {
  data.round++
  // get best possible move with minimax algorithm
  const move = minimax(data, "O").index;
  data.board[move] = data.player2;
  let box = document.getElementById(`${move}`);
  box.textContent = data.player2;
};
// using minimax algorithm to create an impossible AI
const minimax = (data, player) => {
  let availableIndex = data.board.filter(
    (index) => index !== "X" && index !== "O");
   // console.log(availableIndex)
  if (checkWinner(data, data.player1)) {
    return {
      score: -100,
    };
  } else if (checkWinner(data, data.player2)) {
    return {
      score: 100,
    };
  } else if (availableIndex.length === 0) {
    return {
      score: 0,
    };
  }
  // check if winner, if player1 wins set score to -100
  // if it's a tie, set score to 0
  //if ai wins ser score to 100
  const potentialMoves = [];
  //loop over available spaces to get list of all potential moves and check if wins
  for (let i = 0; i < availableIndex.length; i++) {
    let move = {};
    move.index = data.board[availableIndex[i]];
    data.board[availableIndex[i]] = player;
    if (player === data.player2) {
      move.score = minimax(data, data.player1).score;
    } else {
      move.score = minimax(data, data.player2).score;
    }
    // reset the move on the board
    data.board[availableIndex[i]] = move.index;
    //push the potential move to the array
    potentialMoves.push(move);
  }
  let bestMove = 0;
  if (player === data.player2) {
    let bestScore = -10000;
    for (let i = 0; i < potentialMoves.length; i++) {
      if (potentialMoves[i].score > bestScore) {
        bestScore = potentialMoves[i].score
        bestMove = i;
      }
    }
  } else {
    let bestScore = 10000;
    for (let i = 0; i < potentialMoves.length; i++) {
      if (potentialMoves[i].score < bestScore) {
        bestScore = potentialMoves[i].score
        bestMove = i;
      }
    }
  }
  return potentialMoves[bestMove];
}
import { gameBoard } from "./gameboard.js";
import { player } from "./player.js";
import { computor } from "./minMax.js";

let main = (() => {
  //renders the board
  gameBoard.render();
  gameBoard.updateScore();

  //Create players
  let player1 = new player.NewPlayer("X", true, true);
  let player2 = new player.NewPlayer("O", true, false);

  //reset button pressed
  let resBtn = document.querySelector("button");
  resBtn.addEventListener("click", () => {
    gameBoard.resetPressed();
    player1.turn = true;
    player2.turn = false;
  });

  //Selected square of the board
  let tile = document.querySelectorAll(".square");
  tile.forEach((squ) => {
    squ.addEventListener("click", () => {
      let currPlayer = player.whosTurn(player1, player2);
      gameBoard.updateBoard(currPlayer, squ);

      let gameOver = gameBoard.checkWinnner(currPlayer, squ);
      let res;
      if (gameOver === true) {
        res = "winner";
        gameBoard.displayWinner(res, currPlayer);
        gameBoard.makeNewBoard();
        gameBoard.score(currPlayer);
        gameBoard.updateScore();
        player1.turn = false;
        player2.turn = true;
      } else if (gameOver === "draw") {
        res = "draw";
        gameBoard.displayWinner(res, currPlayer);
        gameBoard.makeNewBoard();
        player1.turn = false;
        player2.turn = true;
      }
      //check if against an comp
      if (player2.human == false) {
        computor.bestMove(gameBoard);
      } else {
        player.changeTurn(player1, player2);
      }
    });
  });

  return {
    player1,
    player2,
  };
})();

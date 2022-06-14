import { gameBoard } from "./gameboard.js";
import { player } from "./player.js";

let computor = (() => {
  let board = gameBoard.board;
  let set = gameBoard.drawCount;

  let bestMove = (brd = board, currPlayer, otherPlayer) => {
    let bestScore = -Infinity;
    let bestMove;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (brd[i][j] == "") {
          brd[i][j] = currPlayer.symbol;
          let score = minMax(brd, currPlayer, otherPlayer);
          brd[i][j] = "";
          if (bestScore < score) {
            bestScore = score;
            bestMove = { i, j };
            console.log(bestMove);
          }
        }
      }
    }
  };

  let minMax = (board, squ, currPlayer, otherPlayer) => {
    // if (evalute(otherPlayer, squ) === true) {
    //   return -10;
    // } else if (evalute(currPlayer, squ) === true) {
    //   return 10;
    // } else if (evalute(currPlayer, squ) === "draw") {
    //   return 0;
    // }
    return 1;
  };

  let evalute = (currPlayer, squ, set) => {
    set.add(squ);

    //totals
    let colTotal = 0;
    let rowTotal = 0;
    let diaTotal = 0;
    let antiDiaTotal = 0;

    //check colmuns
    for (let i = 0; i < 3; i++) {
      board[row][i] === currPlayer.symbol ? colTotal++ : null;
    }

    //check rows
    for (let i = 0; i < 3; i++) {
      board[i][col] === currPlayer.symbol ? rowTotal++ : null;
    }

    //check diagnols
    if (
      board[0][0] === currPlayer.symbol &&
      board[1][1] === currPlayer.symbol &&
      board[2][2] === currPlayer.symbol
    ) {
      diaTotal = 3;
    }

    //check antidiagnols
    if (
      board[2][0] === currPlayer.symbol &&
      board[1][1] === currPlayer.symbol &&
      board[0][2] === currPlayer.symbol
    ) {
      antiDiaTotal = 3;
    }

    let highest = Math.max(colTotal, rowTotal, diaTotal, antiDiaTotal);
    console.log({ highest, colTotal, rowTotal, diaTotal, antiDiaTotal });
    if (highest == 3) return true;

    if (set.size == 9) return "draw";

    return false;
  };
  return minMax, bestMove;
})();

export { computor };

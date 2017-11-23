class Game {
  constructor(n) {
    this.board = this.initializeBoard(n);
    this.turn = 0;
    this.winner = null;
  }
  initializeBoard(n) {
    const board = [];
    for (let i = 0; i < n; i++) {
      const row = [];
      for (let j = 0; j < n; j++) {
        const sq = { piece: null, row: i, col: j };
        row.push(sq);
      }
      board.push(row);
    }
    return board;
  }
  initializeGame() {
    const firstRow = this.board[0];
    const lastRow = this.board[this.board.length - 1];

    for (let sq of firstRow) {
      sq.piece = new Pawn("black", sq.row, sq.col);
    }

    for (let sq of lastRow) {
      sq.piece = new Pawn("white", sq.row, sq.col);
    }
  }
}

class Pawn {
  constructor(side, row, col) {
    this.side = side;
    this.row = row;
    this.col = col;
  }
  advance(currSq, nextSq, board) {
    if (isValidMove(currSq, nextSq, board, this.side)) {
      currSq.piece = null;
      this.row = nextSq.row;
      this.col = nextSq.col;
      nextSq.piece = this;
    }
  }
}

function isValidMove(currSq, nextSq, board, side) {
  if (isSqOneRowAway(currSq, nextSq, side)) {
    if (
      (areColsSame(currSq, nextSq) && isSqVacant(nextSq)) ||
      (isSqOneColAway(currSq, nextSq) &&
        !isSqVacant(nextSq) &&
        sqHasOpposition(nextSq, side))
    ) {
      return true;
    }
  }
  return false;
}

function isSqOneRowAway(currSq, nextSq, side) {
  if (side === "white") {
    return currSq.row === nextSq.row + 1;
  }
  return currSq.row === nextSq.row - 1;
}

function areColsSame(currSq, nextSq) {
  return currSq.col === nextSq.col;
}

function isSqOneColAway(currSq, nextSq) {
  return currSq.col === nextSq.col + 1 || currSq.col === nextSq.col - 1;
}

function isSqVacant(sq) {
  return sq.piece === null;
}

function sqHasOpposition(sq, side) {
  let opposition = side === "white" ? "black" : "white";
  return sq.piece.side === opposition;
}

// module.exports = {
//   Game,
//   Pawn,
//   isSqOneRowAway,
//   areColsSame,
//   isSqOneColAway,
//   isSqVacant,
//   sqHasOpposition
// };

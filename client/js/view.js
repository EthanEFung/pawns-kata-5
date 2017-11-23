//todo: create view
function renderView(board) {
  let $board;
  if (document.getElementById("board")) {
    $board = document.getElementById("board");
    while ($board.firstChild) {
      $board.removeChild($board.firstChild);
    }
  } else {
    $board = document.createElement("tbody");
    $board.setAttribute("id", "board");
    document.body.appendChild($board);
  }

  for (let row of board) {
    const $row = createRowController(row);
    for (let sq of row) {
      const $sq = createSqController(sq);
      if (sq.piece) {
        $piece = createPieceController(sq.piece, board);
        $sq.appendChild($piece);
      }
      $row.appendChild($sq);
    }
    $board.appendChild($row);
  }
}

window.onload = () => {
  const game = new Game(3);
  game.initializeGame();
  renderView(game.board);
};

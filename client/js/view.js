function renderView(board) {
  let $board = createBoardController(board);
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
  //$board has been appended to the dom body
}

window.onload = () => {
  const game = new Game(8);
  game.initializeGame();
  renderView(game.board);
};

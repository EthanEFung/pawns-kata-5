let current;
let desired;

function createBoardController(board) {
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
  return $board;
}

function createRowController(row) {
  const $row = document.createElement("tr");
  $row.setAttribute("class", "row");
  return $row;
}

function createSqController(sq) {
  const $sq = document.createElement("td");
  $sq.setAttribute("class", "square");
  $sq.setAttribute("row", sq.row);
  $sq.setAttribute("col", sq.col);

  $sq.addEventListener("dragstart", e => {
    current = sq;
  });
  $sq.addEventListener("dragover", e => {
    e.preventDefault();
  });
  $sq.addEventListener("drop", e => {
    desired = sq;
  });

  return $sq;
}
function createPieceController(piece, board) {
  const $piece = document.createElement("img");
  $piece.setAttribute("class", "piece");
  $piece.setAttribute("src", `assets/${piece.side}.png`);
  $piece.setAttribute("draggable", true);
  $piece.setAttribute("row", piece.row);
  $piece.setAttribute("col", piece.col);

  $piece.addEventListener("dragend", e => {
    piece.advance(current, desired, board);
    current = desired = null;
    renderView(board);
  });
  return $piece;
}

let current;
let desired;

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
    console.log(current, desired);
    piece.advance(current, desired, board);
    renderView(board);
  });
  return $piece;
}

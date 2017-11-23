const {
  Game,
  Pawn,
  isSqOneRowAway,
  areColsSame,
  isSqOneColAway,
  isSqVacant,
  sqHasOpposition
} = require("../client/js/models");

describe("Game", function() {
  it("should have a board", function() {
    const test = new Game(2);
    const expected = [
      [{ piece: null, row: 0, col: 0 }, { piece: null, row: 0, col: 1 }],
      [{ piece: null, row: 1, col: 0 }, { piece: null, row: 1, col: 1 }]
    ];

    expect(test.board).toEqual(expected);
  });

  it("should start with pieces on the board", function() {
    const test = new Game(2);
    const expected = [
      [
        { piece: { side: "black", row: 0, col: 0 }, row: 0, col: 0 },
        { piece: { side: "black", row: 0, col: 1 }, row: 0, col: 1 }
      ],
      [
        { piece: { side: "white", row: 1, col: 0 }, row: 1, col: 0 },
        { piece: { side: "white", row: 1, col: 1 }, row: 1, col: 1 }
      ]
    ];
    test.initializeGame();
    expect(test.board).toEqual(expected);
  });
});

describe("Pawn", function() {
  it("should not advance if sq in front is occupied", function() {
    const test = new Game(2);
    const board = test.board;
    test.initializeGame();
    const pawn = board[0][0].piece;
    pawn.advance(board[0][0], board[1][0]);

    const expected = [
      [
        { piece: { side: "black", row: 0, col: 0 }, row: 0, col: 0 },
        { piece: { side: "black", row: 0, col: 1 }, row: 0, col: 1 }
      ],
      [
        { piece: { side: "white", row: 1, col: 0 }, row: 1, col: 0 },
        { piece: { side: "white", row: 1, col: 1 }, row: 1, col: 1 }
      ]
    ];

    expect(board).toEqual(expected);
  });

  it("should capture if sq on the primary diagnol is occupied with opposition", function() {
    const test = new Game(2);
    const board = test.board;
    test.initializeGame();
    const pawn = board[0][0].piece;
    pawn.advance(board[0][0], board[1][1]);

    const expected = [
      [
        { piece: null, row: 0, col: 0 },
        { piece: { side: "black", row: 0, col: 1 }, row: 0, col: 1 }
      ],
      [
        { piece: { side: "white", row: 1, col: 0 }, row: 1, col: 0 },
        { piece: { side: "black", row: 1, col: 1 }, row: 1, col: 1 }
      ]
    ];

    expect(board).toEqual(expected);
  });
});

describe("helper functions", function() {
  it("isSqOneRowAway should be truthy if one row away", function() {
    const test = new Game(2);
    const board = test.board;
    const actual = isSqOneRowAway(board[0][0], board[1][0], "black");
    expect(actual).toBeTruthy();
  });

  it("areColsSame should check if col is the same", function() {
    const test = new Game(2);
    const board = test.board;
    const actual = areColsSame(board[0][0], board[1][0], "black");
    expect(actual).toBeTruthy();
  });

  it("isSqOneColAway should check if col is not one away", function() {
    const test = new Game(2);
    const board = test.board;
    const actual = isSqOneColAway(board[0][0], board[1][0]);
    expect(actual).toBeFalsy();
  });
  it("isSqOneColAway should check if col is one away", function() {
    const test = new Game(2);
    const board = test.board;
    const actual = isSqOneColAway(board[0][0], board[1][1]);
    expect(actual).toBeTruthy();
  });

  it("isSqVacant should check if sq is vacant", function() {
    const test = new Game(2);
    const board = test.board;
    const actual = isSqVacant(board[0][0]);
    expect(actual).toBeTruthy();
  });

  it("isSqVacant should check if sq is not vacant", function() {
    const test = new Game(2);
    const board = test.board;
    test.initializeGame();
    const actual = isSqVacant(board[0][0]);
    expect(actual).toBeFalsy();
  });

  it("sqHasOpposition to white", function() {
    const test = new Game(2);
    const board = test.board;
    test.initializeGame();
    const actual = sqHasOpposition(board[0][0], "white");
    expect(actual).toBeTruthy();
  });
  it("sqHasOpposition to black", function() {
    const test = new Game(2);
    const board = test.board;
    test.initializeGame();
    const actual = sqHasOpposition(board[1][0], "black");
    expect(actual).toBeTruthy();
  });
  it("sqHasOpposition does not have opposition to white", function() {
    const test = new Game(2);
    const board = test.board;
    test.initializeGame();
    const actual = sqHasOpposition(board[1][0], "white");
    expect(actual).toBeFalsy();
  });
  it("sqHasOpposition does not have opposition to black", function() {
    const test = new Game(2);
    const board = test.board;
    test.initializeGame();
    const actual = sqHasOpposition(board[0][1], "black");
    expect(actual).toBeFalsy();
  });
});

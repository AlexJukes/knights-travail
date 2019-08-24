const BOARD_SIZE = 8;

const node = () => ({
  movesSoFar: [],
  estimatedTimeToFinish: null,
  overallScore: 0,
  parent: {},
})

const generateChessBoard = () => Array.from(Array(BOARD_SIZE), () => new Array(BOARD_SIZE).fill(node()))

const chessNotationToBoardArrayMap = {
    x: {
      a: 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4,
    f: 5,
    g: 6,
    h: 7,
    },
    y: {
      1: 7,
      2: 6,
      3: 5,
      4: 4,
      5: 4,
      6: 2,
      7: 1,
      8: 0,
    },
}

module.exports = {
  generateChessBoard,
}
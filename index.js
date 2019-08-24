const BOARD_SIZE = 8;

const node = () => ({
  movesSoFar: [],
  estimatedTimeToFinish: null,
  overallScore: 0,
  parent: {},
})

const generateChessBoard = () => Array.from(Array(BOARD_SIZE), () => new Array(BOARD_SIZE).fill(node()))

const getNextValidKnightMoves = ([x, y], grid) => {
  const moveSet = [[-1, 2], [-2, 1], [-2, -1], [-1, -2], [1, -2], [2, -1], [2, 1], [1, 2]]
  const [ row ] = grid;
  const isSquareWithinGrid = ([x, y]) => (x >= 0 && x <= grid.length) && (y >= 0 && y <= row.length)
  return moveSet.map(([diffX, diffY]) => [x + diffX, y + diffY]).filter((isSquareWithinGrid))
}

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
      5: 3,
      6: 2,
      7: 1,
      8: 0,
    },
}

const getBoardIndexFromNotation = (notation) => {
  const [x, y] = notation;
  return [chessNotationToBoardArrayMap.x[x], chessNotationToBoardArrayMap.y[y] ]
}

module.exports = {
  generateChessBoard,
  getNextValidKnightMoves,
}
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
};

const getBoardIndexFromNotation = (notation) => {
  const [x, y] = notation;
  return [chessNotationToBoardArrayMap.x[x], chessNotationToBoardArrayMap.y[y] ];
};

const getNotationFromBoardIndex = ([indexX, indexY]) => {
  const { keys, entries } = Object;
  const inverseMap = keys(chessNotationToBoardArrayMap)
    .reduce((acc, key) => ({
      ...acc,
      [key]: {
        ...entries(chessNotationToBoardArrayMap[key])
          .reduce((acc, [key,value]) => ({ ...acc, [value]: key }))
      }
    }), {});
  return `${inverseMap.x[indexX].toUpperCase()}${inverseMap.y[indexY]}`;
};

module.exports = {
  chessNotationToBoardArrayMap,
  getBoardIndexFromNotation,
  getNotationFromBoardIndex,
};
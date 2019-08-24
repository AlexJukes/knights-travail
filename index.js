const BOARD_SIZE = 8;

const node = (position) => ({
  f: 0,
  g: 0,
  h: 0,
  parent: {},
  position
})

const generateChessBoard = () => {
  const grid = Array.from(Array(BOARD_SIZE), () => new Array(BOARD_SIZE).fill([]));
  return grid.map((row, rowIndex) => row.map((_, colIndex) => node([rowIndex, colIndex])))
}


const getNextValidKnightMoves = ([x, y], grid = []) => {
  const moveSet = [[-1, 2], [-2, 1], [-2, -1], [-1, -2], [1, -2], [2, -1], [2, 1], [1, 2]]
  const [ row ] = grid;
  const isSquareWithinGrid = ([x, y]) => (x >= 0 && x <= grid.length) && (y >= 0 && y <= row.length)
  return moveSet.map(([diffX, diffY]) => [x + diffX, y + diffY]).filter((isSquareWithinGrid))
}

const findBestMoveSet = (start, end, grid) => {
  const [startX, startY] = start;
  const [endX, endY] = end;
  const startNode = grid[startX][startY];
  console.log('start', start);
  
  const possibleOpeningMoves = getNextValidKnightMoves(start, grid);
  console.log('possibleOpeningMoves', possibleOpeningMoves);
  const openList = [...possibleOpeningMoves];
  const closedList = [];

  let result = openList.map(console.log).filter();
  console.log('result', result);

  if(openList.map(([x,y]) => (x === endX && y === endY)).filter()) {
    return end;
  }

  while(openList.length) {
    const fList = openList.map(({f}) => f)
    const lowestFIndex = fList.indexOf(Math.min(...fList));
    let currentNode = openList[lowestFIndex];
    console.log('currentNode', currentNode);
    console.log('currentNode.position[0]', currentNode.position[0]);
    console.log('currentNode.position[1]', currentNode.position[1]);
    console.log('endY', endY);
    console.log('endX', endX);
    
    if (currentNode.position[0] == endX && currentNode.position[1] === endY) {
      let curr = currentNode;
      let result = [];
      console.log('curr.parent', curr.parent);
      console.log('result', result);
      while(curr.parent) {
        result.push(curr),
        curr = curr.parent;
      }
      return result.reverse;
    }
  }
  return [];
}

module.exports = {
  generateChessBoard,
  getNextValidKnightMoves,
  findBestMoveSet,
}
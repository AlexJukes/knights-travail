const BOARD_SIZE = 8;

const node = (position) => ({
  f: 0,
  g: 0,
  h: 0,
  parent: null,
  position
});

const generateChessBoard = () => {
  const grid = Array.from(Array(BOARD_SIZE), () => new Array(BOARD_SIZE).fill([]));
  return grid.map((row, rowIndex) => row.map((_, colIndex) => node([rowIndex, colIndex])));
};

const getNextValidKnightMoves = ([x, y], grid = []) => {
  const moveSet = [[-1, 2], [-2, 1], [-2, -1], [-1, -2], [1, -2], [2, -1], [2, 1], [1, 2]];
  const [ row ] = grid;
  const isSquareWithinGrid = ([x, y]) => (x >= 0 && x < grid.length) && (y >= 0 && y < row.length);
  return moveSet.map(([diffX, diffY]) => [x + diffX, y + diffY]).filter((isSquareWithinGrid));
};

const getNodesForMoves = (moves, grid) => moves.map(([x, y]) => grid[x][y]);

const getNextMoveNodes = (start, grid) => {
  const nextMoves = getNextValidKnightMoves(start, grid);
  return [...getNodesForMoves(nextMoves, grid)];
};

const removeNodeFromList = (node, list) => {
  const result = [...list];
  const index = result.indexOf(node);
  if (index > -1) {
    result.splice(index, 1);
  }
  return result;
};

const heuristic = ([startX, startY], [endX, endY]) => {
  const knightsMovementRange = 3;
  const d1 = Math.abs(endX - startX);
  const d2 = Math.abs(endY - startY);
  return (d1 + d2) / knightsMovementRange;
};

const getMoveHistory = (node, history = []) => {
  const { position, parent } = node;
  const result = [position, ...history];
  return parent ? getMoveHistory(parent, result) : result;
};

const findBestMoveSet = (start, end) => {
  const grid = generateChessBoard();
  let openList = getNextMoveNodes(start, grid);
  const closedList = [];

  while (openList.length) {
    const fList = openList.map(({f}) => f);
    const lowestFIndex = fList.indexOf(Math.min(...fList));
    let currentNode = openList[lowestFIndex];
    const [endX, endY] = end;

    const isTargetSquare = ({ position: [x, y]}) => x === endX && y === endY;
    if (isTargetSquare(currentNode)) {
      return getMoveHistory(currentNode);
    }

    openList = removeNodeFromList(currentNode, openList);
    closedList.push(currentNode);
    const nextMoveNodes = getNextMoveNodes(currentNode.position, grid);
    for (const nextMoveNode of nextMoveNodes) {
      if (closedList.includes(nextMoveNode)) {
        continue;
      }
      const { g } = nextMoveNode;
      const gScore = g + 1;
      let isGScoreBest = false;

      if(!openList.includes(nextMoveNode)) {
        isGScoreBest = true;
        nextMoveNode.h = heuristic(nextMoveNode.position, end);
        openList.push(nextMoveNode);
      } else if (gScore < nextMoveNode.g) {
        isGScoreBest = true;
      }
      if (isGScoreBest) {
        nextMoveNode.parent = currentNode;
        nextMoveNode.g = gScore;
        nextMoveNode.f = nextMoveNode.g + nextMoveNode.h;
      }
    }
  }
  return [];
};

module.exports = {
  generateChessBoard,
  getNextValidKnightMoves,
  findBestMoveSet,
};
const BOARD_SIZE = 8;

const node = (position) => ({
  f: 0,
  g: 0,
  h: 0,
  parent: {},
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
  const d1 = Math.abs (endX - startX);
  const d2 = Math.abs (endY - startY);
  return (d1 + d2) / knightsMovementRange;
};

const findBestMoveSet = (start, end) => {
  const grid = generateChessBoard();
  let openList = getNextMoveNodes(start, grid);
  const closedList = [];

  while (openList.length) {
    const fList = openList.map(({f}) => f);
    const lowestFIndex = fList.indexOf(Math.min(...fList));
    let currentNode = openList[lowestFIndex];
    if (currentNode.position[0] == end[0] && currentNode.position[1] === end[1]) {
      let curr = currentNode;
      let result = [];
      while(curr.parent) {
        result.push(curr),
        curr = curr.parent;
      }
      return result.map(({position}) => position).reverse();
    }
    openList = removeNodeFromList(currentNode, openList);
    closedList.push(currentNode);
    const neighbours = getNextMoveNodes(currentNode.position, grid);
    for (const neighbour of neighbours) {
      if (closedList.includes(neighbour)) {
        continue;
      }
      const { g } = neighbour;
      const gScore = g + 1;
      let isGScoreBest = false;

      if(!openList.includes(neighbour)) {
        isGScoreBest = true;
        neighbour.h = heuristic(neighbour.position, end);
        openList.push(neighbour);
      } else if (gScore < neighbour.g) {
        isGScoreBest = true;
      }
      if (isGScoreBest) {
        neighbour.parent = currentNode;
        neighbour.g = gScore;
        neighbour.f = neighbour.g + neighbour.h;
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
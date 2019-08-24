require('mocha');
const { expect} = require('chai');
const { generateChessBoard, getNextValidKnightMoves, findBestMoveSet } = require('..');

describe("Knight's Travails", () => {
  describe('generateChessBoard', () => {
    it("will generate and 8 x 8 grid of Nodes", () => {
      const chessBoard = generateChessBoard();
      expect(chessBoard.length).to.equal(8)
      chessBoard.map((row, rowIndex) => {
        expect(row.length).to.equal(8);
        row.map((node, colIndex) => {
          expect(Object.keys(node)).to.include('f', 'g', 'h', 'parent', 'position');
          expect(node.position).to.deep.equal([rowIndex, colIndex])
        })
      })
    })
  }),
  describe('generateNextValidKnightMoves', () => {
    it("given a current position, will generate and array of possible valid positions", () => {
      const chessBoard = generateChessBoard();
      const nextMoves = getNextValidKnightMoves([3,4], chessBoard);
      console.log('nextMoves', nextMoves);
      
      expect(nextMoves).to.deep.equal([[2,6], [1,5], [1, 3], [2, 2], [4, 2], [5,3], [5,5], [4,6]]);
    }),
    it("given a current position and a grid, will find all possible moves within the confines of the grid", () => {
      const chessBoard = generateChessBoard();
      const nextMoves = getNextValidKnightMoves([0,0], chessBoard);
      expect(nextMoves).to.deep.equal([[2,1], [1,2]]);
    })
  })
  describe('findBestMoveSet', () => {
    it("given a current position, and an end position one move away, will return the correct final move", () => {
      const chessBoard = generateChessBoard();
      const bestMoveSet = findBestMoveSet([3,4], [2,6], chessBoard)
      expect(bestMoveSet).to.deep.equal([[2,6]]);
    })
  })
})
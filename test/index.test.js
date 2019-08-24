require('mocha');
const { expect} = require('chai');
const { generateChessBoard, generateNextValidKnightMoves } = require('..');

describe("Knight's Travails", () => {
  describe('generateChessBoard', () => {
    it("will generate and 8 x 8 grid of Nodes", () => {
      const chessBoard = generateChessBoard();
      expect(chessBoard.length).to.equal(8)
      chessBoard.map(row => {
        expect(row.length).to.equal(8);
        row.map(node => {
          expect(Object.keys(node)).to.include('movesSoFar', 'estimatedTimeToFinish', 'overallScore', 'parent');
        })
      })
    })
  }),
  describe('generateNextValidKnightMoves', () => {
    it("given a current position and a grid, will generate and array of possible valid positions", () => {
      const chessBoard = generateChessBoard();
      const nextMoves = generateNextValidKnightMoves([3,4], chessBoard);
      expect(nextMoves).to.equal([[2,6], [1,5], [1, 4], [2, 2], [4, 2], [5,4], [5,5], [4,6]]);
    })
  })
})